import 'dart:async';

import 'package:floor/floor.dart';
import 'package:sqflite/sqflite.dart' as sqflite;

import '../main.dart';
import 'daos/UserDao.dart';
import 'daos/binary_to_push_dao.dart';
import 'daos/object_to_push_dao.dart';
import 'models/User.dart';
import 'models/binary_to_push.dart';
import 'models/object_to_push.dart';
part 'AppDatabase.g.dart'; // the generated code will be there


@Database(
  version: 1,
    entities: [

      User,
      ObjectToPush,
      BinaryToPush,

    ]
)
abstract class AppDatabase extends FloorDatabase {
  // ignore: constant_identifier_names
  static const DATABASE_PATH = 'app_database.db';


  UserDao get userDao;

  ObjectToPushDao get objectToPushDao;
  BinaryToPushDao get binaryToPushDao;

  Future<void> resetDb({bool resetUser = true, bool deleteDatabase = false}) async {
    await database.execute('DELETE FROM ObjectToPush');
    await database.execute('DELETE FROM BinaryToPush');
    if (resetUser) {
      await database.execute('DELETE FROM User');
    }
  }

  Future<String> getDatabasePath() async {
    return await sqfliteDatabaseFactory.getDatabasePath(DATABASE_PATH);
  }

  Future<void> cleanDatabase() async {
    sqfliteDatabaseFactory.deleteDatabase(DATABASE_PATH);
    //await manageDatabase();
  }
}
