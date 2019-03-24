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
        fetch("https://api.github.com/users")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        orders: result
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
                        <th>Order Name</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={o.id}>
                                <td><a href={"order/"+o.login}>{o.id}</a></td>
                                <td>{o.login}</td>
                                <td>john@example.com</td>
                            </tr>
                            ))}
                    </tbody>
                </table>
                </div>)
        }
    }

}

export default OrderListing;
