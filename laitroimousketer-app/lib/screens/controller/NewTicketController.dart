import 'package:flutter/material.dart';

import '../../ressources/navigation_utils.dart';
import '../view/NewTicketView.dart';
import 'MainNavigationController.dart';

class NewTicketViewController extends StatefulWidget {
  const NewTicketViewController({Key? key}) : super(key: key);

  @override
  NewTicketController createState() {
    return NewTicketController();
  }
}

class NewTicketController extends State<NewTicketViewController> {
  ValueNotifier<bool> isLoading = ValueNotifier(false);

  @override
  void dispose() {
    isLoading.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return NewTicketView(this);
  }

}
