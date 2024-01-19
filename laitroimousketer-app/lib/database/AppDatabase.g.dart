// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'AppDatabase.dart';

// **************************************************************************
// FloorGenerator
// **************************************************************************

// ignore: avoid_classes_with_only_static_members
class $FloorAppDatabase {
  /// Creates a database builder for a persistent database.
  /// Once a database is built, you should keep a reference to it and re-use it.
  static _$AppDatabaseBuilder databaseBuilder(String name) =>
      _$AppDatabaseBuilder(name);

  /// Creates a database builder for an in memory database.
  /// Information stored in an in memory database disappears when the process is killed.
  /// Once a database is built, you should keep a reference to it and re-use it.
  static _$AppDatabaseBuilder inMemoryDatabaseBuilder() =>
      _$AppDatabaseBuilder(null);
}

class _$AppDatabaseBuilder {
  _$AppDatabaseBuilder(this.name);

  final String? name;

  final List<Migration> _migrations = [];

  Callback? _callback;

  /// Adds migrations to the builder.
  _$AppDatabaseBuilder addMigrations(List<Migration> migrations) {
    _migrations.addAll(migrations);
    return this;
  }

  /// Adds a database [Callback] to the builder.
  _$AppDatabaseBuilder addCallback(Callback callback) {
    _callback = callback;
    return this;
  }

  /// Creates the database and initializes it.
  Future<AppDatabase> build() async {
    final path = name != null
        ? await sqfliteDatabaseFactory.getDatabasePath(name!)
        : ':memory:';
    final database = _$AppDatabase();
    database.database = await database.open(
      path,
      _migrations,
      _callback,
    );
    return database;
  }
}

class _$AppDatabase extends AppDatabase {
  _$AppDatabase([StreamController<String>? listener]) {
    changeListener = listener ?? StreamController<String>.broadcast();
  }

  UserDao? _userDaoInstance;

  ObjectToPushDao? _objectToPushDaoInstance;

  BinaryToPushDao? _binaryToPushDaoInstance;

  Future<sqflite.Database> open(
    String path,
    List<Migration> migrations, [
    Callback? callback,
  ]) async {
    final databaseOptions = sqflite.OpenDatabaseOptions(
      version: 1,
      onConfigure: (database) async {
        await database.execute('PRAGMA foreign_keys = ON');
        await callback?.onConfigure?.call(database);
      },
      onOpen: (database) async {
        await callback?.onOpen?.call(database);
      },
      onUpgrade: (database, startVersion, endVersion) async {
        await MigrationAdapter.runMigrations(
            database, startVersion, endVersion, migrations);

        await callback?.onUpgrade?.call(database, startVersion, endVersion);
      },
      onCreate: (database, version) async {
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `User` (`firstname` TEXT NOT NULL, `lastname` TEXT NOT NULL, `email` TEXT NOT NULL, `phoneNumber` TEXT, `accessToken` TEXT, `lastPullDate` INTEGER, `localId` INTEGER, `serverId` INTEGER, `creationDate` INTEGER, `lastModifDate` INTEGER, PRIMARY KEY (`localId`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `ObjectToPush` (`id` INTEGER, `lastModifDate` INTEGER NOT NULL, `tableName` TEXT NOT NULL, `operation` TEXT NOT NULL, `idRow` INTEGER NOT NULL, `binariesToPush` TEXT, PRIMARY KEY (`id`))');
        await database.execute(
            'CREATE TABLE IF NOT EXISTS `BinaryToPush` (`id` INTEGER, `objectServerId` INTEGER NOT NULL, `tableName` TEXT NOT NULL, `columnName` TEXT NOT NULL, `fileName` TEXT, `fileType` TEXT NOT NULL, `filePath` TEXT NOT NULL, PRIMARY KEY (`id`))');

        await callback?.onCreate?.call(database, version);
      },
    );
    return sqfliteDatabaseFactory.openDatabase(path, options: databaseOptions);
  }

  @override
  UserDao get userDao {
    return _userDaoInstance ??= _$UserDao(database, changeListener);
  }

  @override
  ObjectToPushDao get objectToPushDao {
    return _objectToPushDaoInstance ??=
        _$ObjectToPushDao(database, changeListener);
  }

  @override
  BinaryToPushDao get binaryToPushDao {
    return _binaryToPushDaoInstance ??=
        _$BinaryToPushDao(database, changeListener);
  }
}

class _$UserDao extends UserDao {
  _$UserDao(
    this.database,
    this.changeListener,
  )   : _queryAdapter = QueryAdapter(database, changeListener),
        _userInsertionAdapter = InsertionAdapter(
            database,
            'User',
            (User item) => <String, Object?>{
                  'firstname': item.firstname,
                  'lastname': item.lastname,
                  'email': item.email,
                  'phoneNumber': item.phoneNumber,
                  'accessToken': item.accessToken,
                  'lastPullDate': item.lastPullDate,
                  'localId': item.localId,
                  'serverId': item.serverId,
                  'creationDate': item.creationDate,
                  'lastModifDate': item.lastModifDate
                },
            changeListener),
        _userUpdateAdapter = UpdateAdapter(
            database,
            'User',
            ['localId'],
            (User item) => <String, Object?>{
                  'firstname': item.firstname,
                  'lastname': item.lastname,
                  'email': item.email,
                  'phoneNumber': item.phoneNumber,
                  'accessToken': item.accessToken,
                  'lastPullDate': item.lastPullDate,
                  'localId': item.localId,
                  'serverId': item.serverId,
                  'creationDate': item.creationDate,
                  'lastModifDate': item.lastModifDate
                },
            changeListener);

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  final InsertionAdapter<User> _userInsertionAdapter;

  final UpdateAdapter<User> _userUpdateAdapter;

  @override
  Stream<User?> getCurrentUser() {
    return _queryAdapter.queryStream(
        'SELECT * FROM User WHERE accessToken IS NOT NULL LIMIT 1',
        mapper: (Map<String, Object?> row) => User(
            firstname: row['firstname'] as String,
            lastname: row['lastname'] as String,
            email: row['email'] as String,
            phoneNumber: row['phoneNumber'] as String?,
            accessToken: row['accessToken'] as String?,
            lastPullDate: row['lastPullDate'] as int?,
            localId: row['localId'] as int?,
            serverId: row['serverId'] as int?,
            creationDate: row['creationDate'] as int?,
            lastModifDate: row['lastModifDate'] as int?),
        queryableName: 'User',
        isView: false);
  }

  @override
  Stream<User?> getByLocalId(int id) {
    return _queryAdapter.queryStream('SELECT * FROM User WHERE localId = ?1',
        mapper: (Map<String, Object?> row) => User(
            firstname: row['firstname'] as String,
            lastname: row['lastname'] as String,
            email: row['email'] as String,
            phoneNumber: row['phoneNumber'] as String?,
            accessToken: row['accessToken'] as String?,
            lastPullDate: row['lastPullDate'] as int?,
            localId: row['localId'] as int?,
            serverId: row['serverId'] as int?,
            creationDate: row['creationDate'] as int?,
            lastModifDate: row['lastModifDate'] as int?),
        arguments: [id],
        queryableName: 'User',
        isView: false);
  }

  @override
  Stream<User?> getByServerId(int serverId) {
    return _queryAdapter.queryStream('SELECT * FROM User WHERE serverId = ?1',
        mapper: (Map<String, Object?> row) => User(
            firstname: row['firstname'] as String,
            lastname: row['lastname'] as String,
            email: row['email'] as String,
            phoneNumber: row['phoneNumber'] as String?,
            accessToken: row['accessToken'] as String?,
            lastPullDate: row['lastPullDate'] as int?,
            localId: row['localId'] as int?,
            serverId: row['serverId'] as int?,
            creationDate: row['creationDate'] as int?,
            lastModifDate: row['lastModifDate'] as int?),
        arguments: [serverId],
        queryableName: 'User',
        isView: false);
  }

  @override
  Future<void> deleteByServerId(int serverId) async {
    await _queryAdapter.queryNoReturn('DELETE FROM User WHERE serverId = ?1',
        arguments: [serverId]);
  }

  @override
  Future<void> deleteByLocalId(int localId) async {
    await _queryAdapter.queryNoReturn('DELETE FROM User WHERE localId = ?1',
        arguments: [localId]);
  }

  @override
  Future<List<User>> getAll() async {
    return _queryAdapter.queryList('SELECT * FROM User',
        mapper: (Map<String, Object?> row) => User(
            firstname: row['firstname'] as String,
            lastname: row['lastname'] as String,
            email: row['email'] as String,
            phoneNumber: row['phoneNumber'] as String?,
            accessToken: row['accessToken'] as String?,
            lastPullDate: row['lastPullDate'] as int?,
            localId: row['localId'] as int?,
            serverId: row['serverId'] as int?,
            creationDate: row['creationDate'] as int?,
            lastModifDate: row['lastModifDate'] as int?));
  }

  @override
  Future<int> insert(User item) {
    return _userInsertionAdapter.insertAndReturnId(
        item, OnConflictStrategy.rollback);
  }

  @override
  Future<List<int>> insertAll(List<User> entitiesToCreate) {
    return _userInsertionAdapter.insertListAndReturnIds(
        entitiesToCreate, OnConflictStrategy.rollback);
  }

  @override
  Future<int> updateAll(List<User> entitiesToUpdate) {
    return _userUpdateAdapter.updateListAndReturnChangedRows(
        entitiesToUpdate, OnConflictStrategy.ignore);
  }

  @override
  Future<int> update(User entity) {
    return _userUpdateAdapter.updateAndReturnChangedRows(
        entity, OnConflictStrategy.ignore);
  }
}

class _$ObjectToPushDao extends ObjectToPushDao {
  _$ObjectToPushDao(
    this.database,
    this.changeListener,
  )   : _queryAdapter = QueryAdapter(database),
        _objectToPushInsertionAdapter = InsertionAdapter(
            database,
            'ObjectToPush',
            (ObjectToPush item) => <String, Object?>{
                  'id': item.id,
                  'lastModifDate': item.lastModifDate,
                  'tableName': item.tableName,
                  'operation': item.operation,
                  'idRow': item.idRow,
                  'binariesToPush': item.binariesToPush
                });

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  final InsertionAdapter<ObjectToPush> _objectToPushInsertionAdapter;

  @override
  Future<List<ObjectToPush>> getAllObjectsToPush() async {
    return _queryAdapter.queryList('SELECT * FROM ObjectToPush ORDER BY id ASC',
        mapper: (Map<String, Object?> row) => ObjectToPush(
            row['id'] as int?,
            row['lastModifDate'] as int,
            row['tableName'] as String,
            row['operation'] as String,
            row['idRow'] as int,
            row['binariesToPush'] as String?));
  }

  @override
  Future<List<ObjectToPush>> getAllObjectsToPushWithBinaries() async {
    return _queryAdapter.queryList(
        'SELECT * FROM ObjectToPush WHERE binariesToPush IS NOT NULL ORDER BY id ASC',
        mapper: (Map<String, Object?> row) => ObjectToPush(
            row['id'] as int?,
            row['lastModifDate'] as int,
            row['tableName'] as String,
            row['operation'] as String,
            row['idRow'] as int,
            row['binariesToPush'] as String?));
  }

  @override
  Future<void> deleteObjectToPush(
    String tableName,
    int idRow,
    String operation,
  ) async {
    await _queryAdapter.queryNoReturn(
        'DELETE FROM ObjectToPush WHERE tableName = ?1 AND idRow = ?2 AND operation = ?3',
        arguments: [tableName, idRow, operation]);
  }

  @override
  Future<int?> countObjectToPush(
    String tableName,
    int idRow,
    String operation,
  ) async {
    return _queryAdapter.query(
        'SELECT COUNT (*) FROM ObjectToPush WHERE tableName = ?1 AND idRow = ?2 AND operation = ?3',
        mapper: (Map<String, Object?> row) => row.values.first as int,
        arguments: [tableName, idRow, operation]);
  }

  @override
  Future<int?> countAllObjectToPushWithBinaries() async {
    return _queryAdapter.query(
        'SELECT COUNT (*) FROM ObjectToPush WHERE binariesToPush IS NOT NULL',
        mapper: (Map<String, Object?> row) => row.values.first as int);
  }

  @override
  Future<List<ObjectToPush>> getObjectToPush(
    String tableName,
    int idRow,
    String operation,
  ) async {
    return _queryAdapter.queryList(
        'SELECT * FROM ObjectToPush WHERE tableName = ?1 AND idRow = ?2 AND operation = ?3',
        mapper: (Map<String, Object?> row) => ObjectToPush(row['id'] as int?, row['lastModifDate'] as int, row['tableName'] as String, row['operation'] as String, row['idRow'] as int, row['binariesToPush'] as String?),
        arguments: [tableName, idRow, operation]);
  }

  @override
  Future<int> insert(ObjectToPush objectToPush) {
    return _objectToPushInsertionAdapter.insertAndReturnId(
        objectToPush, OnConflictStrategy.replace);
  }
}

class _$BinaryToPushDao extends BinaryToPushDao {
  _$BinaryToPushDao(
    this.database,
    this.changeListener,
  )   : _queryAdapter = QueryAdapter(database),
        _binaryToPushInsertionAdapter = InsertionAdapter(
            database,
            'BinaryToPush',
            (BinaryToPush item) => <String, Object?>{
                  'id': item.id,
                  'objectServerId': item.objectServerId,
                  'tableName': item.tableName,
                  'columnName': item.columnName,
                  'fileName': item.fileName,
                  'fileType': item.fileType,
                  'filePath': item.filePath
                });

  final sqflite.DatabaseExecutor database;

  final StreamController<String> changeListener;

  final QueryAdapter _queryAdapter;

  final InsertionAdapter<BinaryToPush> _binaryToPushInsertionAdapter;

  @override
  Future<List<BinaryToPush>> getAllBinariesToPush() async {
    return _queryAdapter.queryList('SELECT * FROM BinaryToPush ORDER BY id ASC',
        mapper: (Map<String, Object?> row) => BinaryToPush(
            id: row['id'] as int?,
            objectServerId: row['objectServerId'] as int,
            tableName: row['tableName'] as String,
            columnName: row['columnName'] as String,
            fileType: row['fileType'] as String,
            filePath: row['filePath'] as String,
            fileName: row['fileName'] as String?));
  }

  @override
  Future<int?> deleteBinaryToPush(
    String tableName,
    int objectServerId,
  ) async {
    return _queryAdapter.query(
        'DELETE FROM BinaryToPush WHERE tableName = ?1 AND objectServerId = ?2',
        mapper: (Map<String, Object?> row) => row.values.first as int,
        arguments: [tableName, objectServerId]);
  }

  @override
  Future<int?> delete(int id) async {
    return _queryAdapter.query('DELETE FROM BinaryToPush WHERE id = ?1',
        mapper: (Map<String, Object?> row) => row.values.first as int,
        arguments: [id]);
  }

  @override
  Future<int> insert(BinaryToPush binaryToPush) {
    return _binaryToPushInsertionAdapter.insertAndReturnId(
        binaryToPush, OnConflictStrategy.replace);
  }
}
