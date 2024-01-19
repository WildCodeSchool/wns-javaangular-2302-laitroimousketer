import 'package:flutter/material.dart';
import 'package:laitroimousketer_app/theme/CustomColors.dart';
import '../../ressources/base_view.dart';

import 'package:laitroimousketer_app/screens/controller/SettingsController.dart';

class SettingsView extends WidgetView<SettingsViewController, SettingsController> {
  const SettingsView(SettingsController state, {Key? key}) : super(state, key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          automaticallyImplyLeading: false,
          title: Text(
            'Parametres',
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
          backgroundColor: Colors.transparent,
          elevation: 0,
        ),
        body: content());
  }

  content() {
    return Padding(
      padding: const EdgeInsets.only(top: 80),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: controller.item.length,
              itemBuilder: (context, index) {
                var item = controller.item[index];
                return listOfConversation(item);
              },
            ),
          ),

        ],
      ),
    );
  }


  listOfConversation(PageName pageName) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 5),
      child: Column(
        children: [
          ListTile(
            title: Row(
              children: [
                Icon(
                  pageName.icon,
                  color: Colors.white,
                ),
                SizedBox(
                  width: 10,
                ),
                Text(
                  pageName.name,
                  style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                ),
              ],
            ),
            onTap: (){
              controller.didTapOnIndexPage(pageName);
            },
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Container(
              height: 0.5,
              color: Colors.blue,
            ),
          ),
        ],
      ),
    );
  }
}
