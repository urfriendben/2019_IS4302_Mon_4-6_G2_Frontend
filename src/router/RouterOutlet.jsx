import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from 'app/components/Home';
import OrderDetail from 'app/components/customerComponents/OrderDetail';
import OrderListing from 'app/components/customerComponents/OrderListing';
import Error404 from 'app/components/Error404';
class RouterOutlet extends React.Component {
  render() {
    return (
      <BrowserRouter>

        <Switch>
          <Route path="/" component={Home} exact={true}/>
          <Route path="/customer/viewAllOrder" component={OrderListing} exact={true}/>
          <Route path="/customer/order/:orderId" component={OrderDetail} exact={true}/>
          <Route component={Error404}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RouterOutlet;