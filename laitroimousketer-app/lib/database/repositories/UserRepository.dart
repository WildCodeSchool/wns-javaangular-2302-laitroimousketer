


import 'package:laitroimousketer_app/database/repositories/synchronizable_repository.dart';

import '../../main.dart';
import '../daos/UserDao.dart';
import '../models/User.dart';
import '../models/synchronizable_entity.dart';
import 'object_to_push_repository.dart';

class UserRepository extends SynchronizableRepository<User> {
  //region Singleton
  static final UserRepository _instance = UserRepository._internal();

  factory UserRepository(UserDao userDao) {
    _instance.dao = userDao;
    return _instance;
  }

  UserRepository._internal();
  //endregion

//region Generated

  @override
  Future<SynchronizableEntity> manageFieldsToKeepAfterUpdate(User entityToUpdate, User oldEntity) async {
    entityToUpdate.accessToken = oldEntity.accessToken;
    return entityToUpdate;
  }

  @override
  Future<Map<String, dynamic>> toJson(SynchronizableEntity entity) async {
    Map<String, dynamic> userJson = (entity as User).toJson();
    return userJson;
  }

  @override
  Future<User?> getByLocalId(int entityId) async {
    return await (dao as UserDao).getByLocalId(entityId).first;
  }

  @override
  Future<User?> getByServerId(int entityId) async {
    return await (dao as UserDao).getByServerId(entityId).first;
  }

  @override
  Future<List<SynchronizableEntity>> getAll() async {
    return await (dao as UserDao).getAll();
  }

  @override
  deleteByServerId(int serverId) {
    return (dao as UserDao).deleteByServerId(serverId);
  }

  @override
  saveAll(List<SynchronizableEntity> entitiesToCreate, List<SynchronizableEntity> entitiesToUpdate) {
    if (entitiesToCreate.isNotEmpty) {
      var usersToCreate = List<User>.from(entitiesToCreate);
      dao.insertAll(usersToCreate);
    }
    if (entitiesToUpdate.isNotEmpty) {
      var usersToUpdate = List<User>.from(entitiesToUpdate);
      dao.updateAll(usersToUpdate);
    }
  }

  Future<int> insert(User user, bool needToPush) async {
    user.localId = await dao.insert(user);
    if (needToPush && user.localId! > 0) {
      var result = await ObjectToPushRepository(appDatabase!.objectToPushDao).saveObjectToPush(user, ObjectToPushOperation.ADD.toString(), "User", null);
      if (result <= 0) {
        return -1;
      }
    }
    return user.localId!;
  }

  Future<int> update(User user, bool needToPush) async {
    var result = -1;

    if (needToPush) {
      user.lastModifDate = DateTime.now().millisecondsSinceEpoch;
      result = await dao.update(user);
      if (result > 0) {
        result = await ObjectToPushRepository(appDatabase!.objectToPushDao).saveObjectToPush(user, ObjectToPushOperation.UPDATE.toString(), "User", null);
        if (result <= 0) {
          return -1;
        }
      }
    } else {
      result = await dao.update(user);
    }

    return result;
  }

  @override
  deleteByLocalId(int localId) {
    (dao as UserDao).deleteByLocalId(localId);
  }

  Future<bool> delete(User user, bool needToPush) async {
    await (dao as UserDao).deleteByLocalId(user.localId!);
    if (needToPush) {
      user.lastModifDate = DateTime.now().millisecondsSinceEpoch;
      var result = await ObjectToPushRepository(appDatabase!.objectToPushDao).saveObjectToPush(user, ObjectToPushOperation.DELETE.toString(), "User", null);
      if (result <= 0) {
        return false;
      }
    }

    return true;
  }
//endregion

  Future<User?> getCurrentUser() async {
    print("getCurrentUser from UserRepository");
    return await (dao as UserDao).getCurrentUser().first;
  }

}

