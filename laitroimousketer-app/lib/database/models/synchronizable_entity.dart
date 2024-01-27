import 'package:floor/floor.dart';
import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
abstract class SynchronizableEntity {
  @PrimaryKey(autoGenerate: true)
  int? localId;
  int? serverId;
  int? creationDate;
  int? lastModifDate;

  SynchronizableEntity(this.localId, this.serverId, this.creationDate, this.lastModifDate);
}
