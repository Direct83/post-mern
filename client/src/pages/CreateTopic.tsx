import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store'
import { postData } from '../redux/content/actions'

export default function CreateTopic() {
  const { isAuth, userId } = useSelector((state: RootState) => state.auth);
  const [post, setPost] = useState({
    id: '',
    title: '',
    text: '',
    creator: '',
    like: [],
    dislike: [],
  })
  const dispatch = useDispatch();
  const inputHundler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPost((previousPostData) => ({
      ...previousPostData,
      [name]: value,
      creator: userId,
    }));
  };
  const createTop = () => {
    dispatch(postData(post))
  }

  return (
    <>
      <form className="text-center">
        <div className="form-group mx-sm-3 mb-2">
          <label htmlFor="title">Title</label>
          <input type='text' name='title' className="form-control" onChange={inputHundler} />
        </div>
        <div className="form-group mx-sm-3 mb-2">
          <label htmlFor="text">Text</label>
          <textarea className="form-control" onChange={inputHundler} name='text' cols={10} rows={4} />
        </div>
        <button type='button' className="btn btn-primary" onClick={createTop}>сохранить</button>
      </form>
    </>
  );
}
