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
      {like.filter(el => {
        return el.userId === userId
      })[0]?.status
        ? <img
          src='img/like-red.png'
          style={{ width: '25px', height: '25px' }}
          onClick={() => reactionLike(itemId)}
        />
        : <img
          src='img/like-wh.png'
          style={{ width: '25px', height: '25px' }}
          onClick={() => reactionLike(itemId)}
        />
      }
      <span
        style={{ margin: '5px' }}
      >
        : {like.filter(el => el.status).filter(Boolean).length}шт.
        </span>
      {dislike.filter(el => {
        return el.userId === userId
      })[0]?.status
        ? <img
          src='img/dis-bl.png'
          style={{ width: '25px', height: '25px', }}
          onClick={() => reactionDis(itemId)}
        />
        : <img
          src='img/dis-wh.png'
          style={{ width: '25px', height: '25px' }}
          onClick={() => reactionDis(itemId)}
        />
      }
      <span
        style={{ margin: '5px' }}
      >
        : {dislike.filter(el => el.status).filter(Boolean).length}шт.
        </span>
    </div>
  )
}

export default Reaction;
