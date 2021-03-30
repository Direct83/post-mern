import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthPage from './pages/AuthPage';
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { checkAuth } from './redux/auth/actions';
import { RootState } from './redux/store'

function App() {
  const stateCheck = useSelector((state: RootState) => state.content);
  console.log(stateCheck);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/first" exact component={FirstPage} />
        <Route path="/second" exact component={SecondPage} />
        <Route path="/auth" exact component={AuthPage} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
