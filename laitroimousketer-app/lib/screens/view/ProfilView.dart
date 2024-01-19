
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:laitroimousketer_app/widgets/FormInput.dart';

import '../../ressources/base_view.dart';
import '../../theme/CustomColors.dart';
import '../../widgets/ProgressHud.dart';
import '../controller/ProfilController.dart';

class ProfilView extends WidgetView<ProfilViewController, ProfilController> {
  const ProfilView(ProfilController state, {Key? key}) : super(state, key: key);

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder(valueListenable: controller.isLoading, builder: (context, bool isLoading, child){
      return ProgressHUD(
        inAsyncCall: isLoading,
        opacity: 0.2,
        child: AnnotatedRegion<SystemUiOverlayStyle>(
          value: SystemUiOverlayStyle(
            statusBarColor: Colors.transparent,
            statusBarIconBrightness: Brightness.dark,
            systemNavigationBarColor: Colors.transparent,
            systemNavigationBarIconBrightness: Brightness.dark,
          ),
          child: Scaffold(
            backgroundColor: CustomColors.MENU_BACKGROUND_COLOR,
            resizeToAvoidBottomInset: false,
            appBar: AppBar(
              title: Text('Mon profil'),
              centerTitle: true,
            ),
            body: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Form(
                key: controller.formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    CircleAvatar(
                      radius: 50,
                      child: ClipOval(
                        child: Image.network(
                          'https://picsum.photos/200/300',
                          width: 100,
                          height: 100,
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                    FormInput.defaultInput(controller: controller.lastNameController, label: 'Nom'),
                    FormInput.defaultInput(controller: controller.firstNameController, label: 'Prénom'),
                    FormInput.defaultInput(controller: controller.phoneNumberController, label: 'Numéro de téléphone'),
                    FormInput.defaultInput(controller: controller.emailController, label: 'Email', hint: controller.user?.email ?? ""),
                    ElevatedButton(

                      onPressed: () {
                        if (controller.formKey.currentState!.validate()) {
                          // Le formulaire est valide, effectuez l'action ici
                          // Par exemple, afficher les données saisies
                          print('Nom: ${controller.lastNameController.text}');
                          print('Prénom: ${controller.firstNameController.text}');
                          print('Numéro de téléphone: ${controller.phoneNumberController.text}'
                          );
                          controller.didTapSave();
                        }
                      },
                      child: Text('Valider'),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      );
    });
  }

}
