
import 'package:flutter/material.dart';
import '../theme/Dimens.dart';
import '../widgets/Buttons.dart';
import 'ConfirmDialogViewController.dart';
import 'base_view.dart';

class SimpleConfirmationDialogView extends WidgetView<SimpleConfirmationDialogViewController, SimpleConfirmationDialogController> {
  const SimpleConfirmationDialogView(SimpleConfirmationDialogController state, {Key? key}) : super(state, key: key);

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: controller.onTapOutside,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: controller.onTapOutside,
        child: Dialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          backgroundColor: Colors.transparent,
          elevation: 0,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  padding: const EdgeInsets.all(Dimens.spacing_large_16),
                  child: Material(
                      color: Colors.transparent,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(controller.widget.title,
                          ),
                          const SizedBox(height: Dimens.spacing_large_16,),
                          Text(controller.widget.description),
                          const SizedBox(height: Dimens.spacing_mlarge_24,),
                          _buttonsLine(context)
                        ],
                      )
                  )
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buttonsLine(BuildContext context){
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        GestureDetector(
          onTap: () => {Navigator.pop(context)},
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: Dimens.spacing_mlarge_24),
            child: Text("annuler", style: const TextStyle(decoration: TextDecoration.underline),),
          ),
        ),
        Expanded(child:
        Buttons.customButton(
            context: context,
            isRed: controller.widget.redButton,
            isDisabled: controller.widget.disabledButton,
            buttonTitle: controller.widget.validateText ?? "valider",
            onPressedFunction: () => controller.widget.onValidatePressed()
        )
        )
      ],
    );
  }
}
