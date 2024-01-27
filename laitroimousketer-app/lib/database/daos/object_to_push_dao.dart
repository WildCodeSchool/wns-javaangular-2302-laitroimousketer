import 'package:floor/floor.dart';

import '../models/object_to_push.dart';

@dao
abstract class ObjectToPushDao {
  @Query('SELECT * FROM ObjectToPush ORDER BY id ASC')
  Future<List<ObjectToPush>> getAllObjectsToPush();

  @Query('SELECT * FROM ObjectToPush WHERE binariesToPush IS NOT NULL ORDER BY id ASC')
  Future<List<ObjectToPush>> getAllObjectsToPushWithBinaries();

  @Query("DELETE FROM ObjectToPush WHERE tableName = :tableName AND idRow = :idRow AND operation = :operation")
  Future<void> deleteObjectToPush(String tableName, int idRow, String operation);

  @Query("SELECT COUNT (*) FROM ObjectToPush WHERE tableName = :tableName AND idRow = :idRow AND operation = :operation")
  Future<int?> countObjectToPush(String tableName, int idRow, String operation);

  @Query("SELECT COUNT (*) FROM ObjectToPush WHERE binariesToPush IS NOT NULL")
  Future<int?> countAllObjectToPushWithBinaries();

  @Query("SELECT * FROM ObjectToPush WHERE tableName = :tableName AND idRow = :idRow AND operation = :operation")
  Future<List<ObjectToPush>> getObjectToPush(String tableName, int idRow, String operation);

  @Insert(onConflict: OnConflictStrategy.replace)
  Future<int> insert(ObjectToPush objectToPush);
}
