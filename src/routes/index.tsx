import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SingIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import NewReport from '../pages/NewReport';
import EditReport from '../pages/EditReport';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/report" component={NewReport} isPrivate />
    <Route path="/editreport/:id" component={EditReport} isPrivate />
  </Switch>
);

export default Routes;
