
import 'package:flutter/material.dart';

import 'CustomColors.dart';
import 'Dimens.dart';
import 'TextStyles.dart';

class ButtonStyles {
  static ButtonStyle _defaultButtonStyle({required Color textColor, required Color backgroundColor, required Color borderColor, bool isSmallButton = false}) {
    return ElevatedButton.styleFrom(
      foregroundColor: textColor,
      backgroundColor: backgroundColor,
      disabledBackgroundColor: backgroundColor,
      shadowColor: Colors.transparent,
      textStyle: isSmallButton ? TextStyles.buttonSmall(color: textColor) : TextStyles.button(color: textColor),
      padding: isSmallButton
          ? const EdgeInsets.symmetric(horizontal: Dimens.spacing_large_16, vertical: Dimens.spacing_normal_8)
          : const EdgeInsets.symmetric(horizontal: Dimens.spacing_large_16, vertical: Dimens.spacing_medium_12),
      side: BorderSide(color: borderColor),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.all(Radius.circular(Dimens.card_corner_radius_10)),
      ),
    );
  }

  static ButtonStyle get primaryButtonSmall => _defaultButtonStyle(
    textColor: CustomColors.TEXT_COLOR_LIGHT,
    backgroundColor: CustomColors.PRIMARY_BLUE_02AACC,
    borderColor: Colors.transparent,
    isSmallButton: true,
  );

  static ButtonStyle get activeButtonSmall => _defaultButtonStyle(
    textColor: CustomColors.TEXT_COLOR_DARK,
    backgroundColor: Colors.transparent,
    borderColor: CustomColors.PRIMARY_BLUE_02AACC,
    isSmallButton: true,
  );

  static ButtonStyle get primaryButton => _defaultButtonStyle(
    textColor: CustomColors.TEXT_COLOR_LIGHT,
    backgroundColor: CustomColors.PRIMARY_BLUE_02AACC,
    borderColor: Colors.transparent,
  );

  static ButtonStyle get activeButton => _defaultButtonStyle(
    textColor: CustomColors.TEXT_COLOR_LIGHT,
    backgroundColor: Colors.transparent,
    borderColor: CustomColors.PRIMARY_BLUE_02AACC,
  );

  static ButtonStyle get disabledButton => _defaultButtonStyle(
    textColor: CustomColors.TEXT_COLOR_LIGHT,
    backgroundColor: CustomColors.SECONDARY_GRAY_A8A9AE,
    borderColor: Colors.transparent,
  );

  static ButtonStyle get redButton => _defaultButtonStyle(
    textColor: CustomColors.TEXT_COLOR_LIGHT,
    backgroundColor: CustomColors.ERROR_COLOR,
    borderColor: Colors.transparent,
  );

  static ButtonStyle get outlinedButton => _defaultButtonStyle(
    textColor: CustomColors.PRIMARY_BLUE_02AACC,
    backgroundColor: Colors.transparent,
    borderColor: CustomColors.PRIMARY_BLUE_02AACC,
  );

  static ButtonStyle get greyButtonBlueBorder => _defaultButtonStyle(
    textColor: CustomColors.PRIMARY_BLUE_02AACC,
    backgroundColor: CustomColors.SECONDARY_GRAY_LIGHT_DFDFDF,
    borderColor: CustomColors.PRIMARY_BLUE_02AACC,
  );
}
