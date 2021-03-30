import { actionTypes, Post } from '../actionTypes';


export function PostData({ title, text, creator, like, dislike }: Post) {
  return {
    type: actionTypes.ADD_POST_DATA,
    payload: {
      title,
      text,
      creator,
      like,
      dislike,
    }
  };
}

export function Dislike(postId: string, userId: string) {
  return {
    type: actionTypes.DISLIKE_POST_DATA,
    payload: {
      postId,
      userId,
    }
  };
}

export function Like(postId: string, userId: string) {
  return {
    type: actionTypes.LIKE_POST_DATA,
    payload: {
      postId,
      userId,
    }
  };
}


