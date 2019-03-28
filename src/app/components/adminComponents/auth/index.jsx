import * as React from 'react';
import 'sass/components/adminComponents/auth.scss';
import Listing from './Listing';
import ProductList from './ProductList';
import { Route } from 'react-router-dom';

class Auth extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const loggedIn = sessionStorage.getItem('loggedIn');
        if (loggedIn === 'null' || !loggedIn) {
          window.location.href = '/';
        }
    }

    render() {
        return (
          <div>
            <Route path="/auth" component={Listing} exact={true}/>
            <Route path="/auth/products" component={ProductList} exact={true}/>
          </div>
        );
    }

}

export default Auth;
