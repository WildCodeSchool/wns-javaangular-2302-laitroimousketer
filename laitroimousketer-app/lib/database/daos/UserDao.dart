import 'package:floor/floor.dart';
import 'package:laitroimousketer_app/database/daos/synchronizable_dao.dart';

import '../models/User.dart';

@dao
abstract class UserDao implements SynchronizableDao<User> {

  @Query('SELECT * FROM User WHERE accessToken IS NOT NULL LIMIT 1')
  Stream<User?> getCurrentUser();

  @Query('SELECT * FROM User WHERE localId = :id')
  Stream<User?> getByLocalId(int id);

  @Query("SELECT * FROM User WHERE serverId = :serverId")
  Stream<User?> getByServerId(int serverId);

  @Query('DELETE FROM User WHERE serverId = :serverId')
  Future<void> deleteByServerId(int serverId);

  @Query('DELETE FROM User WHERE localId = :localId')
  Future<void> deleteByLocalId(int localId);

  @Query("SELECT * FROM User")
  Future<List<User>> getAll();
}
