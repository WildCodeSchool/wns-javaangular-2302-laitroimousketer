import 'package:flutter/material.dart';
import 'package:laitroimousketer_app/screens/controller/SplashController.dart';
import 'package:laitroimousketer_app/theme/MainTheme.dart';

import 'database/AppDatabase.dart';



AppDatabase? appDatabase;

final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

void main() async{
  WidgetsFlutterBinding.ensureInitialized();

  await manageDatabase();
  //appDatabase!.resetDb(deleteDatabase: true);

  runApp(const MyApp());
}
Future<void> manageDatabase() async {
  appDatabase = await $FloorAppDatabase.databaseBuilder(AppDatabase.DATABASE_PATH).addMigrations([]).build();
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      navigatorKey: navigatorKey,
      theme: MainTheme.AppThemeData(),
      home:  const SplashViewController(),

    );
  }
}

