import 'dart:async';

import 'package:flutter/material.dart';

import 'ConfirmDialogView.dart';

class SimpleConfirmationDialogViewController extends StatefulWidget {

  final String title;
  final String description;
  final String? validateText;
  final bool? redButton;
  final bool? disabledButton;
  final Function() onValidatePressed;

  const SimpleConfirmationDialogViewController({
    Key? key,
    required this.title,
    required this.description,
    this.validateText,
    this.redButton,
    this.disabledButton,
    required this.onValidatePressed,
  }) : super(key: key);

  @override
  SimpleConfirmationDialogController createState() {
    return SimpleConfirmationDialogController();
  }
}

class SimpleConfirmationDialogController extends State<SimpleConfirmationDialogViewController> {
  @override
  Widget build(BuildContext context) {
    return SimpleConfirmationDialogView(this);
  }

  Future<bool> onTapOutside() async{
    Navigator.pop(context);
    return false;
  }
}