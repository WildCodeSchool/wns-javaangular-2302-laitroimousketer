import 'package:flutter/material.dart';

abstract class WidgetView<T1, T2> extends StatelessWidget {
  final T2 controller;

  T1 get widget => (controller as State).widget as T1;

  const WidgetView(this.controller, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context);
}

abstract class StatelessView<T1> extends StatelessWidget {
  final T1 widget;

  const StatelessView(this.widget, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context);
}