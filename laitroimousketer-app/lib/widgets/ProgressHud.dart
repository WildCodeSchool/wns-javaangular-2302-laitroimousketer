import 'package:flutter/material.dart';

import '../theme/CustomColors.dart';
import '../theme/Dimens.dart';


class ProgressHUD extends StatelessWidget {
  final Widget child;
  final bool inAsyncCall;
  final double opacity;
  final Color color;
  final Animation<Color> valueColor;
  final String loadingText;

  const ProgressHUD(
      {Key? key,
        required this.child,
        required this.inAsyncCall,
        this.opacity = 1,
        this.color = Colors.grey,
        this.valueColor = const AlwaysStoppedAnimation<Color>(CustomColors.PRIMARY_GREEN_00B6AD),
        this.loadingText = ""})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    List<Widget> widgetList = <Widget>[];
    widgetList.add(child);
    if (inAsyncCall) {
      final modal = Stack(
        children: [
          Opacity(
            opacity: opacity,
            child: ModalBarrier(dismissible: false, color: color),
          ),
          Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircularProgressIndicator(
                    valueColor: valueColor,
                  ),
                  const SizedBox(
                    height: Dimens.spacing_xlarge_32,
                  ),
                  Text(
                    loadingText,
                    style: TextStyle(fontSize: 18, color: valueColor.value),
                  )
                ],
              )),
        ],
      );
      widgetList.add(modal);
    }
    return Stack(
      children: widgetList,
    );
  }
}
