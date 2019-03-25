import * as React from 'react';

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            productId: this.props.match.params.orderId,
            orderInfo: null,
            products: null,
            quantity: null, 
        };
    }

    componentDidMount() {
        fetch("http://localhost:8010/order/" + this.state.productId)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        orderInfo: result.orderInfo,
                        products: result.orderInfo.goods,
                        quantity: result.orderInfo.quantity
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, orderInfo, products, quantity} = this.state;
        if (error) {
            return <div className="container"><div>Error: {error.message}</div></div>;
        } else if (!isLoaded) {
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
                        {/* <th>Product Name</th>
                        <th>Type</th> */}
                        <th>Quantity</th>
                        {/* <th>Price</th> */}
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((p, index) => (
                        <tr key={p.split("#")[1]}>
                            <td><a href={"/customer/product/"+p.split("#")[1]}>{p.split("#")[1]}</a></td>
                            {/* <td>{p.name}</td> */}
                            {/* <td>{p.type}</td> */}
                            <td>{quantity[index]}</td>
                            {/* <td>{p.price * quantity[index]}</td> */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
                </div>)
        }

    }

}

export default OrderDetail;
