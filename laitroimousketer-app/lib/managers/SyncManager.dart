// ignore_for_file: depend_on_referenced_packages

import 'dart:collection';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';
import 'package:package_info_plus/package_info_plus.dart';

import '../database/models/User.dart';
import '../database/repositories/UserRepository.dart';
import '../main.dart';
import '../ressources/navigation_utils.dart';
import '../screens/controller/SplashController.dart';
import '../utils/web_service_utils.dart';
import 'UserManager.dart';
import 'WebServiceManager.dart';

class SyncManager {
  //region Init
  static final SyncManager _instance = SyncManager._internal();
  bool isSync = false;

  factory SyncManager() {
    return _instance;
  }

  SyncManager._internal();

  //endregion

  //region Sync
  Future<WSResponse> doSync() async {
    return WSResponse(result: WSResult.ERROR);
  }


  Future<void> disconnect(BuildContext context, {bool deleteDatabase = false}) async {
    // Si on est en mode debug, on s'assure qu'on arrete l'impersonate

    await appDatabase!.resetDb(deleteDatabase: deleteDatabase);
    UserManager().reset();

      NavigationUtils().navigateToWithReplacementWithRoot(context, const SplashViewController());

  }
}
