import { Action } from '@ngrx/store';
import * as userAction from '../actions/user.action';
import { User } from 'src/app/core/models/user.model';

export interface UserState {
  user: User;
  users: User[];
  userConnected: User;

}

const initialState: UserState = {
  user: {} as User,
  users: [] as User[],
  userConnected: {} as User,
};

export function reducer(state = initialState, action: Action & { payload?: any }) {
  switch (action.type) {

    case userAction.action.SAVE_USER: {
      const updatedUsers = state.users.some(u => u.id === action.payload.id)
        ? state.users.map(u => (u.id === action.payload.id ? action.payload : u))
        : [...state.users, action.payload];

      return {
        ...state,
        user: action.payload,
        users: updatedUsers,
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
    case userAction.action.GET_USER_CONNECTED: {
      return {
        ...state,
        userConnected: action.payload,
      };
    }
    case userAction.action.SAVE_USER_CONNECTED: {
      return {
        ...state,
        userConnected: action.payload,
      };
    }

    default:
      return state;
  }
}


export const selectUser = (state: UserState) => state.user;
export const selectUsers = (state: UserState) => state.users;
export const selectUserConnected = (state: UserState) => state.userConnected;
