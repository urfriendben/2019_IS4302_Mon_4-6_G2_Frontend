import * as React from 'react';
import "sass/components/customerComponents/components.scss";
class OrderListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orderId: null
        };
    }

    componentDidMount() {
    }

    handleChange = (event) => {
        this.setState({orderId: event.target.value});
      }

    render() {
        const { error, isLoaded, orders } = this.state;
        return (
            <div className="container" style={{marginTop: '20px'}}>
            <h3>View Order History</h3>
            <input className="form-control mr-sm-2" placeholder="Enter Order ID" style={{marginBottom:'20px'}} type="text" onChange={this.handleChange}></input>
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => window.location.href = "/customer/order/" + this.state.orderId}> View</button>
            </div>)
    }

}

export default OrderListing;
