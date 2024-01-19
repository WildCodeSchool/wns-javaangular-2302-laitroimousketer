

import '../daos/synchronizable_dao.dart';
import '../models/synchronizable_entity.dart';

abstract class SynchronizableRepository<T extends SynchronizableEntity> {
  late SynchronizableDao dao;

  setDao(SynchronizableDao dao) {
    this.dao = dao;
  }

  Future<int> updateFromServer(T entity) => dao.update(entity);

  Future<SynchronizableEntity> manageFieldsToKeepAfterUpdate(T entityToUpdate, T oldEntity);

  Future<Map<String, dynamic>> toJson(T entity);

  Future<SynchronizableEntity?> getByLocalId(int entityId);

  Future<SynchronizableEntity?> getByServerId(int entityId);

  Future<List<SynchronizableEntity>> getAll();

  deleteByServerId(int serverId);

  saveAll(List<T> entitiesToCreate, List<T> entitiesToUpdate);

  deleteByLocalId(int localId);
}
