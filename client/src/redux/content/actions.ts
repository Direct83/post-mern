import { actionTypes, Post } from '../actionTypes';


export function postData({ id, title, text, creator, like, dislike }: Post) {
  return {
    type: actionTypes.ADD_POST_DATA,
    payload: {
      id,
      title,
      text,
      creator,
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

