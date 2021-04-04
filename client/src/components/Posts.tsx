import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Reaction from './Reaction'
import style from '../pages/pages.module.scss'
import AutoTextArea from '../components/AutoTextArea';
import { Redirect } from 'react-router-dom'
import ButtonsPost from './ButtonsPost'

export default function Posts({ modal }: { modal: Function }) {
  const { role } = useSelector((state: RootState) => state.auth);
  const { posts } = useSelector((state: RootState) => state.content);
  const [id, setId] = useState('')
  const [updPost, setUpdPost] = useState({
    text: '',
    title: '',
  })
  const inputPostUpdate = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      <div className={style.wrapper}>
        {posts.map(post => {
          return (
            <div
              key={post.id}
              className={style.itemFront}
            >
              {post.edit
                ? (
                  <>
                    <h1>
                      <input
                        type='text'
                        name='title'
                        defaultValue={post.title}
                        onChange={inputPostUpdate}
                      />
                    </h1>
                    <textarea
                      className={style.textareaEdit}
                      name='text' rows={10}
                      onChange={inputPostUpdate}
                      defaultValue={post.text} />
                  </>)
                : (
                  <>
                    <h1>{post.title}</h1>
                    <AutoTextArea text={post.text} />
                  </>
                )
              }
              {role === 'admin'
                ? <>
                  <div
                    className={style.creator}
                    onClick={() => modal(post.creator)}
                  >
                    Автор: {post.creator.userName}
                  </div>
                </>
                : <div>Автор: {post.creator.userName}</div>
              }
              <div>Дата создания поста: {post.datePost}</div>
              <Reaction
                like={post.like}
                dislike={post.dislike}
                itemId={''}
                postId={post.id}
                from={'post'}
              />
              <ButtonsPost
                postId={post.id}
                creator={post.creator}
                postEdit={post.edit}
                updPost={updPost}
                setUpdPost={setUpdPost}
                setId={setId}
              />
            </div>
          )
        }
        )}
      </div>
    </>
  )
}
