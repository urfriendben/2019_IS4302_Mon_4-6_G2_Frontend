import * as React from 'react';
import "sass/components/customerComponents/components.scss";

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: this.props.location.error,
            data: this.props.location.data,
            object: this.props.location.object,
            products: {}, // {productId: {quantity: this.state.quantity, product:productInfo}}
            selectedSupplier: {}, // {supplierId: {quantity: this.state.quantity, product:productInfo}}
            selectedProduct: {}, // {productId: {quantity: this.state.quantity, product:productInfo}}
        };
    }
    clearLS = () => {
        localStorage.clear();
        this.setState({products: []});
    }

    clearPartialLSOrdered = () => {
        var l = this.state.object;
        if (l != null && l != 'undefined'){
            Object.keys(l).map(supplierId => {
                Object.keys(l[supplierId]).map(productId => {
                    delete localStorage[productId];
                })
            })
        }
    }

    clearPartialLS = () => {
        Object.keys(this.state.selectedProduct).map(productId => {
            delete localStorage[productId];
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
                state: this.state.selectedSupplier
              });
            }
    }

    checkbox = (product, checked) => {
        var ss = this.state.selectedSupplier;
        var sp = this.state.selectedProduct;
        if(checked){
            if(ss[product.product.supplier] == null || ss[product.product.supplier] == 'undefined'){ss[product.product.supplier] = {}};
            ss[product.product.supplier][product.product.goodsId] = product;
            sp[product.product.goodsId] = product;

        }else{
            delete ss[product.product.supplier][product.product.goodsId];
            delete sp[product.product.goodsId];
            if(ss[product.product.supplier] == null || Object.keys(ss[product.product.supplier]).length == 0){
                delete ss[product.product.supplier];
            }
        }
        this.setState({selectedSupplier:ss, selectedProduct:sp});
    }

    componentDidMount() {
        this.reloadProducts();
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
        const checkBox={
            width: '18px',
            height: '18px',
            margin: '0 auto'
        }
        this.clearPartialLSOrdered();
        if(Object.keys(this.state.products).length == 0){
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
            var error = this.state.error;
            var data = this.state.data;
            return (
                <div className="container">
                    { (error != null && error != 'undefined')
        ? <div className="alert alert-danger" role="alert">{error}</div>
        : <div></div>
      }
                        { (data != null && data != 'undefined')
        ? <div className="alert alert-success">{data}</div>
        : <div></div>
      }


                <table className="table table-striped shopping-cart-table" style={{marginBottom: '40px'}}>
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
                            <tr key={p.product.goodsId}>
                                <td><input type="checkbox"  onChange={(e) => this.checkbox(p, e.target.checked)} className="form-check-input" style={checkBox}/></td>
                                <td><a href={"product/"+p.product.goodsId}>{p.product.goodsId}</a></td>
                                <td>{p.product.name}</td>
                                <td>{p.quantity}</td>
                                <td>{p.product.price * p.quantity}</td>
                            </tr>
                            )})}
                    </tbody>
                </table>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.clearLS()} style={{marginRight: '10px'}}> Clear All Products</button>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.clearPartialLS()}> Clear Selected Products</button>
                <a href={"/customer"} className="btn btn-outline-success my-2 my-sm-0" style={{marginLeft: '10px'}}>
						Browse All Products
					</a>
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.makeOrder()} style={{marginLeft: '10px'}}> Make Order</button>
                </div>)
        }
    }

}

export default ShoppingCart;
