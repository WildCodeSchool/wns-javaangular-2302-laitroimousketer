import 'package:flutter/material.dart';
import 'package:laitroimousketer_app/theme/CustomColors.dart';
import '../../ressources/base_view.dart';
import '../controller/MessageController.dart';


class MessageView extends WidgetView<MessageViewController, MessageController>{
  const MessageView(MessageController state, {Key? key}) : super(state, key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: CustomColors.MENU_BACKGROUND_COLOR,
      appBar: AppBar(
        backgroundColor: CustomColors.MENU_BACKGROUND_COLOR,
        title: Text('Jhon Doe '),
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: ListView.builder(
              itemCount: controller.messages.length,
              itemBuilder: (context, index) {
                return _buildMessage(controller.messages[index]);
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(10),
            child: _buildInputField(),
          ),
        ],
      ),
    );
  }
  Widget _buildMessage(Message message) {
    return Container(
      padding: EdgeInsets.all(8.0),
      alignment: message.isMe ? Alignment.centerRight : Alignment.centerLeft,
      child: Card(
        elevation: 3.0,
        child: Container(
          padding: EdgeInsets.all(10.0),
          child: Text(
            message.text,
            style: TextStyle(fontSize: 16.0),
          ),
        ),
      ),
    );
  }

  Widget _buildInputField() {
    return Container(
      padding: EdgeInsets.all(8.0),
      child: Row(
        children: <Widget>[
          Expanded(
            child: TextField(
              decoration: InputDecoration(

                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                    color: CustomColors.PRIMARY_GREEN_00B6AD,
                  ),
                ),
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                    color: CustomColors.PRIMARY_BLUE_02AACC,
                  ),
                ),
                hintText: 'Entrez votre message...',
                border: OutlineInputBorder(

                ),
              ),
            ),
          ),
          SizedBox(width: 8.0),
          IconButton(
            icon: Icon(Icons.send),
            color: CustomColors.PRIMARY_BLUE_02AACC,
            onPressed: () {
              // Action à effectuer lors de l'envoi du message
              print('Message envoyé !');
            },
          ),
        ],
      ),
    );
  }
}