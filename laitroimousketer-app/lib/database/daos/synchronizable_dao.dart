import 'package:floor/floor.dart';

abstract class SynchronizableDao<T> {

  @Insert(onConflict: OnConflictStrategy.rollback)
  Future<int> insert(T item);

  @Insert(onConflict: OnConflictStrategy.rollback)
  Future<List<int>> insertAll(List<T> entitiesToCreate);

  @Update(onConflict: OnConflictStrategy.ignore)
  Future<int> updateAll(List<T> entitiesToUpdate);

  @Update(onConflict: OnConflictStrategy.ignore)
  Future<int> update(T entity);
}
