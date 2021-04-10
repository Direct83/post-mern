import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store'
import { checkAuth } from '../redux/auth/actions'
import Modal from '../components/modal/Modal';
import Auth from '../components/Auth';
import Posts from '../components/Posts';
import { useToggle } from '../hooks/useToggle'
export default function HomePage() {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const { posts } = useSelector((state: RootState) => state.content)
  const [modalStatus, toggleModal] = useToggle(false)
  const [postCreator, setPostCreator] = useState({
    userName: '',
    userId: '',
  })
  const dispatch = useDispatch()
  interface clickPostCreatorType {
    userName: string,
    userId: string,
  }
  const onModal = ({ userName, userId }: clickPostCreatorType) => {
    setPostCreator({
      userName,
      userId
    })
    toggleModal()
  }
  useEffect(() => {
    dispatch(checkAuth());
  }, [posts]);
  return (
    <>
      {modalStatus
        ? <Modal
          active={modalStatus}
          setActive={toggleModal}
          userInfo={postCreator}
        />
        : null
      }
      {!isAuth
        ? <Auth />
        : <Posts
          modal={onModal}
        />
      }
    </>
  );
}
