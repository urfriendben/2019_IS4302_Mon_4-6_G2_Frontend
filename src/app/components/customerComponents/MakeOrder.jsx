import * as React from 'react';
import SupplierProduct from 'app/components/customerComponents/SupplierProduct';
import "sass/components/customerComponents/components.scss";
import Axios from 'axios';
import Loader from 'app/components/customerComponents/Loader';

class MakeOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            port:3000,
            products: this.props.location.state, // {supplierId:{productId:product}}
            //product: {quantity: this.state.quantity, product:productInfo}
        };
    }

    calculatePrice = () => {
        var price = 0;
        var products = this.state.products;
        Object.keys(products).map(supplierId => {
            Object.keys(products[supplierId]).map (productId=> {
                var p = products[supplierId][productId];
                price += p.quantity * 2;
            })
        }
        )
        return price;
    }

    // handleErrors = (response) => {
    //     if (!response.ok) {
    //         console.log(response);
    //         throw Error(response.statusText);
    //     }

    //     return response;
    // }

    confirm = (obj) => {
        var products = {};
        Object.keys(this.state.products).forEach(supplierId => {
          products[supplierId] = {};
          Object.keys(this.state.products[supplierId]).forEach(productId => {
            products[supplierId]["resource:org.onlineshopping.basic.Goods#" + productId] = {};
            products[supplierId]["resource:org.onlineshopping.basic.Goods#" + productId].quantity = this.state.products[supplierId][productId].quantity;
          })
        })
        Axios.post('http://52.15.98.17:8010/makeOrder', products, {
          "headers": {'port': this.state.port},
          })
          .then(function (response) {
            console.log(response);
            obj.props.history.push(
            {
                pathname: `/customer/shoppingCart`,
                data: 'Successfully placed the order! You can now view it in your order history. OrderId:' + response.data + " Pleae keep this OrderId for future reference.",
                object: obj.state.products
            });
          })
          .catch(function (error) {
            console.log(error);
            alert(error);
          });

        // try{
        //     fetch('https://jsonplaceholder.typicode.com/posts', {
        //         method: 'post',
        //         headers: {'Content-Type':'application/json'},
        //         body: JSON.stringify({
        //             order: this.state.products
        //           })
        //        }).then(this.handleErrors)
        //        .then((res) => {
        //            console.log(res);
        //             this.props.history.push(
        //             {
        //                 pathname: `/customer/shoppingCart`,
        //                 data: 'Successfully placed the order! You can now view it in your order history.',
        //                 object: this.state.products
        //             });
        //     }).catch(function(error) {
        //         console.log(error);
        //         alert(error);
        //     });
        // }catch(e){
        //     this.setState({error: e});
        // }
    }

    render() {
        const { error, isLoaded, products } = this.state;
        if(products == null || products == 'undefined' || Object.keys(products).length == 0){
            this.props.history.push(
                {
                    pathname: `/customer/shoppingCart`,
                    error: 'Session expired! Please do not refresh the page while making the order.'
                });
                return null;
        }else{

            if (error) {
                return <div className="container"><div>Error: {error.message}</div></div>;
            } else {

                return (
                        <div className="container">
                        { (error != null && error != 'undefined')
            ? <div className="alert alert-danger" role="alert">{error}</div>
            : <div></div>
        }
                        {
                            Object.keys(products).map(supplierId => (
                                <div key={supplierId.split("#")[1]}>
                                    <h3>Supplier: {supplierId.split("#")[1]}</h3>
                                    <SupplierProduct products={products[supplierId]}></SupplierProduct>
                                </div>
                            ))
                        }
                       <div className="alert alert-warning">
                        <h3 className="total-price">Total Price: {this.calculatePrice()}</h3>
                        </div>
                        <button className="btn btn-outline-success my-2 my-sm-0 confirm-btn" onClick={() => this.confirm(this)} > Confirm Order</button>
                    </div>)
            }
        }


    }

}

export default MakeOrder;
