import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'
import { checkAuth } from '../redux/auth/actions'
import style from './pages.module.scss'
import Modal from '../components/modal/Modal';
import Reaction from '../components/Reaction'
import AutoTextArea from '../components/AutoTextArea';
import Auth from '../components/Auth';
import Comments from '../components/Comments';
import { RouteComponentProps } from 'react-router-dom'

export default function DiscussPage(props: RouteComponentProps<{}, {}, { id: string }>) {
  const { posts } = useSelector((state: RootState) => state.content)
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const [modalActive, setModalActive] = useState(false)
  const [postCreator, setPostCreator] = useState({
    userName: '',
    userId: '',
  })
  const dispatch = useDispatch();

  const onModal = ({ userName, userId }: {
    userName: string,
    userId: string,
  }) => {
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
      {!isAuth
        ? <Auth />
        : <div className={style.wrapper}>
          {posts.filter(post => post.id === props.location.state.id).map(post => {
            return (
              <div key={post.id} className={style.itemFront}>
                <h1>{post.title}</h1>
                <AutoTextArea text={post.text} />
                <div
                  className={style.creator}
                  onClick={() => onModal(post.creator)}
                >
                  Автор: {post.creator.userName}
                </div>
                <div>Дата создания поста: {post.datePost}</div>
                <Reaction
                  like={post.like}
                  dislike={post.dislike}
                  itemId={post.id}
                  postId={props.location.state.id}
                  from={'post'}
                />
                <Comments
                  postId={props.location.state.id}
                  modal={onModal}
                  comments={post.comments}
                />
              </div>
            )
          })
          }
        </div>
      }
    </>
  );
}
