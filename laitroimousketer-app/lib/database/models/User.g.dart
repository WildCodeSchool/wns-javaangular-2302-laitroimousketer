// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'User.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

User _$UserFromJson(Map<String, dynamic> json) => User(
      firstname: json['firstname'] as String,
      lastname: json['lastname'] as String,
      email: json['email'] as String,
      phoneNumber: json['phoneNumber'] as String?,
      accessToken: json['accessToken'] as String?,
      lastPullDate: json['lastPullDate'] as int?,
      localId: json['localId'] as int?,
      serverId: json['serverId'] as int?,
      creationDate: json['creationDate'] as int?,
      lastModifDate: json['lastModifDate'] as int?,
    );

Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
      'localId': instance.localId,
      'serverId': instance.serverId,
      'creationDate': instance.creationDate,
      'lastModifDate': instance.lastModifDate,
      'firstname': instance.firstname,
      'lastname': instance.lastname,
      'email': instance.email,
      'phoneNumber': instance.phoneNumber,
      'accessToken': instance.accessToken,
      'lastPullDate': instance.lastPullDate,
    };
