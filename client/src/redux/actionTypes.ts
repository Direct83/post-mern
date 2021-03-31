export enum actionTypes {
  LOGIN_USER = 'LOGIN_USER',
  LOGOUT_USER = 'LOGOUT_USER',
  AUTH_USER = 'AUTH_USER',
  ADD_POST_DATA = 'ADD_POST_DATA',
  DISLIKE_POST_DATA = 'DISLIKE_POST_DATA',
  LIKE_POST_DATA = 'LIKE_POST_DATA',
  ADD_COMMENT_DATA = 'ADD_COMMENT_DATA',
  DELETE_POST = 'DELETE_POST',
  UPD_POST = 'UPD_POST',
  DELETE_COMMENT = 'DELETE_COMMENT',
  UPD_COMMENT = 'UPD_COMMENT',
  EDIT_COMMENT = 'EDIT_COMMENT',
  EDIT_POST = 'EDIT_POST'
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
interface Reaction {
  userId: string,
  status: boolean,
}
interface Creator {
  userName: string,
  userId: string,
}
interface CreatorComment {
  userName: string,
  userId: string,
  dateComment: string,
}
export interface Comment {
  id: string,
  creator: CreatorComment,
  text: string,
  edit: boolean,
}
export interface Post {
  id: string,
  title: string,
  text: string,
  datePost: string,
  edit: boolean,
  comments: Comment[]
  creator: Creator,
  like: Reaction[],
  dislike: Reaction[],
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
interface CommentDataPayload {
  id: string,
  creator: CreatorComment,
  text: string,
  idPost: string,
}
interface CommentData {
  type: typeof actionTypes.ADD_COMMENT_DATA,
  payload: CommentDataPayload
}

interface DeletePostAction {
  type: typeof actionTypes.DELETE_POST,
  payload: {
    idPost: string,
  }
}
interface UpdPostAction {
  type: typeof actionTypes.UPD_POST,
  payload: {
    title: string,
    text: string,
    idPost: string,
  }
}
interface DeleteCommentAction {
  type: typeof actionTypes.DELETE_COMMENT,
  payload: {
    commentId: string,
    idPost: string,
  }
}
interface UpdateCommentAction {
  type: typeof actionTypes.UPD_COMMENT,
  payload: {
    text: string,
    commentId: string,
    idPost: string,
  }
}
interface EditCommentAction {
  type: typeof actionTypes.EDIT_COMMENT,
  payload: {
    commentId: string,
    idPost: string,
  }
}
interface EditPostAction {
  type: typeof actionTypes.EDIT_POST,
  payload: {
    idPost: string,
  }
}
export type ContentActionTypes = PostData | Dislike | Like
  | CommentData | DeletePostAction | UpdPostAction | DeleteCommentAction
  | UpdateCommentAction | EditCommentAction | EditPostAction

