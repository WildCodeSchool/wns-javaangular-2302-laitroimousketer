import 'dart:io';

import 'package:device_info_plus/device_info_plus.dart';
import 'package:http/http.dart' as http;
import 'package:package_info_plus/package_info_plus.dart';


// region Results enum / class
enum LoginResult {
  SUCCESS,
  ACCOUNT_NOT_VALIDATED,
  ERROR,
  ERROR_PASSWORD,
  NEED_UPDATE,
  NO_NETWORK
}

enum SignUpResult {
  SUCCESS,
  ERROR,
  ERROR_ACCOUNT_EXISTS,
  ERROR_GET_TOKEN,
  NEED_UPDATE,
  NO_NETWORK
}

enum WSResult {
  SUCCESS,
  ERROR,
  ERROR_ALREADY_IN_SYNC,
  NEED_UPDATE,
  INVALID_TOKEN,
  NO_NETWORK
}

class LoginResponse {
  LoginResult result;
  String? message;

  LoginResponse({
    required this.result,
    this.message,
  });
}

class SignUpResponse {
  SignUpResult result;
  String? message;

  SignUpResponse({
    required this.result,
    this.message,
  });
}

class WSResponse {
  WSResult result;
  String? message;
  Object? value;

  WSResponse({
    required this.result,
    this.message,
    this.value,
  });
}

class CallWSResponse {
  bool isSuccess;
  bool isSpecialCase;
  bool isError;

  http.Response? _responseValue;
  WSResponse? _errorValue;

  CallWSResponse({
    this.isSuccess = false,
    this.isSpecialCase = false,
    this.isError = false,
    http.Response? responseValue,
    WSResponse? errorValue,
  }) {
    _responseValue = responseValue;
    _errorValue = errorValue;
  }

  http.Response get responseValue => _responseValue!;

  WSResponse get errorValue => _errorValue!;
}

const SUCCESS = 200;
const ACCOUNT_LOCKED = 423;
const INVALID_DATA = 401;
const INVALID_TOKEN = 457;
const NEED_UPDATE = 458;
const PARENT_OBJECT_INVALID = 460;
const UNICITY_ERROR = 461;

// endregion

class WebServiceUtils {
  //region Singleton
  static final WebServiceUtils _instance = WebServiceUtils._internal();

  factory WebServiceUtils() {
    return _instance;
  }

  WebServiceUtils._internal();

  static const time_out_seconds_duration = 60;

//endregion

  Uri getUri(
      {required String url,
        required String webService,
        required Map<String, String> params}) {
    if (url.contains("https")) {
      var truncatedUrl = url.replaceAll("https://", "");
      truncatedUrl = truncatedUrl.replaceAll("www.", "");
      return Uri.https(
        truncatedUrl,
        webService,
        params,
      );
    } else {
      var truncatedUrl = url.replaceAll("http://", "");
      truncatedUrl = truncatedUrl.replaceAll("www.", "");
      return Uri.http(
        truncatedUrl,
        webService,
        params,
      );
    }
  }

  Future<Map<String, String>> getDefaultParams() async {
    var params = <String, String>{};

    // recupère les infos de package
    PackageInfo packageInfo = await PackageInfo.fromPlatform();
    // recupère les infos du device
    DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();

    if (Platform.isIOS) {
      IosDeviceInfo iosInfo = await deviceInfo.iosInfo;
      params.addEntries({
        MapEntry('platform', "iOS"),
        MapEntry('appVersionName', packageInfo.version),
        // numéro de version (ex: 1.0)
        MapEntry('appVersionCode', packageInfo.buildNumber),
        // numéro de build (ex: 1)
        MapEntry('osVersion', iosInfo.systemVersion.toString()),
        // version d'android ou ios
        MapEntry(
            'device', iosInfo.utsname.machine.toString().replaceAll(",", "."))
        // modèle, selon la convention UTS. On remplace la , par un . ici pour éviter les soucis dans le json des requêtes
      });
    } else if (Platform.isAndroid) {
      AndroidDeviceInfo androidInfo = await deviceInfo.androidInfo;
      params.addEntries({
        MapEntry('platform', "Android"),
        MapEntry('appVersionName', packageInfo.version),
        // numéro de version (ex: 1.0)
        MapEntry('appVersionCode', packageInfo.buildNumber),
        // numéro de build (ex: 1)
        MapEntry('osVersion', androidInfo.version.release ?? ""),
        // version d'android ou ios
        MapEntry('device', androidInfo.model.toString())
      });
    }

    return params;
  }

  /// Permet d'appeler un WebService avec les paramètres données.
  /// Les logs sont gérés ainsi que la gestion d'erreur [INVALID_TOKEN], [NEED_UPDATE] etc...
  ///
  /// Cas d'erreurs spéciaux (461, 421 ... etc) via [specialCodeCases]
  ///
  /// retour:
  /// [CallWSResponse.isSuccess] et [CallWSResponse.jsonValue] ou [CallWSResponse.responseValue]
  /// [CallWSResponse.isSpecialCase] pour gérer les cas speciaux
  /// [CallWSResponse.isError] et [CallWSResponse.errorValue] pour récuperer le [WSResponse]
  ///
  /// /!\ Ne pas oublier de checker le réseau avec [NetworkUtils.isNetworkAvailable] avant tout appel ! /!\
  Future<CallWSResponse> callWS({
    required Uri url,
    required Map<String, String> params,
    required String functionName,
    List<int>? specialCodeCases,
    required bool sendLogToFirebase,
    int timeoutSecondsDuration = time_out_seconds_duration,
    bool logParams = true,
  }) async {
    String logMessage = "Calling ws $url ";
    if (logParams) {
      logMessage += "with params $params";
    }



    try {
      final response = await http.post(url, body: params).timeout(
        Duration(seconds: timeoutSecondsDuration),
      );

      switch (response.statusCode) {
        case SUCCESS:
          print('success');

          return CallWSResponse(responseValue: response, isSuccess: true);

        case INVALID_TOKEN:
          var logMessage =
              "error while $functionName, server returned ${response.statusCode} aka INVALID TOKEN, with body ${response.body}, disconnecting user.";
          print(logMessage);
          if (sendLogToFirebase) {
            print('send log to firebase');
          }

          return CallWSResponse(
              errorValue: WSResponse(result: WSResult.INVALID_TOKEN),
              isError: true);

        case NEED_UPDATE:
          print('need update');

          return CallWSResponse(
              errorValue: WSResponse(result: WSResult.NEED_UPDATE),
              isError: true);
        default:
        // Le serveur a repondu avec un cas special demandé par le WebService
          if (specialCodeCases != null &&
              specialCodeCases.contains(response.statusCode)) {
            print('special case');

            return CallWSResponse(responseValue: response, isSpecialCase: true);
          }
          // Erreur
          else {
            print('error web_service_utils ${response.statusCode}');
            if (sendLogToFirebase) {
              print('send log to firebase');
            }

            return CallWSResponse(
                errorValue: WSResponse(
                    result: WSResult.ERROR, message: "${response.statusCode}"),
                isError: true);
          }
      }
    } catch (error) {
      print('error web_service_utils catch $error');
      if (sendLogToFirebase) {
        print('send log to firebase');
      } else {
        print(error);
      }

      return CallWSResponse(
          errorValue: WSResponse(result: WSResult.ERROR), isError: true);
    }
  }
}
