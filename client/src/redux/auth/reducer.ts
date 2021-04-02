import { actionTypes, AuthActionTypes, AuthReducerIS } from '../actionTypes';

const initialState = {
  userId: '',
  userName: '',
  role: '',
  isAuth: false,
  message: '',
};
export default function userReducer(state = initialState, action: AuthActionTypes): AuthReducerIS {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.userName,
        role: action.payload.bannedTime < new Date().getTime() ? action.payload.role : 'banned',
        isAuth: true,
      };
    case actionTypes.LOGOUT_USER:
      return {
        userId: '',
        userName: '',
        role: '',
        isAuth: false,
        message: '',
      };
    case actionTypes.AUTH_MESSAGE_RESPONSE:
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
}
