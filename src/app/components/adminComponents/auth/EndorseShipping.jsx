import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, InputGroup, InputGroupText, InputGroupAddon, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class EndorseShipping extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          id: props.id,
          type: Math.floor(Math.random() * 2) === 0 ? 'SHIPPING' : 'DELIVERY'
        };
    }

    toggle = () => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }

    render() {
        const { modal, endorseOrderId, id, type } = this.state;
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
                <Button color="success" onClick={this.toggle}>{type === 'SHIPPING' ? 'Endorse' : 'Deliver'}</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
    }

}

export default EndorseShipping;
