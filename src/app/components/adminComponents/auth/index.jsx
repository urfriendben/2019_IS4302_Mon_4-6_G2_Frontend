import * as React from 'react';
import 'sass/components/adminComponents/auth.scss';
import Listing from './Listing';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: sessionStorage.getItem('loggedIn')
        };
    }

    componentDidMount() {
        const { loggedIn } = this.state;
        if (!loggedIn) {
          window.location.href = '/admin';
        }
    }

    render() {
        const {} = this.state;
        return (
          <div>
            <Listing />
          </div>
        );
    }

}

export default Auth;
