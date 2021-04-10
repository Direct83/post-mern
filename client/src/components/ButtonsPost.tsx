import React from 'react'
import { CreatorType } from '../redux/actionTypes'
import style from '../pages/pages.module.scss'
import { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { deletePostAction, updatePostAction, editPostAction } from '../redux/content/actions'

export default function ButtonsPost({ creator, postEdit, postId, updPost, setUpdPost, setId }
  : {
    creator: CreatorType,
    postId: string
    updPost: {
      text: string,
      title: string,
    }
    postEdit: boolean,
    setUpdPost: Function,
    setId: Function,
  }) {
  const { userId, role } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch()

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
  return (
    <div className={style.buttons}>
      {(role === 'user' || role === 'admin')
        && <button
          onClick={() => redirect(postId)}
        >
          Обсудить
          </button>
      }
      {(creator.userId === userId && role === 'user' || role === 'admin')
        && <>
          {postEdit
            ? <button
              onClick={() => updatePost(postId)}
            >
              Сохранить
            </button>
            : <button
              onClick={() => onEdit(postId)}
            >
              Редактировать
            </button>
          }
          <button
            onClick={() => deletePost(postId)}
          >
            Удалить
          </button>
        </>
      }
    </div>
  )
}
