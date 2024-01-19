import 'package:connectivity_plus/connectivity_plus.dart';

class NetworkUtils {

  //region Singleton
  static final NetworkUtils _instance = NetworkUtils._internal();

  factory NetworkUtils() {
    return _instance;
  }

  NetworkUtils._internal();
  //endregion

  Future<bool> isNetworkAvailable() async {
    var connectivityResult = await (Connectivity().checkConnectivity());
    if (connectivityResult == ConnectivityResult.none) {
      // This logic for checking connectivity status once again after a 5
      // milliseconds delay is required for iOS devices because of:
      // https://github.com/fluttercommunity/plus_plugins/issues/852
      await Future.delayed(const Duration(microseconds: 5));
      final newConnectivityStatus = await Connectivity().checkConnectivity();
      if (newConnectivityStatus != ConnectivityResult.mobile && newConnectivityStatus != ConnectivityResult.wifi) {
        return false;
      }
    }
    if (connectivityResult != ConnectivityResult.mobile && connectivityResult != ConnectivityResult.wifi) {
      return false;
    }

    return true;
  }
}
