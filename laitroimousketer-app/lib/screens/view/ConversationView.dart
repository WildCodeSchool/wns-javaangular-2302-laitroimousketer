import 'package:flutter/material.dart';
import '../../ressources/base_view.dart';

import '../../theme/CustomColors.dart';
import '../controller/ConversationController.dart';

class ConversationView extends WidgetView<ConversationViewController, ConversationController> {
  const ConversationView(ConversationController state, {Key? key}) : super(state, key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: CustomColors.MENU_BACKGROUND_COLOR,
      appBar: AppBar(
        leading: IconButton(
            onPressed: () {},
            icon: Icon(
              Icons.settings,
              color: Colors.white,
            )),
        actions: [
          IconButton(
              onPressed: () {},
              icon: Icon(
                Icons.edit_square,
                color: Colors.white,
              ))
        ],
        title: Text(''),
        backgroundColor: CustomColors.MENU_BACKGROUND_COLOR,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            listOfConversation('Jhon Doe', 'Bonjour', () {}),
            listOfConversation('Joshua Doe', 'Bonjour', () {}),
            listOfConversation('Joshua Doe', 'Bonjour', () {}),
            listOfConversation('Joshua Doe', 'Bonjour', () {}),
            listOfConversation('Joshua Doe', 'Bonjour', () {}),
            listOfConversation('Joshua Doe', 'Bonjour', () {}),
            listOfConversation('Joshua Doe', 'Bonjour', () {}),
            listOfConversation('Joshua Doe', 'Bonjour', () {}),
            listOfConversation('Joshua Doe', 'Bonjour', () {}),
            listOfConversation('Joshua Doe', 'Bonjour', () {}),
          ],
        ),
      ),
    );
  }

  listOfConversation(String title, String subtitle, Function onTap) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 5),
      child: Column(
        children: [
          Container(
            decoration: BoxDecoration(
              color: CustomColors.MENU_BACKGROUND_COLOR,
            ),
            child: ListTile(
              title: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    title,
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                  ),
                  Row(
                    children: [
                      Text(
                        '05:22',
                        style: const TextStyle(
                          color: Colors.white,
                        ),
                      ),
                      Icon(
                        Icons.keyboard_arrow_right,
                        color: Colors.white,
                      )
                    ],
                  ),
                ],
              ),
              subtitle: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    subtitle,
                    style: const TextStyle(
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
              leading: CircleAvatar(
                radius: 30,
                backgroundColor: CustomColors.PRIMARY_GREEN_00B6AD,
                child: IconButton(
                  icon: Icon(
                    Icons.person,
                    color: Colors.black,
                  ),
                  onPressed: () {},
                ),
              ),
              onTap: () {
                // Action à effectuer lorsqu'un contact est cliqué
                controller.didTapOnConversation();
              },
            ),
          ),
          Container(
            height: 0.5,
            color: Colors.grey,
          ),
        ],
      ),
    );
  }
}
