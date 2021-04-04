import { actionTypes, AuthData, ResponseAuth } from '../actionTypes';
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux';
import { RootState } from '../store'

export function signInUser(userId: string, userName: string, role: string, bannedTime: number) {
  return {
    type: actionTypes.LOGIN_USER,
    payload: {
      userId,
      userName,
      role,
      bannedTime,
    },
  };
}
export function logOutUser() {
  return {
    type: actionTypes.LOGOUT_USER,
  };
}
export function LogOutUserFetchThunk()
  : ThunkAction<Promise<void>, RootState, unknown, AnyAction> {
  return async (dispatch) => {
    await fetch('auth/signout');
    dispatch(logOutUser());
  };
}
export function authFetchThunk(authData: AuthData, path: string)
  : ThunkAction<Promise<void>, RootState, unknown, AnyAction> {
  return async (dispatch) => {
    const { userId, userName, role, bannedTime, message }
      : ResponseAuth = await (await fetch(`auth/${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...authData }),
      })).json();

    message !== undefined
      ? dispatch(sendMessage(message))
      : dispatch(signInUser(userId, userName, role, +bannedTime))
  }
}
export function checkAuth()
  : ThunkAction<Promise<void>, RootState, unknown, AnyAction> {
  return async (dispatch) => {
    const response = await (await fetch('auth/check')).json();
    dispatch(signInUser(response.userId, response.userName, response.role, +response.bannedTime));
  };
}
export function sendMessage(message: string) {
  return {
    type: actionTypes.AUTH_MESSAGE_RESPONSE,
    payload: {
      message,
    }
  };
}
export function bannedTimeFetchThunk(userId: string, bannedTimeChange: string)
  : ThunkAction<Promise<void>, RootState, unknown, AnyAction> {
  return async () => {
    await (await fetch('auth/change/bannedTime', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, bannedTimeChange })
    })).json()
  }
}
export function roleFetchThunk(userId: string, roleChange: string)
  : ThunkAction<Promise<void>, RootState, unknown, AnyAction> {
  return async () => {
    await fetch('auth/change/role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, roleChange })
    })
  }
}
