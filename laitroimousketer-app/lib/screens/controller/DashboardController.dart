import 'package:flutter/material.dart';

import '../view/DashboardView.dart';

class DashboardViewController extends StatefulWidget {
  const DashboardViewController({Key? key}) : super(key: key);

  @override
  DashboardController createState() {
    return DashboardController();
  }
}
class DashboardController extends State<DashboardViewController> {
  //region Variables

  //endregion

  // region Init
  @override
  void dispose() {
    super.dispose();
  }

  @override
  void initState() {
    _loadData();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return DashboardView(this);
  }

  //endregion

  //region Data
  void _loadData() async {

  }

  //endregion

  //region User action

  //endregion

  //region Navigation

  //endregion
}