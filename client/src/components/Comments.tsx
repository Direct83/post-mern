import React, { useState } from 'react'
import { commentData } from '../redux/content/actions'
import { useDispatch, useSelector } from 'react-redux'
import style from '../pages/pages.module.scss'
import { RootState } from '../redux/store'
import { CommentsType } from '../redux/actionTypes'
import Comment from './Comment'

export default function Comments({ postId, modal, comments }: CommentsType) {
  const { userId, userName, role } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
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
  return (
    <>
      <Comment
        postId={postId}
        comments={comments}
        modal={modal}
      />
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
