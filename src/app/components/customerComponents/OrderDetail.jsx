import * as React from 'react';
import Axios from 'axios';

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoadedGoods: false,
            productId: this.props.match.params.orderId,
            orderInfo: null,
            goodsId: null,
            goodsName: null,
            price: null,
            type: null,
            quantity: null, 
        };
    }

    componentDidMount() {
        var self = this;
        Axios.post('http://localhost:8010/order/' + this.state.productId,  {
            })
            .then(function (result) {
                
                console.log(result);
              self.setState({
                isLoadedGoods: true,
                // products: result.orderInfo.goods,
                orderInfo: result.data.orderInfo,
                goodsId: result.data.goodsId,
                goodsName: result.data.goodsName,
                price: result.data.price,
                type: result.data.type,
                quantity: result.data.quantity
            });
            })
            .catch(function (error) {
              console.log(error);
              alert(error);
            });
    }

    render() {
        const { error, isLoadedGoods, orderInfo, goodsId, goodsName, price, type, quantity} = this.state;
        if (error) {
            return <div className="container"><div>Error: {error.message}</div></div>;
        } else if (!isLoadedGoods ) {
            return <div className="container"><div>Loading...</div></div>;
        } else {
            return (
                <div className="container">
                <div>
                    <h3>Order ID: {orderInfo.orderId}</h3>
                    <p>Status: {orderInfo.orderState}</p>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {goodsId.map((p, index) => (
                        <tr key={p}>
                            <td><a href={"/customer/product/"+p}>{p}</a></td>
                            <td>{goodsName[index]}</td>
                            <td>{type[index]}</td>
                            <td>{quantity[index]}</td>
                            <td>{price[index] * quantity[index]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="alert alert-warning">
                        <h3 className="total-price">Total Price: {orderInfo.totalPrice}</h3>
                        </div>
            </div>
                </div>)
        }

    }

}

export default OrderDetail;
