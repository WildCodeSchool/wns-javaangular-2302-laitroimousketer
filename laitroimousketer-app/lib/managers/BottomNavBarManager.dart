import 'package:flutter/cupertino.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

//region enum
enum BottomNavigationBarItemEnum {
  home,
  table,
  chat,
  user
}

extension BottomNavigationBarItemEnumProperties on BottomNavigationBarItemEnum {
  PhosphorIconData getIcon(){
    switch(this){
      case BottomNavigationBarItemEnum.home: return PhosphorIcons.duotone.database;
      case BottomNavigationBarItemEnum.table: return PhosphorIcons.duotone.table;
      case BottomNavigationBarItemEnum.chat: return PhosphorIcons.regular.chatText;
      case BottomNavigationBarItemEnum.user: return PhosphorIcons.regular.user;

    }
  }
}
//endregion

//region Manager
class HomeManager {
  static final HomeManager _instance = HomeManager._internal();

  factory HomeManager() {
    return _instance;
  }

  HomeManager._internal();

  //region isLoading
  ValueNotifier<bool> _isLoading = ValueNotifier(false);

  ValueNotifier<bool> getIsLoading(){
    return _isLoading;
  }

  void setIsLoading(bool value){
    _isLoading.value = value;
  }
  //endregion

  //region navigation
  ValueNotifier<BottomNavigationBarItemEnum> _currentPage = ValueNotifier(BottomNavigationBarItemEnum.home);
  List<BottomNavigationBarItemEnum> navStack = [];

  ValueNotifier<BottomNavigationBarItemEnum> getCurrentPage(){
    return _currentPage;
  }

  void changeCurrentTab(BottomNavigationBarItemEnum targetedPage){
    _currentPage.value = targetedPage;
    navStack.add(targetedPage);
  }

  void goBackInStack(){
    if(navStack.isNotEmpty){
      navStack.removeLast();
      _currentPage.value = navStack.last;
    }
  }

  void reset(){
    navStack = [];
    _currentPage.value = BottomNavigationBarItemEnum.home;
  }
//endregion
}
//endregion