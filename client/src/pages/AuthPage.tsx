import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'
import style from './pages.module.scss'

export default function AuthPage() {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  return (
    <>
      {isAuth && <Redirect to="/" />}
      { !isAuth && (
        <div className={style.authPage}>
          <div className={style.authItem}>
            <Link to="/signin" className={style.authItem}>Login</Link>
          </div>
          <div className={style.authItem}>
            <Link to="/signup" className={style.authItem}>Registration</Link>
          </div>
        </div>
      )}
    </>
  );
}
