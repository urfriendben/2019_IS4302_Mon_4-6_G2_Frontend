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
            shipment: null
        };
    }

    componentDidMount() {
        var self = this;
        Axios.get('http://52.15.98.17:8010/order/' + this.state.productId,{
            headers: {'port': 3000},
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

            Axios.get('http://52.15.98.17:8010/shipments',{
                headers: {'port': 3000},
                })
                .then(function (result) {
                  var found = null;
                  result.data.data.map(function (shipment) {
                    if (shipment.order.split('#')[1] === self.state.orderInfo.orderId) {
                      found = shipment;
                    }
                  })
                  self.setState({
                    shipment: found
                  })
                })
            })
            .catch(function (error) {
              console.log(error);
              alert(error);
            });
    }

    closeOrder = () => {
      var self = this;
      Axios.post('http://52.15.98.17:8010/ConsumerEndorseDelivery',{
        shipmentId: self.state.shipment.shipmentId
      },{
          headers: {'port': 3000},
          })
          .then(function (result) {
            Axios.post('http://52.15.98.17:8010/closeOrder',{
              orderId: self.state.orderInfo.orderId,
              shipmentId: self.state.shipment.shipmentId
            },{
              headers: {'port': 3000},
              })
              .then(function (result) {
                window.location.reload();
              })
              .catch(function (error) {
                console.log(error);
                alert(error);
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
                    <p><span style={{color: this.state.shipment ? !this.state.shipment.shippingPartnerHandoverEndorsed ? '#00b16a' : '#212529' : '#00b16a'}}>Supplier Preparing</span> > <span style={{color: this.state.shipment && this.state.shipment.shippingPartnerHandoverEndorsed && !this.state.shipment.shippingPartnerDelivery && !this.state.shipment.consumerEndorsed ? '#00b16a' : '#212529'}}>Shipping Partner In Transit</span> > <button disabled={this.state.shipment && this.state.shipment.shippingPartnerDelivery && !this.state.shipment.consumerEndorsed ? false : true} className={this.state.shipment && this.state.shipment.shippingPartnerDelivery && !this.state.shipment.consumerEndorsed ? "btn btn-outline-success" : "btn"} onClick={this.closeOrder}>Close Order</button></p>
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
