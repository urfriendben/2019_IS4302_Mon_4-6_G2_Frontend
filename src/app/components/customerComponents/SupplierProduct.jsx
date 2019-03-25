import * as React from 'react';
import "sass/components/customerComponents/components.scss";

class SupplierProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: this.props.products, // productId:product}
            //product: {quantity: this.state.quantity, product:productInfo}
        };
    }

    render() {
        var products = this.state.products;
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                        {Object.keys(products).map(k => (
                            <tr key={products[k].product.goodsId}>
                            <td>{products[k].product.goodsId}</td>
                            <td>{products[k].product.name}</td>
                            <td>{products[k].quantity}</td>
                            <td>{products[k].product.price * products[k].quantity}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default SupplierProduct;
