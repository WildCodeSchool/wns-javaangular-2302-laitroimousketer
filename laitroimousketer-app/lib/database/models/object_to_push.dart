import 'package:floor/floor.dart';

@Entity(primaryKeys: ['id'])
class ObjectToPush {

  @PrimaryKey(autoGenerate : true)
  int? id;

  int lastModifDate;
  String tableName;
  String operation;
  int idRow;
  String? binariesToPush;

  ObjectToPush(this.id, this.lastModifDate, this.tableName, this.operation, this.idRow, this.binariesToPush);

}