import 'package:flutter/material.dart';


class Dimens {

  // region Screen dimensions
  static double fromScreenHeight(BuildContext context, {required double coef}) {
    return MediaQuery.of(context).size.height * coef;
  }

  static double fromScreenWidth(BuildContext context, {required double coef}) {
    return MediaQuery.of(context).size.width * coef;
  }

  static double statusBarHeight(BuildContext context) {
    return MediaQuery.of(context).padding.top;
  }
  // end region

  // Region Spacing / Padding dimensions
  static const spacing_small_4 = 4.0;
  static const spacing_normal_8 = 8.0;
  static const spacing_medium_12= 12.0;
  static const spacing_large_16 = 16.0;
  static const spacing_mlarge_24 = 24.0;
  static const spacing_xlarge_32 = 32.0;
  static const spacing_xxlarge_48 = 48.0;
  // end region

  // Region Font Size dimensions
  static const font_size_small_12 = 12.0;
  static const font_size_normal_14 = 14.0;
  static const font_size_medium_16 = 16.0;
  static const font_size_xmedium_18 = 18.0;
  static const font_size_large_22 = 22.0;
  static const font_size_mlarge_24 = 24.0;
  static const font_size_xlarge_26 = 26.0;
  static const font_size_xxlarge_28 = 28.0;
  // endregion

  // region CornerRadius
  static const card_corner_radius_10 = 10.0;
  static const bottom_view_corner_radius_40 = 40.0;
  // endregion

  // region Card
  static const card_shadow_blur_radius_4 = 4.0;
  static const card_shadow_offset_x_0 = 0.0;
  static const card_shadow_offset_y_2 = 2.0;
// endregion
}
