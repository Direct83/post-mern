import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'
import { dislike, like, commentData, deleteCommentAction, updateCommentAction } from '../redux/content/actions'
import style from './pages.module.scss'
import { url } from 'node:inspector';

export default function Discuss(props: any) {
  const { posts } = useSelector((state: RootState) => state.content)
  const { isAuth, userId, userName } = useSelector((state: RootState) => state.auth);
  const [edit, setEdit] = useState(false)
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
    text: ''
  })
  const dispatch = useDispatch();
  const reactionLike = (postId: string) => {
    dispatch(like(postId, userId))
  }
  const reactionDis = (postId: string) => {
    dispatch(dislike(postId, userId))
  }
  const inputHundler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setComment((previousPostData) => ({
      ...previousPostData,
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
        text: ''
      })
    }
  }
  const deleteComment = (messageId: string) => {
    dispatch(deleteCommentAction(messageId, props.location.state.id))
  }
  const onEdit = () => {
    setEdit(true)
  }
  const textCommentUpd = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdComment((previousPostData) => ({
      ...previousPostData,
      [name]: value,
    }));
  };
  const updateComment = (commentId: string) => {
    dispatch(updateCommentAction(updComment.text, commentId, props.location.state.id))
    setEdit(false)
  }
  return (
    <>
      {posts.filter(el => el.id === props.location.state.id).map(el => {
        return (
          <div key={el.id + 'a'} className={style.itemFront}>
            <h1>{el.title}</h1>
            <h2>{el.text}</h2>
            <div>Автор: {el.creator.userName} </div>
            <div>Дата создания поста: {el.datePost}</div>
            <div className='like-dislike'>
              {el.like.filter(el => {
                return el.userId === userId
              })[0]?.status
                ? <img
                  src='img/like-red.png'
                  style={{ width: '25px', height: '25px' }}
                  onClick={() => reactionLike(el.id)}
                />
                : <img
                  src='img/like-wh.png'
                  style={{ width: '25px', height: '25px' }}
                  onClick={() => reactionLike(el.id)}
                />
              }
              <span style={{ margin: '5px' }}>: {el.like.filter(el => el.status).filter(Boolean).length}шт.</span>
              {el.dislike.filter(el => {
                return el.userId === userId
              })[0]?.status
                ? <img
                  src='img/dis-bl.png'
                  style={{ width: '25px', height: '25px', }}
                  onClick={() => reactionDis(el.id)}
                />
                : <img
                  src='img/dis-wh.png'
                  style={{ width: '25px', height: '25px' }}
                  onClick={() => reactionDis(el.id)}
                />
              }
              <span style={{ margin: '5px' }}>: {el.dislike.filter(el => el.status).filter(Boolean).length}шт.</span>
            </div>
            {el.comments.map(el => {
              return (
                <>
                  <blockquote className={style.discuss} key={el.id}>
                    {edit
                      ? <>
                        <textarea style={{ width: '500px' }} name='text' rows={2} onChange={textCommentUpd}>{el.text}</textarea>
                        <cite>Автор: {el.creator.userName}, {el.creator.dateComment}</cite>
                        <img className={style.imgUpd} src='img/save.png' onClick={() => updateComment(el.id)} />
                      </>
                      : <>
                        <p key={el.id}>{el.text}</p>
                        <cite>Автор: {el.creator.userName}, {el.creator.dateComment}</cite>
                        <img className={style.imgUpd} src='img/pen.png' onClick={onEdit} />
                        <img className={style.imgDelete} src='img/cross.png' onClick={() => deleteComment(el.id)} />
                      </>
                    }
                  </blockquote>
                </>
              )
            })}
          </div>
        )
      })
      }
      <input type='text' name='text' className={style.inputMessage} onChange={inputHundler} value={comment.text} />
      <button type='button' className='btn-blu comment' onClick={sendComment}>Отправить сообщение</button>
    </>
  );
}
