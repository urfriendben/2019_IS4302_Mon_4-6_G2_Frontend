import * as React from 'react';
import "sass/components/customerComponents/components.scss";

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [], 
        };
    }
    clearLS = () => {
        localStorage.clear();
        this.setState({products: []});
    }

    makeOrder = () => {

    }

    componentDidMount() {
        var values = [];
        var keys = Object.keys(localStorage);
        var i = keys.length;

        while ( i-- ) {
            values.push( JSON.parse(localStorage.getItem(keys[i])));
        }
        this.setState({products: values});
    }

    render() {
        if(this.state.products.length == 0){
            return (
                <div className="container">
                    <p>Your Shopping Cart is still empty!</p>
                    <a href={"/customer"} className="btn btn-outline-success my-2 my-sm-0">
						Browse All Products
					</a>
                </div>
            )
        }
        else{
            console.log(this.state.products[0])
            return (
                <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Select</th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map(p => (
                            <tr key={p.product.id}>
                                <td><input type="checkbox" className="form-check-input check-product" /></td>
                                <td><a href={"product/"+p.product.login}>{p.product.id}</a></td>
                                <td>{p.product.node_id}</td>
                                <td>{p.quantity}</td>
                                <td>{p.quantity * 2}</td>
                            </tr>
                            ))}
                    </tbody>
                </table>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.clearLS()} style={{marginRight: '10px'}}> Clear All Products</button>
                <a href={"/customer"} className="btn btn-outline-success my-2 my-sm-0">
						Browse All Products
					</a>
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.makdOrder()} style={{marginLeft: '10px'}}> Make Order</button>
                </div>)
        }
    }

}

export default ShoppingCart;
