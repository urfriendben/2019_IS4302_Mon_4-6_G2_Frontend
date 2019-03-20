import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppNavbar from 'app/components/AppNavbar';
import AppFooter from 'app/components/AppFooter';
import Home from 'app/components/Home';
import OrderDetail from 'app/components/customerComponents/OrderDetail';
import OrderListing from 'app/components/customerComponents/OrderListing';
import Auth from 'app/components/adminComponents/auth';
import Login from 'app/components/adminComponents/Login';
import Error404 from 'app/components/Error404';

class RouterOutlet extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <AppNavbar />
        <Switch>
          <Route path="/" component={Home} exact={true}/>
          <Route path="/customer/viewAllOrder" component={OrderListing} exact={true}/>
          <Route path="/customer/order/:orderId" component={OrderDetail} exact={true}/>
          <Route path="/admin" component={Login} exact={true} />
          <Route path="/admin/auth" component={Auth} />
          <Route component={Error404}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RouterOutlet;
