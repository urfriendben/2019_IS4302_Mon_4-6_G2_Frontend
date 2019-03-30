import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orderId: this.props.match.params.userId,
        };
    }

    componentDidMount() {
        Promise.all([
            fetch("https://api.github.com/users/"+this.state.orderId),
            fetch("https://api.github.com/users/"+this.state.orderId+"/followers")
        ])
            .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            .then(([data1, data2]) => {
                this.setState({
                isLoaded: true,
                orderInfo: data1,
                products: data2,
            });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
        });
    }

    render() {
        const { error, isLoaded, orderInfo, products} = this.state;
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
                <div>
                    <h3>Order ID: {orderInfo.id}</h3>
                    <p>Status: </p>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(p => (
                        <tr key={p.login}>
                            <td><a>{p.login}</a></td>
                            <td>john@example.com</td>
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
