import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../view/TicketListView.dart';

class TicketListViewController extends StatefulWidget {
  const TicketListViewController({Key? key}) : super(key: key);

  @override
  TicketListController createState() {
    return TicketListController();
  }
}
class TicketListController extends State<TicketListViewController> {
  //region Variables
  ValueNotifier<List<dynamic>> data = ValueNotifier([]);

  //endregion

  // region Init
  @override
  void dispose() {
    super.dispose();
  }

  @override
  void initState() {
    _loadData();
    loadJsonData();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return TicketListView(this);
  }

  //endregion

  //region Data
  void _loadData() async {

  }
  Future<void> loadJsonData() async {
    final String jsonContent = await rootBundle.loadString('assets/test.json');
    List<dynamic> list = [];

    final jsonData = json.decode(jsonContent);
    for (var json in jsonData) {
      list.add(json);
    }

    data.value = List.of(list);

  }

  //endregion

  //region User action

  //endregion

  //region Navigation

  //endregion
}