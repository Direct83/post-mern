import { actionTypes, AuthData, ResponseAuth } from '../actionTypes';
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';

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

export function authFetchThunk(authData: AuthData, path: string) {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response: ResponseAuth = await (await fetch(`auth/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...authData }),
    })).json();
    if (response.message === 'Имени нет в базе, пожалуйста, пройдите регистрацию') {
      return { message: response.message }
    }
    dispatch(signInUser(response.userId, response.userName, response.role, +response.bannedTime))
  }
}

export function checkAuth() {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response: any = await (await fetch('auth/check')).json();
    dispatch(signInUser(response.userId, response.userName, response.role, +response.bannedTime));
  };
}
