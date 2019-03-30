import * as React from 'react';
import { Alert, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupText, InputGroupAddon, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios';
import { url } from 'enum.json';
class EndorseShipping extends React.Component {
    constructor(props) {
        const loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
        super(props);
        this.state = {
          modal: false,
          id: props.order.shipmentId,
          type: props.supHandover ? 'SHIPPING' : props.conHandover ? 'DELIVERY' : null,
          port: loggedIn.port,
          error: false
        };
    }

    toggle = () => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }

    submit = () => {
      Axios.post(url + (this.state.type === 'SHIPPING' ? '/ShippingPartnerEndorseHandover' : this.state.type === 'DELIVERY' ? '/ShippingPartnerDelivery' : null), {
        shipmentId: this.state.id
      }, {
        headers: {
          port: this.state.port
        }
      }).then((result) => {
        document.location.reload();
      }).catch((err) => {
        this.setState({
          error: true
        });
      })
    }

    render() {
        const { modal, id, type, error } = this.state;
        return (
          <div>
            <Button color="primary" onClick={this.toggle}>{type === 'SHIPPING' ? 'Endorse' : 'Deliver'}</Button>
            <Modal isOpen={modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Endorse {type === 'SHIPPING' ? 'Shipment' : 'Delivery'}</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="spId">Shipment ID</Label>
                    <Input type="text" name="spId" id="spId" value={id} disabled />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={this.submit}>{type === 'SHIPPING' ? 'Endorse' : 'Deliver'}</Button>
                <br/>
                {error ? <Alert color="danger">An error has occurred</Alert> : null}
              </ModalFooter>
            </Modal>
          </div>
        );
    }

}

export default EndorseShipping;
