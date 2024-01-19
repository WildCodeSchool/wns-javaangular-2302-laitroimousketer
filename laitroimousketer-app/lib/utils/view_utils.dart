import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class ViewUtils {
  //region Singleton
  static final ViewUtils _instance = ViewUtils._internal();

  factory ViewUtils() {
    return _instance;
  }

  ViewUtils._internal();

  //endregion

  //region SnackBar

  /// Affiche une Snackbar
  /// message: le message affiché
  /// duration: le temps d'affichage
  /// textStyle: si on veut customiser le text
  showSnackbar(BuildContext context, String message, {int? durationInMS, TextStyle? textStyle}) {
    final snackBar = SnackBar(
      behavior: SnackBarBehavior.floating,
      duration: Duration(milliseconds: durationInMS ?? 1000),
      content: Text(
        message,
        textAlign: TextAlign.center,
        style: textStyle,
      ),
    );

    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }

  //endregion

  //region Toast

  /// Affiche une Snackbar
  /// message: le message affiché
  /// color: la couleur du background
  /// textColor: la couleur du texte
  /// fontSize: la taille du texte

  //endregion

  //region StatusBar

  SystemUiOverlayStyle statusBarColorLight(Color color) {
    return SystemUiOverlayStyle(
      statusBarColor: color,
      statusBarIconBrightness: Platform.isIOS ? Brightness.light : Brightness.dark,
      statusBarBrightness: Platform.isIOS ? Brightness.light : Brightness.dark,
    );
  }

  SystemUiOverlayStyle statusBarColorDark(Color color) {
    return SystemUiOverlayStyle(
      statusBarColor: color,
      statusBarIconBrightness: Platform.isIOS ? Brightness.dark : Brightness.light,
      statusBarBrightness: Platform.isIOS ? Brightness.dark : Brightness.light,
    );
  }
  //endregion

  //region Keyboard
  void closeKeyboard() {
    WidgetsBinding.instance.focusManager.primaryFocus?.unfocus();
  }
//endregion
}
