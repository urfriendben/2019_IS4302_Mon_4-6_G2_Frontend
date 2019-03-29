import * as React from 'react';
import Axios from 'axios';
class OrderListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orders: [],
            orderId: null
        };
    }

    componentDidMount() {
        fetch("http://52.15.98.17:8010/orders",{
            headers: {'port': 3000},
            })
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

    handleChange = (event) => {
        this.setState({orderId: event.target.value});
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
                <input className="form-control mr-sm-2 quantity-input" type="text" onChange={this.handleChange}></input>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => window.location.href = "/customer/order/" + this.state.orderId}> View</button>
                </div>)
        }
    }

}

export default OrderListing;
