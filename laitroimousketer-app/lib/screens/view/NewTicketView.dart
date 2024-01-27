
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../ressources/base_view.dart';
import '../../theme/CustomColors.dart';
import '../../theme/Dimens.dart';
import '../../widgets/ProgressHud.dart';
import '../controller/NewTicketController.dart';

class NewTicketView extends WidgetView<NewTicketViewController, NewTicketController> {
  const NewTicketView(NewTicketController state, {Key? key}) : super(state, key: key);

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder(valueListenable: controller.isLoading, builder: (context, bool isLoading, child){
      return ProgressHUD(
        inAsyncCall: isLoading,
        opacity: 0.2,
        child: AnnotatedRegion<SystemUiOverlayStyle>(
          value: SystemUiOverlayStyle(
            statusBarColor: Colors.transparent,
            statusBarIconBrightness: Brightness.dark,
            systemNavigationBarColor: Colors.transparent,
            systemNavigationBarIconBrightness: Brightness.dark,
          ),
          child: Scaffold(
            backgroundColor: CustomColors.MENU_BACKGROUND_COLOR,
            resizeToAvoidBottomInset: false,
            body: SafeArea(
              child: Column(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Align(
                      alignment: Alignment.center,
                      child: Image.asset("assets/images/logo.png", width: Dimens.fromScreenWidth(context, coef: 0.7),)
                  )
                ],
              ),
            ),
          ),
        ),
      );
    });
  }

}
