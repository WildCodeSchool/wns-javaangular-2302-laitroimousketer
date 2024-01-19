import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:laitroimousketer_app/widgets/FormInput.dart';

import '../../ressources/base_view.dart';
import '../../theme/CustomColors.dart';
import '../../theme/Dimens.dart';
import '../../utils/view_utils.dart';
import '../../widgets/Buttons.dart';
import '../../widgets/ProgressHud.dart';
import '../controller/SignUpController.dart';

class SignUpView extends WidgetView<SignUpViewController, SignUpController> {
  const SignUpView(super.state, {super.key});

  @override
  Widget build(BuildContext context) {
    return ProgressHUD(
      inAsyncCall: controller.isLoading,
      child: AnnotatedRegion<SystemUiOverlayStyle>(
        value: ViewUtils().statusBarColorLight(Colors.transparent),
        child: Container(

          child: Scaffold(
            appBar: AppBar(
              backgroundColor: Colors.transparent,
              elevation: 0,
              automaticallyImplyLeading: true,
              title: Text("Inscription"),
              centerTitle: true,
            ),
            resizeToAvoidBottomInset: true,
            backgroundColor: Colors.transparent,
            body: SafeArea(
              child: Padding(
                padding: EdgeInsets.only(top: Dimens.fromScreenHeight(context, coef: 0.03)),
                child: Container(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: Dimens.spacing_medium_12, vertical: Dimens.spacing_large_16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        _content(context),

                      ],
                    ),
                  ),
                ),
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
        alignment: Alignment.center,
        child: SingleChildScrollView(
          child: Column(mainAxisSize: MainAxisSize.max, mainAxisAlignment: MainAxisAlignment.center, crossAxisAlignment: CrossAxisAlignment.start, children: [
            _signUpForm(),

          ]),
        ),
      ),
    );
  }


//endregion

  // Form
  Widget _signUpForm() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: Dimens.spacing_mlarge_24),
      child: Form(
          key: controller.signUpFormKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              FormInput.defaultInput(controller: controller.lastNameTextController, label: "Nom",keyboardType: TextInputType.name),
              SizedBox(height: Dimens.spacing_medium_12),
              FormInput.defaultInput(controller: controller.firstNameTextController, label: "Prénom",keyboardType: TextInputType.name),
              SizedBox(height: Dimens.spacing_medium_12),

              FormInput.defaultInput(controller: controller.phoneNumberTextController, label: "Numéro de téléphone",keyboardType: TextInputType.phone),
              SizedBox(height: Dimens.spacing_medium_12),

              FormInput.defaultInput(controller: controller.emailTextController, label: "Email",keyboardType: TextInputType.emailAddress),
              SizedBox(height: Dimens.spacing_medium_12),

              ValueListenableBuilder(
                valueListenable: controller.isPasswordVisible,
                builder: (context, value, child) => FormInput.defaultInput(
                    controller: controller.passwordTextController,
                    label: 'Mot de passe',
                    isPassword: true,
                    keyboardType: TextInputType.visiblePassword,
                    obscureText: controller.isPasswordVisible.value,
                    onTogglePassword: (bool isObscured) => controller.onTogglePassword()),
              ),
              SizedBox(height: Dimens.spacing_medium_12),

              ValueListenableBuilder(
                valueListenable: controller.isConfirmPasswordVisible,
                builder: (context, value, child) => FormInput.defaultInput(
                    controller: controller.confirmPasswordTextController,
                    label: 'Confirmation mot de passe',
                    isPassword: true,
                    keyboardType: TextInputType.visiblePassword,
                    obscureText: controller.isConfirmPasswordVisible.value,
                    onTogglePassword: (bool isObscured) => controller.onToggleConfirmPassword()),
              ),
              SizedBox(height: Dimens.spacing_medium_12),
              _nextButton(),
            ],
          )),
    );
  }

//endregion

//endregion

  Widget _nextButton() {
    return Buttons.defaultButton(context: controller.context, buttonTitle: "inscription", onPressedFunction: controller.onSignInClicked);
  }
}
