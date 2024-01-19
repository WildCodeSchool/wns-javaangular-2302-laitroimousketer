import 'dart:collection';
import 'dart:convert';

import '../daos/object_to_push_dao.dart';
import '../models/object_to_push.dart';
import '../models/synchronizable_entity.dart';


enum ObjectToPushOperation { ADD, UPDATE, DELETE }

class ObjectToPushRepository {
  //region Singleton
  static final ObjectToPushRepository _instance = ObjectToPushRepository._internal();
  bool isSync = false;

  ObjectToPushDao? dao;

  factory ObjectToPushRepository(ObjectToPushDao objectToPushDao) {
    _instance.dao = objectToPushDao;
    return _instance;
  }

  ObjectToPushRepository._internal();

  //endregion
  Future<List<ObjectToPush>> getAllObjectsToPush() => dao!.getAllObjectsToPush();

  Future<List<ObjectToPush>> getAllObjectsToPushWithBinaries() => dao!.getAllObjectsToPushWithBinaries();

  Future<int?> countAllObjectToPushWithBinaries() => dao!.countAllObjectToPushWithBinaries();

  void deleteObjectToPush(String tableName, int idRow, String operation) => dao!.deleteObjectToPush(tableName, idRow, operation);

  Future<int> saveObjectToPush(SynchronizableEntity synchronizableEntity, String operation, String tableName, HashMap<String, String>? binariesToPush) async {
    String? binariesToPushJson;

    if (binariesToPush != null) {
      binariesToPushJson = json.encode(binariesToPush);
    }

    var objectToPush = ObjectToPush(null, synchronizableEntity.lastModifDate!, tableName, operation, synchronizableEntity.localId!, binariesToPushJson);

    // UPDATE
    // -> on regarde si il y avait un update avant et on le remplace
    // -> on regarde si il y avait un add, dans ce cas pas besoin du update
    if (objectToPush.operation == ObjectToPushOperation.UPDATE.toString()) {
      // supprime le precedent update
      dao!.deleteObjectToPush(objectToPush.tableName, objectToPush.idRow, objectToPush.operation);

      // si il y a un add, on ne fait rien
      var otpAdd = await dao!.getObjectToPush(objectToPush.tableName, objectToPush.idRow, ObjectToPushOperation.ADD.toString());
      var numRows = otpAdd.length;
      if (numRows > 0) {
        return -1;
      } else {
        //Si pas de add mais que le serverId est null
        if (synchronizableEntity.serverId == null || synchronizableEntity.serverId! < 0) {
          objectToPush.operation = ObjectToPushOperation.ADD.toString();
        }
      }
    }

    // DELETE -> on regarde si il y avait des add ou des update et on les supprime car devenus inutiles
    if (objectToPush.operation == ObjectToPushOperation.DELETE.toString()) {
      // Si il y avait un add
      var otpAdd = await dao!.getObjectToPush(objectToPush.tableName, objectToPush.idRow, ObjectToPushOperation.ADD.toString());
      var numRows = otpAdd.length;
      if (numRows == null) {
        numRows = 0;
      }
      // si il y avait un update
      var otpUpdate = await dao!.getObjectToPush(objectToPush.tableName, objectToPush.idRow, ObjectToPushOperation.UPDATE.toString());
      var numRowsUpdate = otpUpdate.length;
      if (numRowsUpdate == null) {
        numRowsUpdate = 0;
      }
      numRows += numRowsUpdate;

      // si y y avait des add ou update, on supprime, et si ça n'existait pas sur le serveur, pas besoin de créer un delete
      if (numRows > 0) {
        dao!.deleteObjectToPush(objectToPush.tableName, objectToPush.idRow, ObjectToPushOperation.ADD.toString());
        dao!.deleteObjectToPush(objectToPush.tableName, objectToPush.idRow, ObjectToPushOperation.UPDATE.toString());
        if (synchronizableEntity.serverId == null) {
          return -1;
        }
      }
      objectToPush.idRow = synchronizableEntity.serverId!;
    }

    return await dao!.insert(objectToPush);
  }
}
