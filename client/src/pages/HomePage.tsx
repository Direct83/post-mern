import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store'
import { dislike, like } from '../redux/content/actions'
import { Redirect } from 'react-router-dom'
import style from './pages.module.scss'

export default function HomePage() {
  const { isAuth, userId } = useSelector((state: RootState) => state.auth);
  const { posts } = useSelector((state: RootState) => state.content);
  const [id, setId] = useState()
  const dispatch = useDispatch();
  const reactionLike = (e: any, postId: string) => {
    dispatch(like(postId, userId))
  }
  const reactionDis = (postId: string) => {
    dispatch(dislike(postId, userId))
  }
  const redirect = (id: any) => {
    setId(id)
  }

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
                          onClick={(e) => reactionLike(e, el.id)}
                        />
                        : <img
                          src='img/like-wh.png'
                          style={{ width: '25px', height: '25px' }}
                          onClick={(e) => reactionLike(e, el.id)}
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
                    <button
                      onClick={() => redirect(el.id)}
                      className='btn-blu'
                    >Обсудить</button>
                  </div>
                )
              }
              )}
            </div>
          </>
        )}
    </>
  );
}
