import React from 'react'
import { Link } from 'react-router-dom'
import style from '../pages/pages.module.scss'

export default function Auth() {
  return (
    <>
      <div className={style.authPage}>
        <div>
          <h1
            className={style.isAuthMessage}
          >Контент доступен только авторизованным пользователям
          </h1>
        </div>
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
