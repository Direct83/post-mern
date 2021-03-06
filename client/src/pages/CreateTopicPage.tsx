import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store'
import { postData } from '../redux/content/actions'
import { Redirect } from 'react-router-dom'
import style from './pages.module.scss'
import Auth from '../components/Auth';

export default function CreateTopic() {
  const { isAuth, userId, userName } = useSelector((state: RootState) => state.auth);
  const [redirect, setRedirect] = useState(false)
  const [post, setPost] = useState({
    id: '',
    title: '',
    text: '',
    datePost: '',
    creator: {
      userName: '',
      userId: '',
    },
    edit: false,
    comments: [],
    like: [],
    dislike: [],
  })
  const dispatch = useDispatch();
  const inputHundler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPost((previousPostData) => ({
      ...previousPostData,
      [name]: value,
      datePost: new Date().toLocaleString(),
      creator: {
        userName,
        userId,
      },
    }));
  };
  const createTop = () => {
    if (post.text !== '' && post.title !== '') {
      dispatch(postData(post))
      setRedirect(true)
    }
  }
  return (
    <>
      {redirect && <Redirect to={'/'} />}
      {!isAuth
        ? <Auth />
        : (
          <>
            <form
              className={style.createItem}
            >
              <div>Title</div>
              <input
                type='text'
                name='title'
                onChange={inputHundler}
              />
              <div>Text</div>
              <textarea
                onChange={inputHundler}
                name='text'
                cols={80}
                rows={10}
              />
              <button
                type='button'
                onClick={createTop}
              >
                сохранить
              </button>
            </form>
          </>
        )
      }
    </>
  );
}
