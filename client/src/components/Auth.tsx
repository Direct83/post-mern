import React from 'react'
import { Link } from 'react-router-dom'
import style from '../pages/pages.module.scss'

const Auth = () => {
  return (
    <>
      <div className={style.isAuthMessage}>Контент доступен только авторизованным пользователям</div>
      <div className={style.authPage}>
        <div className={style.authItem}>
          <Link to="/signin" className={style.authItem}>Login</Link>
        </div>
        <div className={style.authItem}>
          <Link to="/signup" className={style.authItem}>Registration</Link>
        </div>
      </div>
    </>
  )
}

export default Auth;