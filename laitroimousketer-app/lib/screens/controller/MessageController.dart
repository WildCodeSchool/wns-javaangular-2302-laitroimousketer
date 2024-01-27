import 'package:flutter/material.dart';

import '../view/MessageView.dart';

class Message {
  final String sender;
  final String text;
  final bool isMe;

  Message({required this.sender, required this.text, required this.isMe});
}

class MessageViewController extends StatefulWidget {
  const MessageViewController({Key? key}) : super(key: key);

  @override
  MessageController createState() {
    return MessageController();
  }
}
class MessageController extends State<MessageViewController> {
  //region Variables
  final List<Message> messages = [
    Message(sender: 'John', text: 'Salut, comment ça va ?', isMe: false),
    Message(sender: 'Moi', text: 'Ça va bien, merci !', isMe: true),
    Message(sender: 'John', text: 'Quoi de neuf ?', isMe: false),
    Message(sender: 'Moi', text: 'Pas grand chose, et toi ?', isMe: true),
    // Ajoutez d'autres messages selon votre besoin
  ];
  //endregion

  // region Init
  @override
  void dispose() {
    super.dispose();
  }

  @override
  void initState() {
    _loadData();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return MessageView(this);
  }

  //endregion

  //region Data
  void _loadData() async {

  }

//endregion

//region User action

//endregion

//region Navigation

//endregion
}