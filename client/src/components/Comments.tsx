import React, { useState } from 'react'
import {
  commentData, deleteCommentAction, updateCommentAction,
  editCommentAction
} from '../redux/content/actions'
import { useDispatch, useSelector } from 'react-redux'
import style from '../pages/pages.module.scss'
import { RootState } from '../redux/store'
import { Comment } from '../redux/actionTypes'
import Reaction from './Reaction'

interface Comments {
  postId: string,
  modal: Function
  comments: Comment[]
}
export default function Comments({ postId, modal, comments }: Comments) {
  const { userId, userName, role } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [updComment, setUpdComment] = useState({
    text: '',
  })
  const [comment, setComment] = useState({
    id: '',
    creator: {
      userName: '',
      userId: '',
      dateComment: ''
    },
    text: '',
    edit: false,
    like: [],
    dislike: [],
  })
  const inputHundler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setComment((previousCommentData) => ({
      ...previousCommentData,
      creator: {
        userName,
        userId,
        dateComment: new Date().toLocaleString(),
      },
      [name]: value,
    }));
  };
  const sendComment = () => {
    if (comment.text !== '') {
      dispatch(commentData(comment, postId))
      setComment({
        id: '',
        creator: {
          userName: '',
          userId: '',
          dateComment: ''
        },
        text: '',
        edit: false,
        like: [],
        dislike: [],
      })
    }
  }
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
                    ? <>
                      <cite
                        onClick={() => modal(comment.creator)}
                      >
                        Автор: {comment.creator.userName}, {comment.creator.dateComment}
                      </cite>
                    </>
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
      <div className={style.sendMessage}>
        {role === 'user' || role === 'admin'
          ? (
            <>
              <input
                type='text'
                name='text'
                onChange={inputHundler}
                value={comment.text}
              />
              <button
                type='button'
                onClick={sendComment}
              >
                Отправить сообщение
              </button>
            </>
          )
          : null}
      </div>
    </>
  )
}
