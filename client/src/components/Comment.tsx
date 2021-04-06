import React, { useState } from 'react'
import {
  deleteCommentAction, updateCommentAction, editCommentAction
} from '../redux/content/actions'
import { useDispatch, useSelector } from 'react-redux'
import style from '../pages/pages.module.scss'
import { RootState } from '../redux/store'
import { CommentsType } from '../redux/actionTypes'
import Reaction from './Reaction'

export default function Comment({ postId, comments, modal }: CommentsType) {
  const { userId, role } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [updComment, setUpdComment] = useState({
    text: '',
  })
  const deleteComment = (messageId: string) => {
    dispatch(deleteCommentAction(messageId, postId))
  }
  const onEdit = (commentId: string) => {
    dispatch(editCommentAction(commentId, postId))
  }
  const textCommentUpd = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdComment((previousCommentData) => ({
      ...previousCommentData,
      [name]: value,
    }));
  };
  const updateComment = (commentId: string) => {
    dispatch(updateCommentAction(updComment.text, commentId, postId))
    setUpdComment({
      text: '',
    })
    dispatch(editCommentAction(commentId, postId))
  }
  return (
    <>
      <div className={style.chatPost}>
        {comments.map(comment => {
          return (
            <blockquote
              key={comment.id}
            >
              {comment.edit
                ? <>
                  <textarea
                    name='text'
                    rows={2}
                    onChange={textCommentUpd}
                    defaultValue={comment.text}
                  />
                  <cite>Автор: {comment.creator.userName}, {comment.creator.dateComment}</cite>
                  <img
                    className={style.imgUpdateDeleteSave}
                    src='img/save.png'
                    onClick={() => updateComment(comment.id)}
                  />
                </>
                : <>
                  <p key={comment.id}>{comment.text}</p>
                  {role === 'admin'
                    ? <cite className={style.adminAccess}
                      onClick={() => modal(comment.creator)}
                    >
                      Автор: {comment.creator.userName}, {comment.creator.dateComment}
                    </cite>
                    : <cite>Автор: {comment.creator.userName}, {comment.creator.dateComment}</cite>
                  }
                  <div>
                    <Reaction
                      like={comment.like}
                      dislike={comment.dislike}
                      itemId={comment.id}
                      postId={postId}
                      from={'postDiscussComment'}
                    />
                  </div>
                  {comment.creator.userId === userId && role === 'user' || role === 'admin'
                    ? (
                      <>
                        <img
                          className={style.imgUpdateDeleteSave}
                          src='img/pen.png'
                          onClick={() => onEdit(comment.id)}
                        />
                        <img
                          className={style.imgUpdateDeleteSave}
                          src='img/cross.png'
                          onClick={() => deleteComment(comment.id)}
                        />
                      </>
                    )
                    : null
                  }
                </>
              }
            </blockquote>
          )
        })}
      </div>
    </>
  )
}
