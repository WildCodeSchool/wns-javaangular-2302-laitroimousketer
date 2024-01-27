import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:laitroimousketer_app/widgets/FormInput.dart';

import '../../ressources/base_view.dart';
import '../../theme/CustomColors.dart';
import '../../theme/Dimens.dart';
import '../../widgets/Buttons.dart';
import '../../widgets/ProgressHud.dart';
import '../controller/LoginController.dart';

class LoginView extends WidgetView<LoginViewController, LoginController> {
  const LoginView(super.state, {super.key});

  @override
  Widget build(BuildContext context) {
    return ProgressHUD(
      inAsyncCall: controller.isLoading,
      child: AnnotatedRegion<SystemUiOverlayStyle>(
        value: SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.dark,
          systemNavigationBarColor: Colors.transparent,
          systemNavigationBarIconBrightness: Brightness.dark,
        ),
        child: Container(
          child: Scaffold(
            appBar: AppBar(
              backgroundColor: Colors.transparent,
              title: Text('Connexion'),
              centerTitle: true,
            ),
            backgroundColor: Colors.transparent,
            resizeToAvoidBottomInset: true,
            body: SafeArea(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _content(context),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  //region Main content
  Widget _content(BuildContext context) {
    return Expanded(
      child: Align(
        alignment: Alignment.bottomCenter,
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image(
                image: const AssetImage("assets/images/logo.png"),
                width: Dimens.fromScreenWidth(context, coef: 0.85),
              ),
              Padding(
                  padding: EdgeInsets.only(
                    left: Dimens.spacing_mlarge_24,
                    right: Dimens.spacing_mlarge_24,
                    top: Dimens.fromScreenHeight(controller.context, coef: 0.07),
                  ),
                  child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
                    _loginContent(),
                    SizedBox(
                      height: Dimens.fromScreenHeight(context, coef: 0.05),
                    ),
                    _forgottenPassword(),
                  ])),
            ],
          ),
        ),
      ),
    );
  }

  //endregion

  //region Login
  Widget _loginContent() {
    return Column(children: [
      _loginForm(),
      const SizedBox(height: Dimens.spacing_xlarge_32),
      Buttons.defaultButton(context: controller.context, buttonTitle: 'Connexion', onPressedFunction: () => controller.onLoginClicked()),
      const SizedBox(height: Dimens.spacing_large_16),
      InkWell(
        onTap: () => {controller.onSignUpClicked()},
        child: Padding(
          padding: const EdgeInsets.all(Dimens.spacing_small_4),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Pas encore de compte ? ', style: const TextStyle(color: CustomColors.TEXT_COLOR_LIGHT, fontSize: Dimens.font_size_normal_14)),
              Text(
                'inscrivez-vous',
                style: const TextStyle(color: CustomColors.TEXT_COLOR_SECONDARY, decoration: TextDecoration.underline, fontSize: Dimens.font_size_normal_14),
              ),
            ],
          ),
        ),
      ),
    ]);
  }

  Widget _loginForm() {
    return Form(
        key: controller.loginFormKey,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            FormInput.defaultInput(
              controller: controller.loginUserController,
              label: 'Email',
            ),
            SizedBox(height: Dimens.spacing_normal_8),
            ValueListenableBuilder(
              valueListenable: controller.isPasswordVisible,
              builder: (context, value, child) => FormInput.defaultInput(
                  controller: controller.loginPasswordController,
                  label: 'Mot de passe',
                  isPassword: true,
                  obscureText: controller.isPasswordVisible.value,
                  onTogglePassword: (bool isObscured) => controller.onTogglePassword()),
            ),
          ],
        ));
  }

  Widget _forgottenPassword() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: Dimens.spacing_mlarge_24),
      child: Align(
        alignment: Alignment.center,
        child: InkWell(
          onTap: () => {controller.onPasswordForgottenClicked()},
          child: Padding(
            padding: const EdgeInsets.all(Dimens.spacing_small_4),
            child: Text('mot de passe oublié ', style: TextStyle(color: CustomColors.TEXT_COLOR_LIGHT)),
          ),
        ),
      ),
    );
  }

//endregion
}
