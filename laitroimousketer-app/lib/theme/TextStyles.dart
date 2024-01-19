import 'package:flutter/material.dart';

import 'CustomColors.dart';
import 'Dimens.dart';

class TextStyles {
  // w300 = light
  // w600 = semibold


  //region Large Text

  static TextStyle xlarge_26({Color? color, FontWeight? fontWeight}) => TextStyle(fontWeight: fontWeight ?? FontWeight.normal, fontSize: Dimens.font_size_xlarge_26, color: color ?? CustomColors.TEXT_COLOR_DARK);
  static TextStyle large_22({Color? color, FontWeight? fontWeight}) => TextStyle(fontWeight: fontWeight ?? FontWeight.normal, fontSize: Dimens.font_size_large_22, color: color ?? CustomColors.TEXT_COLOR_DARK);

  //endregion

  //region Medium Text

  static TextStyle xmedium_18({Color? color, FontWeight? fontWeight}) => TextStyle(fontWeight: fontWeight ?? FontWeight.normal, fontSize: Dimens.font_size_xmedium_18, color: color ?? CustomColors.TEXT_COLOR_DARK);
  static TextStyle medium_16({Color? color, FontWeight? fontWeight}) => TextStyle(fontWeight: fontWeight ?? FontWeight.normal, fontSize: Dimens.font_size_medium_16, color: color ?? CustomColors.TEXT_COLOR_DARK);

  //endregion

  //region Normal Text
  static TextStyle normal_14({Color? color, FontWeight? fontWeight}) => TextStyle(fontWeight: fontWeight ?? FontWeight.normal, fontSize: Dimens.font_size_normal_14, color: color ?? CustomColors.TEXT_COLOR_DARK);

  //endregion

  //region Small Text
  static TextStyle small_12({Color? color, FontWeight? fontWeight}) => TextStyle(fontWeight: fontWeight ?? FontWeight.normal, fontSize: Dimens.font_size_small_12, color: color ?? CustomColors.TEXT_COLOR_DARK);
  static TextStyle xsmall_10({Color? color, FontWeight? fontWeight}) => TextStyle(fontWeight: fontWeight ?? FontWeight.normal, fontSize: 10, color: color ?? CustomColors.TEXT_COLOR_DARK);

  //endregion

  //region Button
  static TextStyle button({Color? color, FontWeight? fontWeight}) => TextStyle(fontSize: Dimens.font_size_medium_16, fontWeight: fontWeight ?? FontWeight.bold, color: color ?? CustomColors.TEXT_COLOR_DARK);
  static TextStyle buttonSmall({Color? color, FontWeight? fontWeight}) => TextStyle(fontSize: Dimens.font_size_normal_14, fontWeight: fontWeight ?? FontWeight.bold, color: color ?? CustomColors.TEXT_COLOR_DARK);

//endregion
}
