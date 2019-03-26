import * as React from 'react';
import { Alert, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupText, InputGroupAddon, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios';
import { url } from 'enum.json';
class EndorseSupplier extends React.Component {
    constructor(props) {
        const loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));

        super(props);
        this.state = {
          modal: false,
          sid: null,
          spId: null,
          size: null,
          weight: null,
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
      Axios.post(url + '/SupplierHandover', {
        shipmentId: this.state.sid,
        shippingPartnerId: this.state.spId,
        orderId: this.props.order.orderId,
        size: this.state.size,
        weight: this.state.weight
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
        const { modal, endorseOrderId, error } = this.state;
        return (
          <div>
            <Button color="primary" onClick={this.toggle}>Shipment</Button>
            <Modal isOpen={modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Create Shipment</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="sid">Shipping ID</Label>
                    <Input type="text" name="sid" id="sid" onChange={(e) => this.setState({sid: e.target.value})} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="spId">Shipping Partner ID</Label>
                    <Input type="text" name="spId" id="spId" onChange={(e) => this.setState({spId: e.target.value})} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="size">Size</Label>
                    <InputGroup>
                      <Input type="text" name="size" id="size" onChange={(e) => this.setState({size: e.target.value})} />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label for="weight">Weight</Label>
                    <InputGroup>
                      <Input type="text" name="weight" id="weight" onChange={(e) => this.setState({weight: e.target.value})} />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>kg</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={this.submit}>Endorse</Button>
                <br/>
                {error ? <Alert variant={"danger"}>An error has occurred</Alert> : null}
              </ModalFooter>
            </Modal>
          </div>
        );
    }

}

export default EndorseSupplier;
