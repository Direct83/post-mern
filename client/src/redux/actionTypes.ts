export enum actionTypes {
  LOGIN_USER = 'LOGIN_USER',
  LOGOUT_USER = 'LOGOUT_USER',
  AUTH_USER = 'AUTH_USER',
  ADD_POST_DATA = 'ADD_POST_DATA',
  DISLIKE_POST_DATA = 'DISLIKE_POST_DATA',
  LIKE_POST_DATA = 'LIKE_POST_DATA'

};
//Auth
export interface AuthData {
  name: string,
  password: string,
}
export interface ResponseAuth {
  userId: string,
  userName: string,
  role: string,
  message: string,
}
export interface AuthUserPayload {
  type: actionTypes.AUTH_USER
  payload: {
    authData: AuthData;
    path: string;
  }
}
export interface AuthReducerIS {
  userId: string,
  userName: string,
  role: string,
  isAuth: boolean,
}
interface SignInUser {
  type: typeof actionTypes.LOGIN_USER,
  payload: {
    userId: string,
    userName: string,
    role: string,
  }
}
interface LogOutUser {
  type: typeof actionTypes.LOGOUT_USER,
}
export type AuthActionTypes = SignInUser | LogOutUser
//Post
interface reaction {
  userId: string,
  status: boolean,
}
export interface Post {
  id: string,
  title: string,
  text: string,
  creator: string,
  like: reaction[],
  dislike: reaction[],
}
export interface ContentReducerIS {
  posts: Post[]
}
interface PostData {
  type: typeof actionTypes.ADD_POST_DATA,
  payload: Post
}
interface reactionDL {
  postId: string,
  userId: string,
}
interface Dislike {
  type: typeof actionTypes.DISLIKE_POST_DATA,
  payload: reactionDL
}
interface Like {
  type: typeof actionTypes.LIKE_POST_DATA,
  payload: reactionDL
}
export type ContentActionTypes = PostData | Dislike | Like

