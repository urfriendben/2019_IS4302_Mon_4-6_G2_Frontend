import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppNavbar from 'app/components/AppNavbar';
import AppFooter from 'app/components/AppFooter';
import Home from 'app/components/Home';
import Auth from 'app/components/adminComponents/auth';
import Login from 'app/components/adminComponents/Login';
import Error404 from 'app/components/Error404';

class RouterOutlet extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <AppNavbar />
          <Switch>
            <Route path="/" component={Login} exact={true}/>
            <Route path="/auth" component={Auth} />
            <Route component={Error404}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default RouterOutlet;
