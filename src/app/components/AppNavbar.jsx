import * as React from 'react';
import "sass/components/customerComponents/appNavbar.scss";
import logo from 'img/logo.png';

class AppNavbar extends React.Component {
  render() {
    return (
			<header>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<img src={logo}></img>
					<a className="navbar-brand" href="/">Online Shopping Tool</a>
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
								<a className="nav-link" href="/customer/viewAllOrder">Orders</a>
							</li>
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
								   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									Products
								</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdown">
									<a className="dropdown-item" href="#">Clothes</a>
									<a className="dropdown-item" href="#">Books</a>
									<div className="dropdown-divider"></div>
									<a className="dropdown-item" href="#">Special Offer</a>
								</div>
							</li>
							{/*<li className="nav-item">*/}
								{/*<a className="nav-link disabled" href="#">Disabled</a>*/}
							{/*</li>*/}
						</ul>
						<form className="form-inline my-2 my-lg-0">
							<input className="form-control mr-sm-2" type="search" placeholder="Search"
								   aria-label="Search"></input>
								<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
							<button className="btn btn-outline-success my-2 my-sm-0" style={{marginLeft: '10px'}}> Log In
							</button>
							<button className="btn btn-outline-success my-2 my-sm-0" style={{marginLeft: '10px'}}> Sign Up
							</button>
						</form>

					</div>
				</nav>
			</header>
    );
  }
}

export default AppNavbar;
