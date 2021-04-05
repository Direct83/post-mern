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
export type AuthDataType = {
  name: string,
  password: string,
}
export type ResponseAuthType = {
  userId: string,
  userName: string,
  role: string,
  message: string,
  bannedTime: string,
}
export type AuthUserPayloadType = {
  type: actionTypes.AUTH_USER
  payload: {
    authData: AuthDataType;
    path: string;
  }
}
export type AuthReducerISType = {
  userId: string,
  userName: string,
  role: string,
  isAuth: boolean,
  message: string,
}
type SignInUserType = {
  type: typeof actionTypes.LOGIN_USER,
  payload: {
    userId: string,
    userName: string,
    role: string,
    bannedTime: number,
  }
}
type SendMessageType = {
  type: typeof actionTypes.AUTH_MESSAGE_RESPONSE,
  payload: {
    message: string,
  }
}
type LogOutUserType = {
  type: typeof actionTypes.LOGOUT_USER,
}
export type AuthActionTypes = SignInUserType | LogOutUserType | SendMessageType
//Post
type ReactionType = {
  userId: string,
  status: boolean,
}
export type CreatorType = {
  userName: string,
  userId: string,
}
type CreatorCommentType = {
  userName: string,
  userId: string,
  dateComment: string,
}
export type CommentType = {
  id: string,
  creator: CreatorCommentType,
  text: string,
  edit: boolean,
  like: ReactionType[],
  dislike: ReactionType[],
}
export type PostType = {
  id: string,
  title: string,
  text: string,
  datePost: string,
  edit: boolean,
  comments: CommentType[]
  creator: CreatorType,
  like: ReactionType[],
  dislike: ReactionType[],
}
export type ContentReducerISType = {
  posts: PostType[]
}
type PostDataType = {
  type: typeof actionTypes.ADD_POST_DATA,
  payload: PostType
}
type reactionDLType = {
  postId: string,
  userId: string,
}
type DislikeActionType = {
  type: typeof actionTypes.DISLIKE_POST_DATA,
  payload: reactionDLType
}
type LikeActionType = {
  type: typeof actionTypes.LIKE_POST_DATA,
  payload: reactionDLType
}
type CommentDataPayloadType = {
  id: string,
  creator: CreatorCommentType,
  text: string,
  idPost: string,
}
type CommentDataType = {
  type: typeof actionTypes.ADD_COMMENT_DATA,
  payload: CommentDataPayloadType
}

type DeletePostActionType = {
  type: typeof actionTypes.DELETE_POST,
  payload: {
    idPost: string,
  }
}
type UpdPostActionType = {
  type: typeof actionTypes.UPD_POST,
  payload: {
    title: string,
    text: string,
    idPost: string,
  }
}
type DeleteCommentActionType = {
  type: typeof actionTypes.DELETE_COMMENT,
  payload: {
    commentId: string,
    idPost: string,
  }
}
type UpdateCommentActionType = {
  type: typeof actionTypes.UPD_COMMENT,
  payload: {
    text: string,
    commentId: string,
    idPost: string,
  }
}
type EditCommentActionType = {
  type: typeof actionTypes.EDIT_COMMENT,
  payload: {
    commentId: string,
    idPost: string,
  }
}

type EditPostActionType = {
  type: typeof actionTypes.EDIT_POST,
  payload: {
    idPost: string,
  }
}
type reactionCommentDLType = {
  commentId: string,
  postId: string,
  userId: string,
}
type DislikeCommentActionType = {
  type: typeof actionTypes.DISLIKE_COMMENT_DATA,
  payload: reactionCommentDLType
}
type LikeCommentActionType = {
  type: typeof actionTypes.LIKE_COMMENT_DATA,
  payload: reactionCommentDLType
}
export type CommentsType = {
  postId: string,
  comments: CommentType[],
  modal: Function,
}
export type ContentActionTypes = PostDataType | DislikeActionType | LikeActionType
  | CommentDataType | DeletePostActionType | UpdPostActionType | DeleteCommentActionType
  | UpdateCommentActionType | EditCommentActionType | EditPostActionType | DislikeCommentActionType
  | LikeCommentActionType

