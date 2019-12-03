import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Home from 'Routes/Home';
import TV from 'Routes/TV';
import Search from 'Routes/Search';
import Header from 'Components/Header';
import Detail from 'Routes/Detail';
import Collection from 'Routes/Collection';

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/tv" exact component={TV}></Route>
        <Route path="/search" exact component={Search}></Route>
        <Route path="/movie/:id" component={Detail} />
        <Route path="/show/:id" component={Detail} />
        <Route path="/collection/:id" component={Collection} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
