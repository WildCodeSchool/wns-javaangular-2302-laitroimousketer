import 'package:flutter/material.dart';

import '../../database/models/User.dart';
import '../../managers/SyncManager.dart';
import '../../managers/UserManager.dart';
import '../../ressources/navigation_utils.dart';
import '../../utils/network_utils.dart';
import '../../utils/view_utils.dart';
import '../../utils/web_service_utils.dart';
import '../view/SplashView.dart';
import 'LoginController.dart';
import 'MainNavigationController.dart';

class SplashViewController extends StatefulWidget {
  final bool? uriFromSignUpEmail;

  const SplashViewController({Key? key, this.uriFromSignUpEmail}) : super(key: key);

  @override
  SplashController createState() {
    return SplashController();
  }
}

class SplashController extends State<SplashViewController> {
  ValueNotifier<bool> isLoading = ValueNotifier(false);

  @override
  void dispose() {
    isLoading.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    _loadData();


  }

  @override
  Widget build(BuildContext context) {
    return SplashView(this);
  }

  _loadData() async {
    print('load data');
    isLoading.value = true;

      _manageUser();


  }

  _manageUser() async {
    // si on est déjà connecté, on fait une synchro
    print('manage user');
    UserManager().reset();
    print('user manager reset');
    User? user = await UserManager().getCurrentUser() ;
    print('user : $user');
    if (user != null) {
      _navigateToNextController();
    } else {
      _navigateToLoginController();
    }



  }





  _navigateToNextController() async {
    print('navigate to next controller');
    NavigationUtils().navigateTo(context, const MainNavigationViewController());
  }
  _navigateToLoginController() {
    print('navigate to login controller');

      NavigationUtils().navigateToWithReplacement(context, LoginViewController(fromSignUpEmail: widget.uriFromSignUpEmail ?? false));

  }
}
