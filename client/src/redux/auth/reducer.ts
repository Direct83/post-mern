import { actionTypes, AuthActionTypes, AuthReducerIS } from '../actionTypes';

const initialState = {
  userId: '',
  userName: '',
  role: '',
  isAuth: false,
};
export default function userReducer(state = initialState, action: AuthActionTypes): AuthReducerIS {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.userName,
        role: action.payload.role,
        isAuth: true,
      };
    case actionTypes.LOGOUT_USER:
      return {
        userId: '',
        userName: '',
        role: '',
        isAuth: false,
      };
    default:
      return state;
  }
}
