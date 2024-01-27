
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:laitroimousketer_app/screens/controller/MainNavigationController.dart';

import '../../ressources/base_view.dart';


class MainNavigationView extends WidgetView<MainNavigationViewController, MainNavigationController> {
  const MainNavigationView(MainNavigationController state, {super.key}) : super(state);

  @override
  Widget build(BuildContext context) {

    return WillPopScope(
      onWillPop: () async {
        Navigator.pop(context);
        SystemNavigator.pop();
        return false ;
      },
      child: ValueListenableBuilder(
          valueListenable: controller.currentMenuItemDisplayed,
          builder: (context, MenuItem currentMenuItemDisplayed, child) {

            return AnnotatedRegion<SystemUiOverlayStyle>(
                value: SystemUiOverlayStyle(
                  statusBarColor: Colors.transparent,
                  statusBarIconBrightness: Brightness.light,
                  statusBarBrightness: Brightness.dark,
                ),
                child: Scaffold(
                  resizeToAvoidBottomInset: false,
                  bottomNavigationBar: _bottomMenu(context, currentMenuItemDisplayed),
                  body: controller.getCurrentDisplayedScreen(),
                )
            );
          }
      ),
    );
  }

  //region Bottom Menu
  BottomNavigationBar _bottomMenu(BuildContext context, MenuItem currentMenuItemDisplayed) {

    return BottomNavigationBar(
      backgroundColor: Theme.of(context).colorScheme.surfaceVariant,
      currentIndex: currentMenuItemDisplayed.index,
      onTap: controller.didTapMenuItem,
      selectedItemColor: Theme.of(context).colorScheme.onSurface ,
      unselectedItemColor: Theme.of(context).colorScheme.onSurfaceVariant,
      selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 10),
      unselectedLabelStyle: const TextStyle(fontSize: 10),
      showUnselectedLabels: true,
      type: BottomNavigationBarType.fixed,
      items: [
        _bottomNavigationBarItem(context, iconName: Icons.dashboard, label: "Dashboard"),
        _bottomNavigationBarItem(context, iconName: Icons.list, label: "Tickets"),
        _bottomNavigationBarItem(context, iconName: Icons.message, label: "Messages"),
        _bottomNavigationBarItem(context, iconName: Icons.settings, label: "Parametres"),
      ],

    );
  }

  BottomNavigationBarItem _bottomNavigationBarItem(BuildContext context, { required iconName, required String label} ) {
    var iconSize = 30.0 ;
    return BottomNavigationBarItem(
      icon: Padding(
        padding: const EdgeInsets.only(top:8.0, bottom: 4.0),
        child: Icon(iconName, color: Theme.of(context).colorScheme.onSurfaceVariant , size: iconSize,)
      ),
      activeIcon: Padding(
        padding: const EdgeInsets.only(top:8.0, bottom: 4.0),
        child: Icon(iconName, color: Theme.of(context).colorScheme.onSurface , size: iconSize,)
      ),
      label: label,

    );
  }

//endregion
}
