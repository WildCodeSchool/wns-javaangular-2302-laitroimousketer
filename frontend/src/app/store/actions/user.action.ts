import { selectUserConnected } from './../reducers/user.reducer';
import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';



export const action = {
  GET_USER: '[DataStore] Get USER',
  GET_USERS: '[DataStore] get all USERS',
  CREATE_USER: '[DataStore] create USER',
  UPDATE_USER: '[DataStore] update lutilisateur dans le store',
  DELETE_USER: '[DataStore] delete USER',
  SAVE_USER: '[DataStore] enregistre lutilisateur dans le store',
  SAVE_USERS: '[DataStore] save all USERS',
  GET_USER_CONNECTED: '[DataStore] get USER CONNECTED',
  SAVE_USER_CONNECTED: '[DataStore] save USER CONNECTED',
  CRUD_OPERATION_SUCCESS: '[DataStore] crud operation success',
  CLEAR: '[DataStore] clear',

};

// **** Ticket ****
export const crudOperationSuccess = createAction('[CRUD] Operation Success');

export const getUser = createAction(action.GET_USER, props<{ payload: number, displayInSidebar?: boolean }>());
export const saveUser = createAction(action.SAVE_USER, props<{ payload: User }>());
export const createUser = createAction(action.CREATE_USER, props<{ payload: User }>());
export const updateUser = createAction(action.UPDATE_USER, props<{ payload: Partial<User> }>());
export const deleteUser = createAction(action.DELETE_USER, props<{ payload: number }>());
export const getUsers = createAction(action.GET_USERS);
export const saveUsers = createAction(action.SAVE_USERS, props<{ payload: User[] }>());
export const getUserConnected = createAction(action.GET_USER_CONNECTED, props<{ payload: number }>());
export const saveUserConnected = createAction(action.SAVE_USER_CONNECTED, props<{ payload: User }>());
export const clear = createAction(action.CLEAR);

