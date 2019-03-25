import * as React from 'react';
class OrderListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orders: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8010/orders")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        orders: result.data
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
        const { error, isLoaded, orders } = this.state;
        if (error) {
            return <div className="container"><div>Error: {error.message}</div></div>;
        } else if (!isLoaded) {
            return <div className="container"><div>Loading...</div></div>;
        } else {
            return (
                <div className="container">
                <h3>View Order History</h3>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Supplier</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={o.orderId}>
                                <td><a href={"order/"+o.orderId}>{o.orderId}</a></td>
                                <td>{o.supplier}</td>
                                <td>{o.totalPrice}</td>
                                <td>{o.orderState}</td>
                            </tr>
                            ))}
                    </tbody>
                </table>
                </div>)
        }
    }

}

export default OrderListing;
