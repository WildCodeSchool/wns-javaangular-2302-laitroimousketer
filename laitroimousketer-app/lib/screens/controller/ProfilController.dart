import 'package:flutter/material.dart';

import '../../database/models/User.dart';
import '../../database/repositories/UserRepository.dart';
import '../../main.dart';
import '../../managers/UserManager.dart';
import '../../ressources/navigation_utils.dart';
import '../view/ProfilView.dart';

class ProfilViewController extends StatefulWidget {
  const ProfilViewController({Key? key}) : super(key: key);

  @override
  ProfilController createState() {
    return ProfilController();
  }
}

class ProfilController extends State<ProfilViewController> {
  ValueNotifier<bool> isLoading = ValueNotifier(false);
  User? user;

  // edit
  final formKey = GlobalKey<FormState>();
  late TextEditingController lastNameController;
  late TextEditingController firstNameController ;
  late TextEditingController phoneNumberController;
  late TextEditingController emailController;


  @override
  void dispose() {
    isLoading.dispose();
    lastNameController.dispose();
    firstNameController.dispose();
    phoneNumberController.dispose();
    emailController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    lastNameController = TextEditingController();
    firstNameController = TextEditingController();
    phoneNumberController = TextEditingController();
    emailController = TextEditingController();


   _loadData();
    super.initState();
  }

  void _loadData() async {
    var currentUser = await UserManager().getCurrentUser();
    user = currentUser;
    print(user!.firstname);
    print(user!.lastname);
    print(user!.phoneNumber);
    print(user!.email);
    emailController.text = user!.email;

    lastNameController.text = user!.lastname;
    firstNameController.text = user!.firstname;
    phoneNumberController.text = user!.phoneNumber!;
  }

  @override
  Widget build(BuildContext context) {
    return ProfilView(this);
  }

  snackBar(String message){
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        duration: Duration(seconds: 1),
      ),
    );
  }

  didTapSave() async {
    if (formKey.currentState!.validate()) {
      isLoading.value = true;
      var result = await UserRepository(appDatabase!.userDao).update(user!, true);

      //await UserManager().updateUser(nomController.text, prenomController.text, numeroTelController.text);
      isLoading.value = false;
      snackBar('Profil mis à jour');
      NavigationUtils().navigateBack(context);
    }
  }

  navigateBack() {
    NavigationUtils().navigateBack(context);
  }


}
