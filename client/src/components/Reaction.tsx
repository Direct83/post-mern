import React from 'react'
import { likeCommentAction, dislikeCommentAction, likeAction, dislikeAction } from '../redux/content/actions'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'

interface ArrReaction {
  userId: string,
  status: boolean
}
interface ReactionProps {
  like: ArrReaction[],
  dislike: ArrReaction[],
  itemId: string,
  postId: string,
  from: string,
}
const Reaction = ({ like, dislike, itemId, postId, from }: ReactionProps) => {
  const { userId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const reactionLike = (commentId: string) => {
    from === 'post'
      ? dispatch(likeAction(postId, userId))
      : dispatch(likeCommentAction(commentId, userId, postId))
  }
  const reactionDis = (commentId: string) => {
    from === 'post'
      ? dispatch(dislikeAction(postId, userId))
      : dispatch(dislikeCommentAction(commentId, userId, postId))
  }
  return (
    <div className='like-dislike'>
      {like.filter(like => {
        return like.userId === userId
      })[0]?.status
        ? <img
          src='img/like-red.png'
          onClick={() => reactionLike(itemId)}
        />
        : <img
          src='img/like-wh.png'
          onClick={() => reactionLike(itemId)}
        />
      }
      <span>
        : {like.filter(like => like.status).filter(Boolean).length}шт.
        </span>
      {dislike.filter(dislike => {
        return dislike.userId === userId
      })[0]?.status
        ? <img
          src='img/dis-bl.png'
          onClick={() => reactionDis(itemId)}
        />
        : <img
          src='img/dis-wh.png'
          onClick={() => reactionDis(itemId)}
        />
      }
      <span>
        : {dislike.filter(dislike => dislike.status).filter(Boolean).length}шт.
        </span>
    </div>
  )
}

export default Reaction;
