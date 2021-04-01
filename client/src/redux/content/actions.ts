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

export function dislikeAction(postId: string, userId: string) {
  return {
    type: actionTypes.DISLIKE_POST_DATA,
    payload: {
      postId,
      userId,
    }
  };
}

export function likeAction(postId: string, userId: string) {
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

export function deleteCommentAction(commentId: string, idPost: string) {
  return {
    type: actionTypes.DELETE_COMMENT,
    payload: {
      commentId,
      idPost,
    }
  };
}

export function updateCommentAction(text: string, commentId: string, idPost: string) {
  return {
    type: actionTypes.UPD_COMMENT,
    payload: {
      text,
      commentId,
      idPost,
    }
  };
}

export function editCommentAction(commentId: string, idPost: string) {
  return {
    type: actionTypes.EDIT_COMMENT,
    payload: {
      commentId,
      idPost,
    }
  };
}

export function editPostAction(idPost: string) {
  return {
    type: actionTypes.EDIT_POST,
    payload: {
      idPost,
    }
  };
}

export function dislikeCommentAction(commentId: string, userId: string, postId: string) {
  return {
    type: actionTypes.DISLIKE_COMMENT_DATA,
    payload: {
      commentId,
      postId,
      userId,
    }
  };
}

export function likeCommentAction(commentId: string, userId: string, postId: string) {
  return {
    type: actionTypes.LIKE_COMMENT_DATA,
    payload: {
      commentId,
      postId,
      userId,
    }
  };
}
