import { Action } from '@ngrx/store';
import * as userAction from '../actions/user.action';
import { User } from 'src/app/core/models/user.model';

export interface UserState {
  user: User;
  users: User[];

}

const initialState: UserState = {
  user: {} as User,
  users: [] as User[],
};

export function reducer(state = initialState, action: Action & { payload?: any }) {
  switch (action.type) {

    case userAction.action.SAVE_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case userAction.action.GET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case userAction.action.GET_USERS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case userAction.action.SAVE_USERS: {
      return {
        ...state,
        users: action.payload,
      };
    };

    default:
      return state;
  }
}


export const getUser = (state: UserState) => state.user;
export const getUsers = (state: UserState) => state.users;
