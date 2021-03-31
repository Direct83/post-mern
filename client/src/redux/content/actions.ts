import { actionTypes, Post, Comment } from '../actionTypes';


export function postData({ id, title, text, creator, datePost, comments, like, dislike }: Post) {
  return {
    type: actionTypes.ADD_POST_DATA,
    payload: {
      id,
      title,
      text,
      creator,
      datePost,
      comments,
      like,
      dislike,
    }
  };
}

export function dislike(postId: string, userId: string) {
  return {
    type: actionTypes.DISLIKE_POST_DATA,
    payload: {
      postId,
      userId,
    }
  };
}

export function like(postId: string, userId: string) {
  return {
    type: actionTypes.LIKE_POST_DATA,
    payload: {
      postId,
      userId,
    }
  };
}

export function commentData({ id, creator, text }: Comment, idPost: string) {
  return {
    type: actionTypes.ADD_COMMENT_DATA,
    payload: {
      id,
      creator,
      text,
      idPost,
    }
  };
}
export function deletePostAction(idPost: string) {
  return {
    type: actionTypes.DELETE_POST,
    payload: {
      idPost,
    }
  };
}

export function updatePostAction(title: string, text: string, idPost: string) {
  return {
    type: actionTypes.UPD_POST,
    payload: {
      title,
      text,
      idPost,
    }
  };
}
