import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authFetchThunk } from '../redux/auth/actions';
import { RootState } from '../redux/store'

export default function SignUp() {
  const { isAuth, message } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const inputHundler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuthData((previousAuthData) => ({
      ...previousAuthData,
      [name]: value,
    }));
  };
  const signUpHandler = async () => {
    const path = 'signup';
    dispatch(authFetchThunk(authData, path));
  };

  return (
    <>
      {isAuth && <Redirect to="/" />}
      { !isAuth && (
        <div className="registration">
          {message
            ? <h3>{message}</h3>
            : null
          }
          <form className='registration-form'>
            <div>LoginName</div>
            <input
              type="text"
              onChange={inputHundler}
              name="name"
            />
            <div>Email</div>
            <input
              type="email"
              onChange={inputHundler}
              name="email"
            />
            <div>Password</div>
            <input
              type="password"
              onChange={inputHundler}
              name="password"
            />
            <button
              type="button"
              onClick={signUpHandler}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}
