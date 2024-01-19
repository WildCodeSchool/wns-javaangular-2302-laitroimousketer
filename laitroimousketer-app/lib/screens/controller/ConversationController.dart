import 'package:flutter/material.dart';
import 'package:laitroimousketer_app/screens/controller/MessageController.dart';

import '../../ressources/navigation_utils.dart';
import '../view/ConversationView.dart';

class ConversationViewController extends StatefulWidget {
  const ConversationViewController({Key? key}) : super(key: key);

  @override
  ConversationController createState() {
    return ConversationController();
  }
}
class ConversationController extends State<ConversationViewController> {
  //region Variables

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
    return ConversationView(this);
  }

  //endregion

  //region Data
  void _loadData() async {

  }

//endregion

//region User action
  didTapOnConversation() {
    _navToConversation();
  }

//endregion

//region Navigation
_navToConversation() {
  NavigationUtils().navigateTo(context, MessageViewController());
}

//endregion
}