import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateTopicPage from './pages/CreateTopicPage';
import DiscussPage from './pages/DiscussPage';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/create-topic" exact component={CreateTopicPage} />
        <Route path="/discuss" exact component={DiscussPage} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
