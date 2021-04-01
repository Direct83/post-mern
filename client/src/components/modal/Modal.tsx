import React, { useState, useEffect } from 'react'
import './modal.scss'

const Modal = ({ active, setActive, userInfo }: any) => {
  const [state, setState] = useState({
    role: '',
    time: '',
  })
  function handleChange(event: any) {
    setState((previousData) => ({
      ...previousData,
      role: event.target.value
    }));
  }
  const closeModal = () => {
    setActive(false)
  }
  const saveRole = async (event: any) => {
    event.preventDefault()
    await (await fetch('auth/change/role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...userInfo, roleChange: state.role })
    })).json()
  }
  const inputTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };
  const temporaryBan = async () => {
    await (await fetch('auth/change/bannedTime', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...userInfo, bannedTimeChange: new Date().getTime() + +state.time * 1000 })
    })).json()
    setState((previousData) => ({
      ...previousData,
      time: '',
    }));
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
      setState((previousAuthData) => ({
        ...previousAuthData,
        role: response.role
      }))
    })()
  }, [])
  return (
    <div className={
      active
        ? 'modal active'
        : 'modal'
    } >
      <div className='modal__content'>
        <img
          src={'img/cross.png'}
          style={{ width: '25px', height: '25px', float: 'right' }}
          onClick={closeModal}
        />
        <form
          onSubmit={(event) => saveRole(event)}
          onClick={e => e.stopPropagation()}
        >
          <label
            style={{ margin: '20px' }}
          >
            Смена роли для пользователя с именем {userInfo.userName}:
          <select
              value={state.role}
              onChange={handleChange}
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
              <option value="banned">banned</option>
            </select>
          </label>
          <input
            type="submit"
            value="Сохранить роль"
          />
        </form>
        <label style={{ margin: '20px' }}>
          Бан на время:
          <input
            type="number"
            name='time'
            placeholder='в секундах'
            onChange={inputTime}
          />
          <button
            onClick={temporaryBan}
            className='button-ban'
          >
            BAN!!
          </button>
        </label>
      </div>
    </div>
  )
}

export default Modal;
