import * as React from 'react';
import "sass/components/customerComponents/components.scss";

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: this.props.location.data,
            products: {}, // {productId: {quantity: this.state.quantity, product:productInfo}}
            selectedSupplier: {}, // {supplierId: {quantity: this.state.quantity, product:productInfo}}
            selectedProduct: {}, // {productId: {quantity: this.state.quantity, product:productInfo}}
        };
    }
    clearLS = () => {
        localStorage.clear();
        this.setState({products: []});
    }

    clearPartialLS = () => {
        Object.keys(this.state.selectedProduct).map(k => {
            delete localStorage[k];
        })
        this.reloadProducts();
    }

    makeOrder = () => {
        if(Object.keys(this.state.selectedSupplier).length == 0){
            alert("You have not select any product yet!");
        }else{        
            this.props.history.push(
            {
                pathname: `/customer/makeOrder`,
                state: this.state.selectedSupplier // your data array of objects
              });
            }
    }

    checkbox = (product, checked) => {
        var ss = this.state.selectedSupplier;
        var sp = this.state.selectedProduct;
        if(checked){
            if(ss[product.product.userId] == null || ss[product.product.userId] == 'undefined'){ss[product.product.userId] = {}};
            ss[product.product.userId][product.product.id] = product;
            sp[product.product.id] = product;
            
        }else{
            delete ss[product.product.userId][product.product.id];
            delete sp[product.product.id];
            if(ss[product.product.userId] == null){
                delete ss[product.product.userId];
            }
        }
        this.setState({selectedSupplier:ss, selectedProduct:sp});
    }

    componentDidMount() {
        this.reloadProducts();
        console.log(this.state.selectedSupplier)
        if (this.state.error){
            alert(this.state.error);
        }
    }

    reloadProducts = () => {
        var values = {};
        var keys = Object.keys(localStorage);
        var i = keys.length;

        while ( i-- ) {
            values[keys[i]] = JSON.parse(localStorage.getItem(keys[i]));
        }
        this.setState({products: values, selectedSupplier: {}, selectedProduct: {}});
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
                        {Object.keys(this.state.products).map(k => {
                            var p = this.state.products[k];
                            return (
                            <tr key={p.product.id}>
                                <td><input type="checkbox"  onChange={(e) => this.checkbox(p, e.target.checked)} className="form-check-input check-product" /></td>
                                <td><a href={"product/"+p.product.id}>{p.product.id}</a></td>
                                <td>{p.product.userId}</td>
                                <td>{p.quantity}</td>
                                <td>{p.quantity * 2}</td>
                            </tr>
                            )})}
                    </tbody>
                </table>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.clearLS()} style={{marginRight: '10px'}}> Clear All Products</button>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.clearPartialLS()} style={{marginLeft: '10px'}}> Clear Selected Products</button>
                <a href={"/customer"} className="btn btn-outline-success my-2 my-sm-0" style={{marginLeft: '10px'}}>
						Browse All Products
					</a>
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.makeOrder()} style={{marginLeft: '10px'}}> Make Order</button>
                </div>)
        }
    }

}

export default ShoppingCart;
