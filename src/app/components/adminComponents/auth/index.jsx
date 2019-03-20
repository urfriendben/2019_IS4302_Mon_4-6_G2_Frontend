import * as React from 'react';
import 'sass/components/adminComponents/auth.scss';
import Listing from './Listing';

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
            <Listing />
          </div>
        );
    }

}

export default Auth;
