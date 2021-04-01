import React, { useState, useEffect } from 'react'
import './modal.scss'

const Modal = ({ active, setActive, userInfo }: any) => {
  const [state, setState] = useState({
    role: '',
  })
  function handleChange(event: any) {
    setState({ role: event.target.value });
  }
  const closeModal = () => {
    setActive(false)
  }
  const saveRole = async (event: any) => {
    event.preventDefault()
    const response = await (await fetch('auth/change/role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...userInfo, roleChange: state.role })
    })).json()
    setActive(false)
  }
  useEffect(() => {
    (async () => {
      const response = await (await fetch('auth/get/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...userInfo })
      })).json();
      setState(response)
    })()
  }, [])
  return (
    <div className={active ? 'modal active' : 'modal'} >
      <div className='modal__content'>
        <img src={'img/cross.png'} style={{ width: '25px', height: '25px', float: 'right' }} onClick={closeModal}></img>
        <form onSubmit={(event) => saveRole(event)} onClick={e => e.stopPropagation()}>
          <label style={{ margin: '20px' }}>
            Смена роли для пользователя с именем {userInfo.userName}:
          <select value={state.role} onChange={handleChange}>
              <option value="user">user</option>
              <option value="admin">admin</option>
              <option value="banned">banned</option>
            </select>
          </label>
          <input type="submit" value="Сохранить роль" />
        </form>
      </div>
    </div>
  )
}

export default Modal;
