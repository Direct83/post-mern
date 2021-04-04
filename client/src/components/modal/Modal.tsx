import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { bannedTimeFetchThunk, roleFetchThunk } from '../../redux/auth/actions'
import './modal.scss'

export default function Modal({ active, setActive, userInfo }: {
  active: boolean,
  setActive: CallableFunction,
  userInfo: {
    userName: string;
    userId: string;
  }
}) {
  const dispatch = useDispatch()
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
    dispatch(roleFetchThunk(
      userInfo.userId,
      state.role || 'user',
    ))
  }
  const inputTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };
  const temporaryBan = async () => {
    dispatch(bannedTimeFetchThunk(
      userInfo.userId,
      String(new Date().getTime() + +state.time * 1000)
    ))
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
