import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';


import '../../managers/WebServiceManager.dart';
import '../../ressources/navigation_utils.dart';
import '../../utils/network_utils.dart';
import '../../utils/view_utils.dart';
import '../../utils/web_service_utils.dart';
import '../view/LoginView.dart';
import 'SignUpController.dart';
import 'SplashController.dart';

class LoginViewController extends StatefulWidget {
  final bool fromSignUpEmail;

  const LoginViewController({super.key, required this.fromSignUpEmail});

  @override
  LoginController createState() {
    return LoginController();
  }
}

class LoginController extends State<LoginViewController> {
  //region Variables
  bool isLoading = false;

  // connexion
  final loginFormKey = GlobalKey<FormState>();
  late TextEditingController loginUserController;
  late TextEditingController loginPasswordController;
  ValueNotifier<bool> isPasswordVisible = ValueNotifier(true);

  //endregion

  // region Init
  @override
  void dispose() {
    loginUserController.dispose();
    loginPasswordController.dispose();

    super.dispose();
  }

  @override
  void initState() {
    loginUserController = TextEditingController();
    loginPasswordController = TextEditingController();

    _loadData();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return LoginView(this);
  }

  //endregion

  //endregion

  //region Data
  void _loadData() async {
    setState(() {
      if (kDebugMode) {

          loginUserController.text = "manager@wcs.com";

        loginPasswordController.text = "Alayd3!manager";
      }

      if (widget.fromSignUpEmail) {
        Future.delayed(const Duration(milliseconds: 1000), () {
          _navigateToSignUpController();
        });
      }
    });
  }

  //endregion

  //region User action

  onLoginClicked() {
    _validateLoginDataInputs();
  }

  onSignUpClicked() {
    _navigateToSignUpController();
  }

  onPasswordForgottenClicked() {
    _navigateToPasswordForgotten();
  }

  onTogglePassword(){

      isPasswordVisible.value = !isPasswordVisible.value;
      print(isPasswordVisible.value);
  }

  //endregion

  //region Connexion WS
  void _validateLoginDataInputs() async {
    // vérifie que les données sont au bon format
    if (loginFormKey.currentState?.validate() == true) {
      print("form ok");
      doLogin();
    } else {
      print("error");
    }
  }

  void doLogin() async {
    print("doLogin");
    WidgetsBinding.instance.focusManager.primaryFocus?.unfocus();

    var username = loginUserController.text;
    var password = loginPasswordController.text;

    // vérifie le réseau pour éviter des erreurs
    if (await NetworkUtils().isNetworkAvailable()) {
      print("network ok");
      sendLogin(username, password);
    } else {
      if (mounted) ViewUtils().showSnackbar(context, 'erreur réseau');
    }
  }

  void sendLogin(String username, String password) async {
    print("sendLogin");
    setState(() {
      isLoading = true;
    });

    var loginResponse = await WebServiceManager().sendLogIn(context, username, password);

    switch (loginResponse.result) {
      case LoginResult.SUCCESS:
        print('success');
        _navigateToSplashController();
        break;
      case LoginResult.NEED_UPDATE:
        print('need update');
        break;
      case LoginResult.ACCOUNT_NOT_VALIDATED:
      // ne devrait pas arriver sur ce projet
        print('account not validated');
        break;
      case LoginResult.ERROR_PASSWORD:
        setState(() {
          isLoading = false;
          ViewUtils().showSnackbar(context, 'erreur password');
        });
        break;
      case LoginResult.ERROR:
        setState(() {
          isLoading = false;
          ViewUtils().showSnackbar(context, 'erreur');
        });
        break;
      case LoginResult.NO_NETWORK:
        setState(() {
          isLoading = false;
          ViewUtils().showSnackbar(context, 'erreur réseau');
        });
        break;
    }
  }

  //endregion

//region Navigation
  _navigateToSplashController() {
    NavigationUtils().navigateToWithReplacement(context, const SplashViewController());
  }

  _navigateToSignUpController() {
    NavigationUtils().navigateTo(context, const SignUpViewController());
  }

  _navigateToPasswordForgotten() {
    //NavigationUtils().navigateTo(context, const PasswordForgottenViewController());
  }

//endregion
}
