import 'package:encrypt/encrypt.dart' as encrypt;

class SecurityUtils {

  String encryptPassword(String password, String encryptionKey) {
    final key = encrypt.Key.fromUtf8(encryptionKey);
    final iv = encrypt.IV.allZerosOfLength(16);
    final encrypter = encrypt.Encrypter(encrypt.AES(key, mode: encrypt.AESMode.cbc));
    final encrypted = encrypter.encrypt(password, iv: iv);
    print("encrypted : ${encrypted.base16.toString()}");
    return encrypted.base16.toString();
  }

  bool checkPassword(String encryptedPassword, String password, String encryptionKey){
    final key = encrypt.Key.fromUtf8(encryptionKey);
    final iv = encrypt.IV.allZerosOfLength(16);
    final encrypter = encrypt.Encrypter(encrypt.AES(key, mode: encrypt.AESMode.cbc));
    final decryptedPassword = encrypter.decrypt(encrypt.Encrypted.fromBase16(encryptedPassword), iv: iv);
    return (decryptedPassword == password);
  }
}

