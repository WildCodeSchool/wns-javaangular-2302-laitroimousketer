import 'dart:io';

import 'package:flutter/material.dart';

class NavigationUtils {
  //region Singleton
  static final NavigationUtils _instance = NavigationUtils._internal();

  factory NavigationUtils() {
    return _instance;
  }

  NavigationUtils._internal();

//endregion

  /// Retour arrière sur l'écran précedent
  navigateBack(BuildContext context) {
    Navigator.pop(context);
  }

  /// Navigue vers l'écran en paramètres
  /// Retour arrière sur l'écran en cours possible
  /// return le result dynamic
  Future<dynamic> navigateTo(BuildContext context, Widget viewController, [Function? then]) async {
    if (Platform.isIOS) {
      return await Navigator.push(
        context,
        MaterialPageRoute(builder: (context) {
          return viewController;
        }),
      );
    } else if (Platform.isAndroid) {
      return await Navigator.push(
        context,
        PageRouteBuilder(
          pageBuilder: (_, __, ___) {
            return viewController;
          },
          transitionDuration: Duration(seconds: 0),
        ),
      );
    }
  }

  /// Navigue vers l'écran en paramètres et le remplace
  /// Retour arrière sur l'écran en cours impossible
  /// return le result dynamic
  Future<dynamic> navigateToWithReplacement(BuildContext context, Widget viewController) async {
    if (Platform.isIOS) {
      return await Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) {
          return viewController;
        }),
      );
    } else if (Platform.isAndroid) {
      return await Navigator.pushReplacement(
        context,
        PageRouteBuilder(
          pageBuilder: (_, __, ___) {
            return viewController;
          },
          transitionDuration: Duration(seconds: 0),
        ),
      );
    }
  }

  /// Navigue vers l'écran en paramètres, vide le Stack (tous les précedents écrans) et fait un nouveau root
  /// return le result dynamic
  Future<dynamic> navigateToWithReplacementWithRoot(BuildContext context, Widget viewController) async {
    if (Platform.isIOS) {
      return await Navigator.of(context, rootNavigator: true).pushAndRemoveUntil(MaterialPageRoute(builder: (context) {
        return viewController;
      }), (route) {
        return false;
      });
    } else if (Platform.isAndroid) {
      return await Navigator.of(context, rootNavigator: true).pushAndRemoveUntil(
          PageRouteBuilder(
              pageBuilder: (_, __, ___) {
                return viewController;
              },
              transitionDuration: Duration(seconds: 0)), (route) {
        return false;
      });
    }
  }
}
