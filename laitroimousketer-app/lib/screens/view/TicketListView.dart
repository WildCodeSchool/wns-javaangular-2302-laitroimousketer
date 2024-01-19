import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:laitroimousketer_app/ressources/base_view.dart';
import 'package:laitroimousketer_app/screens/controller/TicketListController.dart';

import '../../ressources/navigation_utils.dart';
import '../../theme/CustomColors.dart';

class TicketListView extends WidgetView<TicketListViewController, TicketListController> {
  const TicketListView(TicketListController state, {Key? key}) : super(state, key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: CustomColors.BACKGROUND_COLOR,
      resizeToAvoidBottomInset: false,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(50),
        child: AppBar(
          actions: [
            IconButton(
                onPressed: () {
                },
                icon: const Icon(
                  Icons.add,
                  color: Colors.white,
                ))],
          automaticallyImplyLeading: false,
          centerTitle: true,
          title: const Text(
            'Liste des tickets',
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
          backgroundColor: CustomColors.BACKGROUND_COLOR,
          elevation: 0,
        ),
      ),
      body: SingleChildScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        scrollDirection: Axis.vertical,
        child: Column(
          children: [
            bugTable(context),
          ],
        ),
      ),
    );
  }

  bugTable(BuildContext context) {
    return ValueListenableBuilder(
        valueListenable: controller.data,
        builder: (context, List<dynamic> tableData, child) {
          if (tableData.isEmpty) {
            return const Padding(
              padding: EdgeInsets.only(top: 20),
              child: Center(
                  child: Text(
                'no data',
                style: TextStyle(color: Colors.white),
              )),
            );
          }
          return Container(
            color: CustomColors.BACKGROUND_COLOR,
            child: Column(
              children: [
                Row(
                  children: [
                    tableColum('nom'),
                    tableColum('date'),
                    tableColum('priorite'),
                    tableColum('statut'),
                  ],
                ),
                ListView.builder(
                  shrinkWrap: true,
                  itemCount: tableData.length,
                  physics: const NeverScrollableScrollPhysics(),
                  itemBuilder: (context, index) {
                    final value = tableData[index];
                    return listOfTicket(value['nom'], value['userid'].toString(), () => null);
                    // return _dataTable(context, value);
                  },
                )
              ],
            ),
          );
        });
  }

  tableColum(String title) {
    return Expanded(
      child: Container(
        height: 50,
        padding: const EdgeInsets.all(5),
        decoration: const BoxDecoration(
          border: Border(
            bottom: BorderSide(width: 1.0, color: Colors.grey),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              title,
              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.white),
            ),
            const Icon(
              Icons.arrow_drop_down,
              color: Colors.white,
            ),
          ],
        ),
      ),
    );
  }

  tableRow(value, String? title, {Function? onTap}) {
    return Expanded(
      child: Container(
        height: 50,
        decoration: const BoxDecoration(
          border: Border(
            bottom: BorderSide(width: 1.0, color: Colors.grey),
          ),
        ),
        child: Center(
          child: onTap != null
              ? InkWell(
                  onTap: () => onTap(),
                  child: const Icon(
                    Icons.settings,
                    color: Colors.black,
                  ),
                )
              : Text(
                  value[title].toString() ?? "",
                  style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.black),
                ),
        ),
      ),
    );
  }

  listOfTicket(String title, String subtitle, Function onTap) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10.0),
          border: Border.all(color: Colors.black),
          color: CustomColors.FORM_INPUT_GRAY,
        ),
        child: ListTile(
          title: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: const TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
              ),
              Text(
                'moyen',
                style: const TextStyle(
                  color: Colors.orange,
                ),
              ),
              Icon(Icons.circle, color: Colors.red),
            ],
          ),
          subtitle: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '27/05/2023',
                style: const TextStyle(
                  color: Colors.black,
                ),
              ),
              Text(
                subtitle,
                style: const TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
              ),
            ],
          ),
          leading: CircleAvatar(
            radius: 30,
            backgroundColor: CustomColors.PRIMARY_GREEN_00B6AD,
            child: IconButton(
              icon: Icon(
                Icons.person,
                color: Colors.black,
              ),
              onPressed: () {},
            ),
          ),
          onTap: () {
            // Action à effectuer lorsqu'un contact est cliqué
            print('Contact sélectionné: ');
          },
        ),
      ),
    );
  }

  test(value) {
    return Row(
      children: [
        tableRow(value, 'id'),
        tableRow(value, 'nom'),
        tableRow(value, 'date'),
        tableRow(value, 'priorite'),
        tableRow(value, 'statut'),
        tableRow(value, 'userid'),
      ],
    );
  }
}
