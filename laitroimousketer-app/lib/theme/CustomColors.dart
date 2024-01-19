// ignore_for_file: constant_identifier_names, non_constant_identifier_names

import 'package:flutter/material.dart';

import 'Dimens.dart';

class CustomColors {

  static const PRIMARY_GREEN_00B6AD = Color(0xFF00B6AD);

  static const SECONDARY_BLUE_013C72 = Color(0xff013C72);
  static const SECONDARY_BLUE_LIGHT_2779C5 = Color(0xff2779C5);
  static const SECONDARY_BLUE_ULTRA_LIGHT_6AB7FF = Color(0xFF6AB7FF);
  static const SECONDARY_BLUE_DARK_002E59 = Color(0xff002E59);

  static const PRIMARY_BLUE_02AACC = Color(0xff02AACC);
  static const SECONDARY_GRAY_LIGHT_DFDFDF = Color(0xffDFDFDF);
  static const SECONDARY_GRAY_A8A9AE = Color(0xffA8A9AE);



  static const TERTIARY_ORANGE_FAA51A = Color(0xffFAA51A);
  static const TERTIARY_ORANGE_30_FAA51A = Color(0x4DFAA51A);

  static const TEXT_COLOR_DARK = Color(0XFF001B34);
  static const TEXT_COLOR_LIGHT = Color(0xFFFFFFFF);
  static const TEXT_COLOR_SECONDARY = SECONDARY_BLUE_ULTRA_LIGHT_6AB7FF;
  // static const TEXT_COLOR_SECONDARY = Color(0xCCFFFFFF);

  static const BACKGROUND_COLOR = SECONDARY_BLUE_DARK_002E59;
  static const MENU_BACKGROUND_COLOR = Color(0xFF282A2A) ;

  static const FORM_INPUT_GRAY = Color(0xffF2F2F2);
  static const FORM_INPUT_LIGHT_TEXT_COLOR = Color(0x80FFFFFF);
  static const FORM_INPUT_BORDER_COLOR = Color(0xff013C72);
  static const FORM_INPUT_BACKGROUND_COLOR = Color(0xff002446);
  static const FORM_INPUT_ERROR_BORDER_COLOR = Colors.red;

  static const CARD_BACKGROUND_COLOR = SECONDARY_BLUE_013C72;
  static const CARD_SHADOW_COLOR = Colors.transparent;
  static const CARD_TEXT_COLOR = Color(0xFFFFFFFF);
  static const CARD_TEXT_SECONDARY_COLOR = SECONDARY_BLUE_LIGHT_2779C5 ;
  static const CARD_ACCENT_COLOR = PRIMARY_GREEN_00B6AD ;

  static const ERROR_COLOR = Colors.red;

  static final ThemeData reportBugTheme = ThemeData(

      primaryColor: CustomColors.PRIMARY_GREEN_00B6AD,
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: CustomColors.PRIMARY_GREEN_00B6AD,
        ),
      ),
      colorScheme: const ColorScheme(
        brightness: Brightness.dark,
        primary: CustomColors.PRIMARY_GREEN_00B6AD,
        onPrimary: Colors.white,
        secondary: CustomColors.SECONDARY_BLUE_013C72,
        onSecondary: CustomColors.SECONDARY_BLUE_ULTRA_LIGHT_6AB7FF,
        error: CustomColors.ERROR_COLOR,
        onError: Colors.white,
        background: CustomColors.BACKGROUND_COLOR,
        onBackground: CustomColors.TEXT_COLOR_LIGHT,
        surface: CustomColors.SECONDARY_BLUE_013C72,
        onSurface: CustomColors.SECONDARY_BLUE_ULTRA_LIGHT_6AB7FF,
        onSurfaceVariant: CustomColors.TEXT_COLOR_DARK,
      ),
      inputDecorationTheme: InputDecorationTheme(
        fillColor: CustomColors.FORM_INPUT_BACKGROUND_COLOR,
        hintStyle: const TextStyle(color: CustomColors.FORM_INPUT_LIGHT_TEXT_COLOR),
        labelStyle: const TextStyle(color: CustomColors.FORM_INPUT_LIGHT_TEXT_COLOR),
        border: OutlineInputBorder(
            borderSide: const BorderSide(
                color: CustomColors.FORM_INPUT_BORDER_COLOR),
            borderRadius: BorderRadius.circular(Dimens.spacing_small_4)),
        focusedBorder: OutlineInputBorder(
            borderSide: const BorderSide(
                color: CustomColors.FORM_INPUT_BORDER_COLOR),
            borderRadius: BorderRadius.circular(Dimens.spacing_small_4)),
        enabledBorder: OutlineInputBorder(
            borderSide: const BorderSide(
                color: CustomColors.FORM_INPUT_BORDER_COLOR),
            borderRadius: BorderRadius.circular(Dimens.spacing_small_4)),
        errorBorder: OutlineInputBorder(
            borderSide: const BorderSide(
                color: CustomColors.FORM_INPUT_ERROR_BORDER_COLOR),
            borderRadius: BorderRadius.circular(Dimens.spacing_small_4)),
      ),
      sliderTheme: SliderThemeData(
          activeTrackColor: CustomColors.SECONDARY_BLUE_LIGHT_2779C5,
          inactiveTrackColor: CustomColors.MENU_BACKGROUND_COLOR,
          thumbColor: CustomColors.PRIMARY_GREEN_00B6AD,
          trackHeight: 10,
          overlayShape: SliderComponentShape.noOverlay
      ),
      cardTheme: CardTheme(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(Dimens.card_corner_radius_10),
        ),
        color: CustomColors.CARD_BACKGROUND_COLOR,
      ),
      buttonTheme: ButtonThemeData(
          padding: const EdgeInsets.symmetric(vertical: Dimens.spacing_normal_8),
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(Dimens.bottom_view_corner_radius_40)
          )
      )

  );

}

