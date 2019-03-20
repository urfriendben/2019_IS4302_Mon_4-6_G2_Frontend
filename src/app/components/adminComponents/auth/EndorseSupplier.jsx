import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, InputGroup, InputGroupText, InputGroupAddon, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class EndorseSupplier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          spId: null
        };
    }

    toggle = () => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }

    render() {
        const { modal, endorseOrderId } = this.state;
        return (
          <div>
            <Button color="primary" onClick={this.toggle}>Endorse</Button>
            <Modal isOpen={modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Endorse Shipment</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="spId">Shipping Partner ID</Label>
                    <Input type="text" name="spId" id="spId" onChange={(e) => this.setState({spId: e.target.value})} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="size">Size</Label>
                    <Input type="select" name="size" id="size" onChange={(e) => this.setState({spId: e.target.value})}>
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="weight">Weight</Label>
                    <InputGroup>
                      <Input type="text" name="weight" id="weight" onChange={(e) => this.setState({spId: e.target.value})} />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>kg</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={this.toggle}>Endorse</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
    }

}

export default EndorseSupplier;
