import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authFetchThunk } from '../redux/auth/actions';
import { RootState } from '../redux/store'
import './auth.scss'
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
    await dispatch(authFetchThunk(authData, path))
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
            <form>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputName1"
                  className="form-label"
                >
                  name
                  <input
                    type="text"
                    onChange={inputHundler}
                    name="name"
                    className="form-control"
                    id="exampleInputName1"
                  />
                </label>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label"
                >
                  password
                  <input
                    type="password"
                    onChange={inputHundler}
                    name="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </label>
              </div>
              <button
                type="button"
                className="btn-blu"
                onClick={loginHandler}
                style={{ backgroundColor: '#33cfd1' }}
              >Submit</button>
            </form>
          </div>
        )}
    </>
  );
};

export default SignIn;
