import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../redux/auth/actions';
import { RootState } from '../redux/store'

export default function Navbar() {
  const { isAuth, role } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const logout = async () => {
    await fetch('auth/signout');
    dispatch(logOutUser());
  };

  return (
    <>
      <div className="dropdown">
        <button className='dropbtn'>Menu</button>
        <nav className="sidenav">
          <Link className="navWords" to="/">Home</Link>
          {role === 'user' || role === 'admin' ? <Link className="navWords" to="/create-topic">CreateTopic</Link> : null}
          {!isAuth && <Link className="navWords" to="/auth">Login</Link>}
          {isAuth && <Link className="navWords" to="/login" onClick={logout}>logOut</Link>}
        </nav>
      </div>
    </>
  );
}
