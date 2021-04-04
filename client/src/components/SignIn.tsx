import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authFetchThunk } from '../redux/auth/actions';
import { RootState } from '../redux/store'

const SignIn = () => {
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
  const loginHandler = async () => {
    const path = 'signin';
    dispatch(authFetchThunk(authData, path))
  };
  return (
    <>
      {isAuth && <Redirect to="/" />}
      { !isAuth
        && (
          <div className="login">
            {message
              ? <h3>{message}</h3>
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

export default SignIn;
