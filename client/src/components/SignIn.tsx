import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { authFetchThunk, sendMessage } from '../redux/auth/actions';
import { RootState } from '../redux/store'
import style from '../pages/pages.module.scss'

export default function SignIn() {
  const { isAuth, message } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState({
    name: '',
    password: '',
  });
  const inputHundler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuthData((previousAuthData) => ({
      ...previousAuthData,
      [name]: value,
    }));
  };
  const loginHandler = () => {
    const path = 'signin';
    dispatch(authFetchThunk(authData, path))
  };
  const messageNull = () => {
    dispatch(sendMessage(''))
  }
  return (
    <>
      {isAuth && <Redirect to="/" />}
      { !isAuth
        && (
          <div className="login">
            {message
              ? message === "Пароль неверный"
                ? <h3>{message}</h3>
                : (
                  <>
                    <h3>{message}</h3>
                    <Link to="/signup" onClick={messageNull} className={style.authSignIn}>Registration</Link>
                  </>
                )
              : null
            }
            <form className='login-form'>
              <div>Login</div>
              <input
                type="text"
                onChange={inputHundler}
                name="name"
              />
              <div>Password</div>
              <input
                type="password"
                onChange={inputHundler}
                name="password"
              />
              <button
                type="button"
                onClick={loginHandler}
              >
                Submit
              </button>
            </form>
          </div>
        )
      }
    </>
  );
};
