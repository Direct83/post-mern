import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreateTopicPage from './pages/CreateTopicPage';
import Discuss from './pages/Discuss';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { checkAuth } from './redux/auth/actions';
import { RootState } from './redux/store'

function App() {
  // const stateCheck = useSelector((state: RootState) => state.content);
  // console.log('stateCheck', stateCheck);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/create-topic" exact component={CreateTopicPage} />
        <Route path="/discuss" exact component={Discuss} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
