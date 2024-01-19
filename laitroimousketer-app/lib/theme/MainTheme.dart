import 'package:flutter/material.dart';

import 'CustomColors.dart';
import 'Dimens.dart';


class MainTheme {
  static AppThemeData(){
    return ThemeData(
        fontFamily: 'Sora',
        primaryColor: CustomColors.PRIMARY_GREEN_00B6AD,
        textButtonTheme: TextButtonThemeData(
          style: TextButton.styleFrom(
            foregroundColor: CustomColors.PRIMARY_GREEN_00B6AD,
            textStyle: const TextStyle(fontFamily: 'Sora'),
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
              borderRadius: BorderRadius.circular(Dimens.spacing_small_4 )),
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
}