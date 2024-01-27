
import 'package:flutter/material.dart';
import 'package:laitroimousketer_app/screens/controller/MainNavigationController.dart';

import '../../managers/WebServiceManager.dart';
import '../../ressources/navigation_utils.dart';
import '../../utils/network_utils.dart';
import '../../utils/view_utils.dart';
import '../view/SignUpView.dart';

class SignUpViewController extends StatefulWidget {
  const SignUpViewController({super.key});

  @override
  SignUpController createState() {
    return SignUpController();
  }
}

class SignUpController extends State<SignUpViewController> {
  //region Variables
  bool isLoading = false;

  //endregion

  // sign up
  final signUpFormKey = GlobalKey<FormState>();
  late TextEditingController lastNameTextController;
  late TextEditingController firstNameTextController;
  late TextEditingController phoneNumberTextController;
  late TextEditingController emailTextController;
  late TextEditingController passwordTextController;
  ValueNotifier<bool> isPasswordVisible = ValueNotifier(true);
  ValueNotifier<bool> isConfirmPasswordVisible = ValueNotifier(true);
  late TextEditingController confirmPasswordTextController;
  bool acceptAdvertisingMail = false;

  //endregion

  // region Init
  @override
  void dispose() {
    lastNameTextController.dispose();
    firstNameTextController.dispose();
    phoneNumberTextController.dispose();
    emailTextController.dispose();
    passwordTextController.dispose();
    confirmPasswordTextController.dispose();

    super.dispose();
  }

  @override
  void initState() {
    lastNameTextController = TextEditingController();
    firstNameTextController = TextEditingController();
    phoneNumberTextController = TextEditingController();
    emailTextController = TextEditingController();
    passwordTextController = TextEditingController();
    confirmPasswordTextController = TextEditingController();

    _loadData();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SignUpView(this);
  }

  //endregion

  //region Data
  void _loadData() async {
    setState(() {});
  }

  //endregion

  //region User action

  onTogglePassword() {

      isPasswordVisible.value = !isPasswordVisible.value;

  }

  onToggleConfirmPassword() {

      isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value;

  }

  onAcceptAdvertisingMailClicked() {
    setState(() {
      acceptAdvertisingMail = !acceptAdvertisingMail;
    });
  }

  onSignInClicked() {
    _validateSignUpDataInputs();
  }

  //endregion

  //region SignUp WS
  _validateSignUpDataInputs() async {
    // vérifie que les données sont au bon format
    if (signUpFormKey.currentState?.validate() == true) {
      doSignIn();
    } else {
      ViewUtils().showSnackbar(context, 'Veuillez remplir tous les champs');
    }
  }

  void doSignIn() async {
    ViewUtils().closeKeyboard();

    if (await NetworkUtils().isNetworkAvailable()) {
      sendSignIn();
    } else {
      if (mounted) ViewUtils().showSnackbar(context, 'Erreur de reseau');
    }
  }

  void sendSignIn() async {
    setState(() {
      isLoading = true;
    });

    String lastName = lastNameTextController.text;
    String firstName = firstNameTextController.text;
    String phoneNumber = phoneNumberTextController.text;
    String email = emailTextController.text;
    String password = passwordTextController.text;

    //var signUpResponse = await WebServiceManager().sendSignUp(context, lastName: lastName, firstName: firstName, phoneNumber: phoneNumber, email: email, password: password, acceptAdvertisingMail: acceptAdvertisingMail);
    _navigateToNexController();


  }

//endregion

  //region Navigation
  _navigateToNexController() {
    NavigationUtils().navigateToWithReplacement(context, const MainNavigationViewController());
  }

//endregion
}
