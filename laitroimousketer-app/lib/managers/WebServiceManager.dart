import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';

import '../database/models/User.dart';
import '../database/repositories/UserRepository.dart';
import '../main.dart';
import '../ressources/Constant.dart';
import '../utils/security_utils.dart';
import '../utils/web_service_utils.dart';

class WebServiceManager {
  static WebServiceManager? _instance;

  WebServiceManager._internal();

  factory WebServiceManager() => _instance ?? WebServiceManager._internal();

  final time_out_seconds_duration = 60;



  //region UTILS
  Future<LoginResponse> sendLogIn(BuildContext context, String login, String password) async {
    var params = <String, String>{};
    print("email : $login");
    print("password : $password");
    params.addEntries({
      MapEntry('email', login),
      MapEntry('password', password)
    });
    String json = jsonEncode(params);
    print("json params : $json");

    try {
      final response = await http.post(
        Uri.parse(Constants.SERVER_URL_PREPROD+Constants.GET_TOKEN_WS),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: json,
      );
      print("response uri : ${response.request?.url}");
      //print("response body : ${response.body}");
      print("response : ${response.statusCode}");


      switch (response.statusCode) {
        // succès -> je recois l'user
        case 200:
          var result = await manageGetUser(response: response);
          if (result == WSResult.SUCCESS) {
            print("LoginResponse(result: LoginResult.SUCCESS);");
            return LoginResponse(result: LoginResult.SUCCESS);
          } else {
            print("LoginResponse(result: LoginResult.ERROR);");
            return LoginResponse(result: LoginResult.ERROR);
          }

        // réponse si l'association user/mdp sont fausses
        case 401:
          print("LoginResponse(result: LoginResult.ERROR_PASSWORD);");
          return LoginResponse(result: LoginResult.ERROR_PASSWORD);

        // besoin de forcer la maj -> on arrête la sync et on affiche un message
        case 458:
          print("LoginResponse(result: LoginResult.NEED_UPDATE);");
          return LoginResponse(result: LoginResult.NEED_UPDATE);

        // réponse erreur standard
        default:
          print("LoginResponse(result: LoginResult.ERROR);");
          return LoginResponse(result: LoginResult.ERROR);
      }
    } catch (exception) {
      print("LoginResponse(result: LoginResult.ERROR);");
      return LoginResponse(result: LoginResult.ERROR);
    }
  }

  Future<WSResult> manageGetUser({required Response response}) async {
    try {
      // on vide la db
      await appDatabase!.resetDb();

      // recupère et insert l'user + maj last pull date
      var json = jsonDecode(response.body);

     print("json : ${json['user']}");

      User user = User.fromJson(json['user']);
      print("user : $user");
      // on peut insérer l'user
      user.lastPullDate = 0;
      user.accessToken = json['accessToken'];
      var result = await UserRepository(appDatabase!.userDao).insert(user, false);
      print("result : $result");
      // erreur
      if (result <= 0) {
        print("ERROR, manageGetUser couldn't insert the user in database after success.");
        print("ERROR, Login couldn't insert the user in database after success.");
        return WSResult.ERROR;
      }
      // succès de l'ajout
      else {
        return WSResult.SUCCESS;
      }
    } catch (exception) {

        print(exception);
      print("ERROR, manageGetUser an exception occurred while inserting in database $exception");
      return WSResult.ERROR;
    }
  }

  Future<WSResult> manageGetTicket({required Response response}) async {
    try {
      // on vide la db
     // await appDatabase!.resetDb();

      // recupère et insert l'user + maj last pull date
      var json = jsonDecode(response.body);

      print("json : ${json['user']}");

      User user = User.fromJson(json['user']);
      print("user : $user");
      // on peut insérer l'user
      user.lastPullDate = 0;
      user.accessToken = json['accessToken'];
      var result = await UserRepository(appDatabase!.userDao).insert(user, false);
      print("result : $result");
      // erreur
      if (result <= 0) {
        print("ERROR, manageGetUser couldn't insert the user in database after success.");
        print("ERROR, Login couldn't insert the user in database after success.");
        return WSResult.ERROR;
      }
      // succès de l'ajout
      else {
        return WSResult.SUCCESS;
      }
    } catch (exception) {

      print(exception);
      print("ERROR, manageGetUser an exception occurred while inserting in database $exception");
      return WSResult.ERROR;
    }
  }



}
