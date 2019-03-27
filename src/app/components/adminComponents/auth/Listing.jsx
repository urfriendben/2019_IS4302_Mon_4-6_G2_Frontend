import * as React from 'react';
import EndorseSupplier from './EndorseSupplier';
import EndorseShipping from './EndorseShipping';
import Axios from 'axios';
import { url } from 'enum.json';
class Listing extends React.Component {
    constructor(props) {
        const loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));

        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orders: [],
            role: loggedIn.role,
            port: loggedIn.port
        };
    }

    componentDidMount() {
        console.log(url + (this.state.role === 'SUPPLIER' ? '/orders' : this.state.role === 'SHIPPING PARTNER' ? '/shipments' : null))
        Axios.get(url + (this.state.role === 'SUPPLIER' ? '/orders' : this.state.role === 'SHIPPING PARTNER' ? '/shipments' : null), { headers: {'port': this.state.port}})
        .then(
          (result) => {
            console.log(result);
            this.setState({
                isLoaded: true,
                orders: result.data.data
            });
          }
        )
        .catch(
          (error) => {
            this.setState({
                isLoaded: true,
                error
            });
          }
        )
    }

    getQuantity = (order) => {
      var quantity = 0;
      order.quantity.forEach(q => quantity += q);
      return quantity;
    }

    render() {
        const { error, isLoaded, orders, role } = this.state;
        if (error) {
            return <div className="container"><div>Error: {error.message}</div></div>;
        } else if (!isLoaded) {
            return <div className="container"><div>Loading...</div></div>;
        } else {
            return (
                <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={role === 'SUPPLIER' ? o.orderId : o.shipmentId}>
                                <td>{role === 'SUPPLIER' ? o.orderId : o.shipmentId}</td>
                                <td>{role === 'SUPPLIER' ? o.orderState : o.shipmentState}</td>
                                <td>{ role === 'SUPPLIER' ? o.orderState === 'orderPlaced' ? <EndorseSupplier order={o} /> : null : o.supplierHandover && !o.shippingPartnerHandoverEndorsed ? <EndorseShipping order={o} supHandover /> : o.supplierHandover && o.shippingPartnerHandoverEndorsed && !o.shippingPartnerDelivery ? <EndorseShipping order={o} conHandover /> : null }</td>
                            </tr>
                            ))}
                    </tbody>
                </table>
                </div>)
        }
    }

}

export default Listing;
