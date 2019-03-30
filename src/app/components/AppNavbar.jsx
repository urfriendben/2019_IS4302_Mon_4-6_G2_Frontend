import * as React from 'react';
import "sass/components/customerComponents/appNavbar.scss";
import logo from 'img/logo.png';
import { withRouter } from 'react-router-dom';
import ProductForm from './adminComponents/auth/ProductForm';

class AppNavbar extends React.Component {
  constructor(props) {
      const loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
      super(props);
      this.state = {
          // loggedIn: sessionStorage.getItem('loggedIn'),
          show: true,
          role: loggedIn ? loggedIn.role : null
      };
  }

  logout = () => {
    sessionStorage.setItem('loggedIn', null);
    window.location.href = '/';
  }

  componentDidMount() {
    // if (this.props.location.pathname.includes('admin')) {
    const loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
    if (loggedIn === 'null' || !loggedIn) {
      this.setState({show: false, role: loggedIn ? loggedIn.role : null});
    }
    // }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
      // if (this.props.location.pathname.includes('admin')) {
      if (this.props.location.pathname.includes('auth')) {
        this.setState({show: true, role: loggedIn ? loggedIn.role : null});
      } else {
        this.setState({show: true, role: loggedIn ? loggedIn.role : null});
      }
    }
  }

  render() {
    const { loggedIn, show, role } = this.state;

    if (!show) {
      return <div></div>;
    }

    return (
			<header>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<img width="70" src={logo}></img>
          {
            // !loggedIn ?
            //   <a className="navbar-brand" href="/">Online Shopping Tool</a>
            // :
              <a className="navbar-brand" href="/admin/auth">{role === 'CUSTOMER' ? 'ShopEasy' : role}</a>
          }
					<button className="navbar-toggler" type="button" data-toggle="collapse"
							data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
							aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							{/*<li className="nav-item active">*/}
								{/*<a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>*/}
							{/*</li>*/}
							<li className="nav-item">
                {
                  // !loggedIn ?
                  //   <a className="nav-link" href="/customer/viewAllOrder">Orders</a>
                  // :
                    <a className="nav-link" href="/auth">Orders</a>
                }
							</li>
              {role === 'SUPPLIER' ?
  							<li className="nav-item dropdown">
  								<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
  								   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  									Products
  								</a>
  								<div className="dropdown-menu" aria-labelledby="navbarDropdown">
  									<ProductForm type="CREATE" />
  									<a className="dropdown-item" href="/auth/products">View</a>
  								</div>
  							</li>
              : null}
              <li className="nav-item">
                {
                  // !loggedIn ?
                  //   null
                  // :
                    <a className="nav-link" onClick={this.logout}>Logout</a>
                }
							</li>
							{/*<li className="nav-item">*/}
								{/*<a className="nav-link disabled" href="#">Disabled</a>*/}
							{/*</li>*/}
						</ul>
						<form className="form-inline my-2 my-lg-0">
							{ /*!loggedIn && <input className="form-control mr-sm-2" type="search" placeholder="Search"
								   aria-label="Search"></input>*/ }
							{ /*!loggedIn && <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>*/ }
							{ /*!loggedIn && <button className="btn btn-outline-success my-2 my-sm-0" style={{marginLeft: '10px'}}> Log In
							</button>*/ }
							{ /*!loggedIn && <button className="btn btn-outline-success my-2 my-sm-0" style={{marginLeft: '10px'}}> Sign Up
							</button>*/ }
						</form>

					</div>
				</nav>
			</header>
    );
  }
}

export default withRouter(AppNavbar);
