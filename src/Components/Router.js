import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Home from 'Routes/Home';
import TV from 'Routes/TV';
import Search from 'Routes/Search';

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/tv" exact component={TV}></Route>
      <Route path="/search" exact component={Search}></Route>
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);
