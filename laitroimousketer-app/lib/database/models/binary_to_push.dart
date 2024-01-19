library flu_bleu122_utils;

import 'dart:collection';

import 'package:floor/floor.dart';

@Entity(primaryKeys: ['id'])
class BinaryToPush {
  @PrimaryKey(autoGenerate: true)
  int? id;

  /// Correspond au serverId de l'objet concerné,
  /// par exemple si le [BinaryToPush] concerne une photo d'un objet User, il faut renseigner le serverId du User
  /// Required : true
  /// ID de l'objet dans la DB serveur
  /// Exemple: 1
  /// Pour le web correspond à [serverId]
  int objectServerId;

  /// Correspond au nom de la table de l'objet concerné,
  /// par exemple si le [BinaryToPush] concerne une photo d'un objet User, il faut renseigner le nom de table du User
  /// Required : true
  /// Type de l'objet du fichier
  /// Exemple: User
  /// Pour le web correspond à [objectType]
  String tableName;

  /// Correspond a la variable utilisée pour définir l'image
  /// par exemple User possède une valeur pictureId mais aussi documentId
  /// Le [BinaryToPush] définit une seule de ces deux valeurs
  /// Required : true
  /// Nom de la colonne du fichier dans l'objet
  /// Exemple: picture
  String columnName;

  @Deprecated("Dans la nouvelle version des [BinaryToPush] cette valeur n'est plus utilisé, il faut préciser avec [columnName]")
  String? fileName;

  /// Correspond au type du binaire, nécessaire pour le backend.
  /// Suivant le projet, l'enum correspondant peut être different.
  /// Required : true
  /// Type du fichier
  /// Exemple: IMAGE
  String fileType;

  /// Correspond au chemin local du [File] à envoyer au serveur.
  /// La plupart du temps il correspondra à [SynchronizableWithImageEntity.imageLocalUrl]
  String filePath;

  BinaryToPush({
    required this.id,
    required this.objectServerId,
    required this.tableName,
    required this.columnName,
    required this.fileType,
    required this.filePath,
    this.fileName,
  });

  /// Construit un objet [BinaryToPush] à partir du json contenu dans l'objet [ObjectToPush]
  /// Cette fonction doit être appelée après le push d'un [ObjectToPush], puis le [BinaryToPush] doit être inséré en base pour être envoyé
  static BinaryToPush fromJson({
    required int objectServerId,
    required String objectTableName,
    required Map<String, dynamic> binaryToPushJson,
  }) {
    var columnName;
    if (binaryToPushJson.containsKey("columnName")) {
      columnName = binaryToPushJson["columnName"];
    } else {
      throw ("Couldn't find the columnName entry, this is mandatory.");
    }

    var fileName = "";
    if (binaryToPushJson.containsKey("fileName")) {
      fileName = binaryToPushJson["fileName"];
    }

    var fileType;
    if (binaryToPushJson.containsKey("fileType")) {
      fileType = binaryToPushJson["fileType"];
    } else {
      throw ("Couldn't find the fileType entry, this is mandatory.");
    }

    var filePath;
    if (binaryToPushJson.containsKey("filePath")) {
      filePath = binaryToPushJson["filePath"];
    } else {
      throw ("Couldn't find the filePath entry, this is mandatory.");
    }

    return BinaryToPush(
      id: null,
      objectServerId: objectServerId,
      tableName: objectTableName,
      columnName: columnName,
      fileType: fileType,
      filePath: filePath,
      fileName: fileName,
    );
  }

  /// Construit un json d'un futur [BinaryToPush] qui sera inseré dans l'objet [ObjectToPush]
  /// Cette fonction doit être appelée dans les [SynchronizableRepository] des enfants (exemple UserRepository)
  /// [columnName] Nom de la column utilisé pour afficher le fichier (exemple picture pour un objet User)
  /// [fileType] Type du binaire, exemple IMAGE
  /// [filePath] Chemin local vers le fichier
  static HashMap<String, String> toJson({
    required String columnName,
    required String fileType,
    required String filePath,
  }) {
    HashMap<String, String> json = HashMap<String, String>();

    json["columnName"] = columnName;
    json["fileType"] = fileType;
    json["filePath"] = filePath;

    return json;
  }
}
