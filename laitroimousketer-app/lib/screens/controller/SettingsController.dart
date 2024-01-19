import 'package:flutter/material.dart';
import 'package:laitroimousketer_app/screens/controller/ProfilController.dart';
import 'package:laitroimousketer_app/screens/controller/SplashController.dart';

import '../../managers/SyncManager.dart';
import '../../ressources/navigation_utils.dart';
import '../view/SettingsView.dart';

enum PageName { Profil, ResetPassword, Notifications, Disconnect }

extension PageNameExtension on PageName {
  String get name {
    switch (this) {
      case PageName.Profil:
        return "Profil";
      case PageName.ResetPassword:
        return "Reset password";
      case PageName.Notifications:
        return "Notifications";
      case PageName.Disconnect:
        return "Deconnexion";
    }
  }
}

extension PageNameIconExtension on PageName {
  IconData get icon {
    switch (this) {
      case PageName.Profil:
        return Icons.person;
      case PageName.ResetPassword:
        return Icons.lock;
      case PageName.Notifications:
        return Icons.notifications;
      case PageName.Disconnect:
        return Icons.logout;
    }
  }
}
extension PageNamePageExtension on PageName {
  Widget get page {
    switch (this) {
      case PageName.Profil:
        return const ProfilViewController();
      case PageName.ResetPassword:
        return const ProfilViewController();
      case PageName.Notifications:
        return const ProfilViewController();
      case PageName.Disconnect:
        return const SplashViewController();
    }
  }
}

class SettingsViewController extends StatefulWidget {
  const SettingsViewController({Key? key}) : super(key: key);

  @override
  SettingsController createState() {
    return SettingsController();
  }
}

class SettingsController extends State<SettingsViewController> {
  //region Variables
  ValueNotifier<bool> isLoading = ValueNotifier(false);
  var item = [
    PageName.Profil,
    PageName.ResetPassword,
    PageName.Notifications,
    PageName.Disconnect
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
    return SettingsView(this);
  }

  //endregion

  //region Data
  void _loadData() async {}

  //endregion

  //region User action
  didTapOnIndexPage(PageName pageName) {
    print("controller");
    if(pageName == PageName.Disconnect){
      didTapOnDisconnect();
      return;
    }
    NavigationUtils().navigateTo(context, pageName.page);
  }

  didTapOnDisconnect() async {
    print("disconnect");
    await SyncManager().disconnect(context);
    //await NavigationUtils().navigateToWithReplacementWithRoot(context, const SplashViewController());
  }

  //endregion

  //region Navigation

  //endregion
}
