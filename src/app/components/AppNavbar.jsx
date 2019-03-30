import * as React from 'react';
import "sass/components/customerComponents/appNavbar.scss";
import logo from 'img/logo.png';

class AppNavbar extends React.Component {
  render() {
    return (

				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<img src={logo} style={{width:'50px'}}></img>
					<a style={{marginLeft: '20px'}} className="navbar-brand" href="/">ShopEasy</a>
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
								<a className="nav-link" href="/">Products</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/customer/viewAllOrder">Order History</a>
							</li>
							{/* <li className="nav-item dropdown">
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
							</li> */}

						</ul>
						{/* <form className="form-inline my-2 my-lg-0">
							<input className="form-control mr-sm-2" type="search" placeholder="Search"
								   aria-label="Search"></input>
								<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
							<button className="btn btn-outline-success my-2 my-sm-0" style={{marginLeft: '10px'}}> Log In
							</button>
							<button className="btn btn-outline-success my-2 my-sm-0" style={{marginLeft: '10px'}}> Sign Up
							</button>
						</form> */}
						<a href={"/customer/shoppingCart"} className="btn btn-outline-success my-2 my-sm-0" style={{marginLeft: '10px'}}>
						<i className='fas fa-shopping-cart'></i> Shopping Cart
						</a>
					</div>
				</nav>

    );
  }
}

export default AppNavbar;
