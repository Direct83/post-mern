import React, { useState, useEffect } from 'react'
import './modal.scss'

interface ModalObj {
  userName: string;
  userId: string;
}
interface ModalType {
  active: boolean,
  setActive: CallableFunction,
  userInfo: ModalObj
}
const Modal = ({ active, setActive, userInfo }: ModalType) => {
  const [state, setState] = useState({
    role: '',
    time: '',
  })
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setState((previousData) => ({
      ...previousData,
      role: event.target.value
    }));
  }
  const closeModal = () => {
    setActive(false)
  }
  const saveRole = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await fetch('auth/change/role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...userInfo, roleChange: state.role || 'user' })
    })
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
  return (
    <div className={
      active
        ? 'modal active'
        : 'modal'
    } >
      <div className='modal-content'>
        <img
          src={'img/cross.png'}
          onClick={closeModal}
        />
        <form
          onSubmit={(event) => saveRole(event)}
          onClick={e => e.stopPropagation()}
        >
          <label>
            <p>Смена роли для пользователя с именем {userInfo.userName}:
            <select
                value={state.role}
                onChange={handleChange}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
                <option value="banned">banned</option>
              </select>
            </p>
          </label>
          <button
            type="submit"
          >Сохранить роль</button>
        </form>
        <label>
          <p>Бан на время:
          <input
              type="number"
              name='time'
              placeholder='в секундах'
              onChange={inputTime}
            />
          </p>
          <button
            onClick={temporaryBan}
          >
            BAN!!
          </button>
        </label>
      </div>
    </div>
  )
}

export default Modal;
