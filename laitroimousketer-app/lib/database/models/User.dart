import 'package:floor/floor.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:laitroimousketer_app/database/models/synchronizable_entity.dart';

part 'User.g.dart';

@Entity(primaryKeys: ['localId'])
@JsonSerializable()
class User extends SynchronizableEntity {
  String firstname;
  String lastname;
  String email;

  String? phoneNumber;
  String? accessToken;
  int? lastPullDate;

  User({
    required this.firstname,
    required this.lastname,
    required this.email,
    this.phoneNumber,
    this.accessToken,
    this.lastPullDate,
    required int? localId,
    required int? serverId,
    required int? creationDate,
    required int? lastModifDate,
  }) : super(localId, serverId, creationDate, lastModifDate);

  factory User.fromJson(Map<String, dynamic> json) {
    try {
      return _$UserFromJson(json);
    } catch (error) {
      throw ("An error occured while transforming User.fromJson, $error");
    }
  }

  Map<String, dynamic> toJson() {
    try {
      return _$UserToJson(this);
    } catch (error) {
      throw ("An error occured while transforming User.toJson, $error");
    }
  }
}
