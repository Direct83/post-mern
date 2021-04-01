import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store'
import { dislike, like, deletePostAction, updatePostAction, editPostAction } from '../redux/content/actions'
import { Redirect } from 'react-router-dom'
import style from './pages.module.scss'

export default function HomePage() {
  const { isAuth, userId, role } = useSelector((state: RootState) => state.auth);
  const { posts } = useSelector((state: RootState) => state.content);
  const [id, setId] = useState('')
  const [updPost, setUpdPost] = useState({
    text: '',
    title: '',
  })
  const dispatch = useDispatch();
  const reactionLike = (postId: string) => {
    dispatch(like(postId, userId))
  }
  const reactionDis = (postId: string) => {
    dispatch(dislike(postId, userId))
  }
  const redirect = (id: string) => {
    setId(id)
  }
  const deletePost = (postId: string) => {
    dispatch(deletePostAction(postId))
  }
  const onEdit = (postId: string) => {
    dispatch(editPostAction(postId))
  }
  const updatePost = (postId: string) => {
    dispatch(updatePostAction(updPost.title, updPost.text, postId))
    setUpdPost({
      text: '',
      title: '',
    })
    dispatch(editPostAction(postId))
  }
  const inputHundler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdPost((previousPostData) => ({
      ...previousPostData,
      [name]: value,
    }));
  };
  return (
    <>
      {id ? <Redirect to={{
        pathname: '/discuss',
        state: { id }
      }} /> : null}
      {!isAuth
        ? <div>Контент доступен только авторизованным пользователям</div>
        : (
          <>
            <div className={style.wrapper}>
              {posts.map(el => {

                return (
                  <div key={el.id} className={style.itemFront}>
                    {el.edit
                      ? (
                        <>
                          <h1><input type='text' name='title' defaultValue={el.title} onChange={inputHundler} /></h1>
                          <textarea
                            style={{ width: '900px' }}
                            name='text' rows={10}
                            onChange={inputHundler}
                            defaultValue={el.text} />
                        </>)
                      : (
                        <>
                          <h1>{el.title}</h1>
                          <h2>{el.text}</h2>
                        </>
                      )
                    }
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
                    <div className={style.buttons}>
                      {role === 'user' || role === 'admin' ? <button
                        onClick={() => redirect(el.id)}
                        className='btn-blu'
                      >Обсудить</button> : null}
                      {el.creator.userId === userId || role === 'admin'
                        ? <>
                          {el.edit
                            ?
                            <button
                              className='btn-blu'
                              onClick={() => updatePost(el.id)}
                            >Сохранить</button>

                            :
                            <button
                              className='btn-blu'
                              onClick={() => onEdit(el.id)}
                            >Редактировать</button>
                          }
                          <button
                            className='btn-blu'
                            onClick={() => deletePost(el.id)}
                          >Удалить</button>
                        </>
                        : null
                      }
                    </div>
                  </div>
                )
              }
              )}
            </div>
          </>
        )
      }
    </>
  );
}
