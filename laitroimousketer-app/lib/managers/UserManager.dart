import '../database/models/User.dart';
import '../database/repositories/UserRepository.dart';
import '../main.dart';

class UserManager {
  static UserManager? _instance;

  UserManager._internal();

  factory UserManager() => _instance ?? UserManager._internal();

  static User? _currentUser;

  Future<User?> getCurrentUser() async {
     print("getCurrentUser");
    if (_currentUser != null) {
      print('current user : $_currentUser');
      return _currentUser!;
    }
    print("getCurrentUser 2");
    _currentUser = (await UserRepository(appDatabase!.userDao).getCurrentUser());
    print('current user : $_currentUser');
    return _currentUser;
  }

  void reset() {
    _currentUser = null;
  }
}