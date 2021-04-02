import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store'
import { deletePostAction, updatePostAction, editPostAction } from '../redux/content/actions'
import { checkAuth } from '../redux/auth/actions'
import { Redirect } from 'react-router-dom'
import style from './pages.module.scss'
import Modal from '../components/modal/Modal';
import Reaction from '../components/Reaction';

export default function HomePage() {
  const { isAuth, userId, role } = useSelector((state: RootState) => state.auth);
  const { posts } = useSelector((state: RootState) => state.content);
  const [modalActive, setModalActive] = useState(false)
  const [id, setId] = useState('')
  const [updPost, setUpdPost] = useState({
    text: '',
    title: '',
  })
  const [postCreator, setPostCreator] = useState({
    userName: '',
    userId: '',
  })
  const dispatch = useDispatch();
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
      {id ? <Redirect to={{
        pathname: '/discuss',
        state: { id }
      }} /> : null}
      {!isAuth
        ? <div style={{ textAlign: 'center' }}>Контент доступен только авторизованным пользователям</div>
        : (
          <>
            <div className={style.wrapper}>
              {posts.map(el => {
                return (
                  <div
                    key={el.id}
                    className={style.itemFront}
                  >
                    {el.edit
                      ? (
                        <>
                          <h1>
                            <input
                              type='text'
                              name='title'
                              defaultValue={el.title}
                              onChange={inputHundler}
                            />
                          </h1>
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
                    {role === 'admin'
                      ? <>
                        <div
                          onClick={() => onModal(el.creator)}
                        >
                          Автор: {el.creator.userName}
                        </div>
                      </>
                      : <div>Автор: {el.creator.userName} </div>
                    }
                    <div>Дата создания поста: {el.datePost}</div>
                    <Reaction
                      like={el.like}
                      dislike={el.dislike}
                      itemId={''}
                      postId={el.id}
                      from={'post'}
                    />
                    <div className={style.buttons}>
                      {role === 'user' || role === 'admin'
                        ? <button
                          onClick={() => redirect(el.id)}
                        >
                          Обсудить
                        </button>
                        : null}
                      {el.creator.userId === userId && role === 'user' || role === 'admin'
                        ? <>
                          {el.edit
                            ? <button
                              onClick={() => updatePost(el.id)}
                            >Сохранить</button>
                            : <button
                              onClick={() => onEdit(el.id)}
                            >Редактировать</button>
                          }
                          <button
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
