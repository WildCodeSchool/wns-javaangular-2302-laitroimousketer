import 'dart:math';

import 'package:flutter/cupertino.dart';

class AnimateUtils {
  // region const
  static const animatedSwitcherDuration = Duration(milliseconds: 500);

  // endregion

  static animatedWidget({required Widget child}) {
    return AnimatedSwitcher(
      duration: animatedSwitcherDuration,
      child: child,
    );
  }

  static Future<dynamic> showAnimatedDialog({required Widget dialog, required BuildContext context}) async {
    return await showGeneralDialog(
      context: context,
      pageBuilder: (BuildContext context, a1, a2) {
        return Container();
      },
      transitionBuilder: (BuildContext context, a1, a2, child) {
        var curve = Curves.elasticOut.transform(a1.value);
        return Transform.scale(
          scale: curve,
          child: Opacity(
            opacity: min(a1.value * 2, 1),
            child: dialog,
          ),
        );
      },
      barrierDismissible: false,
      transitionDuration: const Duration(milliseconds: 400),
    );
  }
}
