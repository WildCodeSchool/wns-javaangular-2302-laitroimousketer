import 'package:floor/floor.dart';

import '../models/binary_to_push.dart';

@dao
abstract class BinaryToPushDao {
  @Query('SELECT * FROM BinaryToPush ORDER BY id ASC')
  Future<List<BinaryToPush>> getAllBinariesToPush();

  @Insert(onConflict: OnConflictStrategy.replace)
  Future<int> insert(BinaryToPush binaryToPush);

  @Query("DELETE FROM BinaryToPush WHERE tableName = :tableName AND objectServerId = :objectServerId")
  Future<int?> deleteBinaryToPush(String tableName, int objectServerId);

  @Query("DELETE FROM BinaryToPush WHERE id = :id")
  Future<int?> delete(int id);
}
