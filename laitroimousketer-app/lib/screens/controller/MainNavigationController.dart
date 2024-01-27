
import 'package:flutter/material.dart';
import 'package:laitroimousketer_app/screens/controller/SettingsController.dart';
import 'package:laitroimousketer_app/screens/controller/ConversationController.dart';
import 'package:laitroimousketer_app/screens/controller/DashboardController.dart';
import 'package:laitroimousketer_app/screens/controller/TicketListController.dart';
import 'package:laitroimousketer_app/screens/view/MainNavigationView.dart';



enum MenuItem {
  dashboard, list, messages, settings
}

class MainNavigationViewController extends StatefulWidget {
  const MainNavigationViewController({super.key});


  static MainNavigationController? of(BuildContext context) =>
      context.findAncestorStateOfType<MainNavigationController>();

  @override
  MainNavigationController createState() {
    return MainNavigationController();
  }
}

class MainNavigationController extends State<MainNavigationViewController> {
  //region Variables
  ValueNotifier<bool> isLoading = ValueNotifier(false);
  ValueNotifier<MenuItem> currentMenuItemDisplayed = ValueNotifier(MenuItem.dashboard) ;
  Map<MenuItem, Widget> screens = {
    MenuItem.dashboard:  const DashboardViewController(),
    MenuItem.list: const TicketListViewController(),
    MenuItem.messages: const ConversationViewController(),
    MenuItem.settings: const SettingsViewController(),
  };

  //endregion

  // region Init
  @override
  void dispose() {
    isLoading.dispose();
    currentMenuItemDisplayed.dispose();
    super.dispose();
  }

  @override
  void initState() {
    _loadData();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return MainNavigationView(this);
  }

  //endregion

  //region Data
  void _loadData() async {

    }

  Widget? getCurrentDisplayedScreen() {
    return screens[currentMenuItemDisplayed.value] ;
  }

  didTapMenuItem(int index) {
    currentMenuItemDisplayed.value = MenuItem.values[index] ;
  }


}
