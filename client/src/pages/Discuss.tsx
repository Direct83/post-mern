import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'
import {
  commentData, deleteCommentAction, updateCommentAction,
  editCommentAction
} from '../redux/content/actions'
import { checkAuth } from '../redux/auth/actions'
import style from './pages.module.scss'
import Modal from '../components/modal/Modal';
import Reaction from '../components/Reaction'

export default function Discuss(props: { location: { state: { id: string; }; }; }) {
  const { posts } = useSelector((state: RootState) => state.content)
  const { userId, userName, role } = useSelector((state: RootState) => state.auth);
  const [modalActive, setModalActive] = useState(false)
  const [updComment, setUpdComment] = useState({
    text: '',
  })
  const [postCreator, setPostCreator] = useState({
    userName: '',
    userId: '',
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
  const dispatch = useDispatch();
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
      dispatch(commentData(comment, props.location.state.id))
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
    dispatch(deleteCommentAction(messageId, props.location.state.id))
  }
  const onEdit = (commentId: string) => {
    dispatch(editCommentAction(commentId, props.location.state.id))
  }
  const textCommentUpd = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdComment((previousCommentData) => ({
      ...previousCommentData,
      [name]: value,
    }));
  };
  const updateComment = (commentId: string) => {
    dispatch(updateCommentAction(updComment.text, commentId, props.location.state.id))
    setUpdComment({
      text: '',
    })
    dispatch(editCommentAction(commentId, props.location.state.id))
  }
  interface clickPostCreatorType {
    userName: string,
    userId: string,
  }
  const onModal = ({ userName, userId }: clickPostCreatorType) => {
    setPostCreator({
      userName,
      userId
    })
    setModalActive(true)
  }
  useEffect(() => {
    dispatch(checkAuth());
  }, [posts]);
  return (
    <>
      {modalActive
        ? <Modal
          active={modalActive}
          setActive={setModalActive}
          userInfo={postCreator}
        />
        : null
      }
      <div className={style.wrapper}>
        {posts.filter(el => el.id === props.location.state.id).map(el => {
          return (
            <div key={el.id + 'a'} className={style.itemFront}>
              <h1>{el.title}</h1>
              <p>{el.text}</p>
              <div>Автор: {el.creator.userName} </div>
              <div>Дата создания поста: {el.datePost}</div>
              <Reaction
                like={el.like}
                dislike={el.dislike}
                itemId={el.id}
                postId={props.location.state.id}
                from={'post'}
              />
              <div className={style.chatPost}>
                {el.comments.map(el => {
                  return (
                    <blockquote
                      className={style.discuss}
                      key={el.id}
                    >
                      {el.edit
                        ? <>
                          <textarea
                            style={{ width: '500px' }}
                            name='text'
                            rows={2}
                            onChange={textCommentUpd}
                            defaultValue={el.text}
                          />
                          <cite>Автор: {el.creator.userName}, {el.creator.dateComment}</cite>
                          <img
                            className={style.imgUpd}
                            src='img/save.png'
                            onClick={() => updateComment(el.id)}
                          />
                        </>
                        : <>
                          <p key={el.id}>{el.text}</p>
                          {role === 'admin'
                            ? <>
                              <cite
                                onClick={() => onModal(el.creator)}
                              >
                                Автор: {el.creator.userName}, {el.creator.dateComment}
                              </cite>
                            </>
                            : <cite>Автор: {el.creator.userName}, {el.creator.dateComment}</cite>
                          }
                          <div style={{ float: 'right' }}>
                            <Reaction
                              like={el.like}
                              dislike={el.dislike}
                              itemId={el.id}
                              postId={props.location.state.id}
                              from={'postDiscussComment'}
                            />
                          </div>

                          {el.creator.userId === userId && role === 'user' || role === 'admin'
                            ? (
                              <>
                                <img
                                  className={style.imgUpd}
                                  src='img/pen.png'
                                  onClick={() => onEdit(el.id)}
                                />
                                <img
                                  className={style.imgDelete}
                                  src='img/cross.png'
                                  onClick={() => deleteComment(el.id)}
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
            </div>
          )
        })
        }
      </div>
      <div className={style.sendMessage}>
        {role === 'user' || role === 'admin'
          ? (
            <>
              <input
                type='text'
                name='text'
                className={style.inputMessage}
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
  );
}
