import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./containers/login/Login"
import UsersList from "./containers/user/UsersList"
import UserCreate from "./containers/user/UserCreate"
import UserEdit from "./containers/user/UserEdit"
import UserView from "./containers/user/UserView"

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exect path="/login" component={() => <Login />} />
          <Route exect path="/users/create" component={() =><UserCreate /> } />
          <Route exect path="/users/:id/edit" component={() =><UserEdit /> } />
          <Route exect path="/users/:id/view" component={()=><UserView /> } />
          <Route exect path="/users" component={() => <UsersList />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
