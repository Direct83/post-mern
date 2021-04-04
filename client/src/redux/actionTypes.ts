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
  EDIT_POST = 'EDIT_POST',
  DISLIKE_COMMENT_DATA = 'DISLIKE_COMMENT_DATA',
  LIKE_COMMENT_DATA = 'LIKE_COMMENT_DATA',
  AUTH_MESSAGE_RESPONSE = 'AUTH_MESSAGE_RESPONSE'
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
  bannedTime: string,
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
  message: string,
}
interface SignInUser {
  type: typeof actionTypes.LOGIN_USER,
  payload: {
    userId: string,
    userName: string,
    role: string,
    bannedTime: number,
  }
}
interface SendMessage {
  type: typeof actionTypes.AUTH_MESSAGE_RESPONSE,
  payload: {
    message: string,
  }
}
interface LogOutUser {
  type: typeof actionTypes.LOGOUT_USER,
}
export type AuthActionTypes = SignInUser | LogOutUser | SendMessage
//Post
interface Reaction {
  userId: string,
  status: boolean,
}
export interface Creator {
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
  like: Reaction[],
  dislike: Reaction[],
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
interface DislikeAction {
  type: typeof actionTypes.DISLIKE_POST_DATA,
  payload: reactionDL
}
interface LikeAction {
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
interface reactionCommentDL {
  commentId: string,
  postId: string,
  userId: string,
}
interface DislikeCommentAction {
  type: typeof actionTypes.DISLIKE_COMMENT_DATA,
  payload: reactionCommentDL
}
interface LikeCommentAction {
  type: typeof actionTypes.LIKE_COMMENT_DATA,
  payload: reactionCommentDL
}
export type ContentActionTypes = PostData | DislikeAction | LikeAction
  | CommentData | DeletePostAction | UpdPostAction | DeleteCommentAction
  | UpdateCommentAction | EditCommentAction | EditPostAction | DislikeCommentAction
  | LikeCommentAction

