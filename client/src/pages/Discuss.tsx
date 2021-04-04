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

export default function Discuss(props: { location: { state: { id: string; }; }; }) {
  const { posts } = useSelector((state: RootState) => state.content)
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const [modalActive, setModalActive] = useState(false)
  const [postCreator, setPostCreator] = useState({
    userName: '',
    userId: '',
  })
  const dispatch = useDispatch();
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
      {!isAuth
        ? <Auth />
        : <div className={style.wrapper}>
          {posts.filter(el => el.id === props.location.state.id).map(el => {
            return (
              <div key={el.id + 'a'} className={style.itemFront}>
                <h1>{el.title}</h1>
                <AutoTextArea text={el.text} />
                <div
                  className={style.creator}
                  onClick={() => onModal(el.creator)}
                >
                  Автор: {el.creator.userName}
                </div>
                <div>Дата создания поста: {el.datePost}</div>
                <Reaction
                  like={el.like}
                  dislike={el.dislike}
                  itemId={el.id}
                  postId={props.location.state.id}
                  from={'post'}
                />
                <Comments
                  postId={props.location.state.id}
                  modal={onModal}
                  comments={el.comments}
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
