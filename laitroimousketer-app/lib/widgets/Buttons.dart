import 'package:flutter/material.dart';

import '../theme/ButtonStyles.dart';

class Buttons {
  static Widget defaultButton({
    required BuildContext context,
    required String buttonTitle,
    required Function()? onPressedFunction,
    ButtonStyle? buttonStyle,
    bool wrapContent = false,
  }) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        minWidth: wrapContent ? 0.0 : double.infinity,
      ),
      child: ElevatedButton(
        style: buttonStyle ?? ButtonStyles.primaryButton,
        onPressed: onPressedFunction,
        child: Text(buttonTitle),
      ),
    );
  }

  static Widget customButton({
    required BuildContext context,
    required String buttonTitle,
    required Function()? onPressedFunction,
    bool wrapContent = false,
    bool? isDisabled = false,
    bool? isRed = false,
  }) {
    ButtonStyle buttonStyle = ButtonStyles.primaryButton;
    if (isRed != null && isRed) buttonStyle = ButtonStyles.redButton;
    if (isDisabled != null && isDisabled) buttonStyle = ButtonStyles.disabledButton;

    return defaultButton(
        context: context,
        buttonTitle: buttonTitle,
        onPressedFunction: (isDisabled != null && isDisabled) ? () {} : onPressedFunction,
        buttonStyle: buttonStyle,
        wrapContent: wrapContent);
  }
}
