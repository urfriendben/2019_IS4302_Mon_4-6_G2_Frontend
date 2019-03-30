import * as React from 'react';
import Axios from 'axios';
import { url } from 'enum.json';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class Listing extends React.Component {
    constructor(props) {
        const loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));

        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orders: [],
            port: 3000

        };
    }

    componentDidMount() {
        Axios.get('http://52.15.98.17:8010/shipments', { headers: {'port': this.state.port}})
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
        const { error, isLoaded, orders } = this.state;
        if (error) {
            return <div className="container"><div>Error: {error.message}</div></div>;
        } else if (!isLoaded) {
            return <Modal isOpen={true} centered={true}>
              <ModalBody>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;Loading... Please wait while we load your data...</span>
                </div>
              </ModalBody>
            </Modal>
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
                            <tr key={o.shipmentId}>
                                <td>{o.shipmentId}</td>
                                <td>{shipmentState}</td>
                                <td>{o.supplierHandover && !o.shippingPartnerHandoverEndorsed ? <EndorseShipping order={o} supHandover /> : o.supplierHandover && o.shippingPartnerHandoverEndorsed && !o.shippingPartnerDelivery ? <EndorseShipping order={o} conHandover /> : null  }</td>
                            </tr>
                            ))}
                    </tbody>
                </table>
                </div>)
        }
    }

}
