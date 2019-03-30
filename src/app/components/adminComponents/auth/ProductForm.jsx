import * as React from 'react';
import { Alert, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupText, InputGroupAddon, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios';
import { url } from 'enum.json';
class ProductForm extends React.Component {
    constructor(props) {
        const loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
        super(props);
        this.state = {
          modal: false,
          product: props.product ? props.product : {},
          action: props.type,
          port: loggedIn.port,
          id: props.type !== 'CREATE' ? props.product.goodsId : null,
          name: props.type !== 'CREATE' ? props.product.name : null,
          type: props.type !== 'CREATE' ? props.product.type : null,
          quantity: props.type !== 'CREATE' && props.type !== 'IMPORT' ? props.product.quantity : null,
          price: props.type !== 'CREATE' ? props.product.price : null,
          error: false
        };
    }

    toggle = () => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }

    submit = () => {
      switch(this.state.action) {
        case 'CREATE':
          Axios.post(url + '/goods', {
            id: this.state.id,
            supplier: 'sup_admin',
            name: this.state.name,
            type: this.state.type,
            quantity: this.state.quantity,
            price: this.state.price
          }, {
            headers: {
              port: this.state.port
            }
          }).then((result) => {
            window.location.href = '/auth/products';
          }).catch((err) => {
            this.setState({
              error: true
            });
          })
          break;
        case 'UPDATE':
          Axios.put(url + '/goods/' + this.state.product.goodsId, {
            id: this.state.product.goodsId,
            supplier: 'sup_admin',
            name: this.state.name,
            type: this.state.type,
            quantity: this.state.product.quantity,
            price: this.state.price
          }, {
            headers: {
              port: this.state.port
            }
          }).then((result) => {
            window.location.href = '/auth/products';
          }).catch((err) => {
            this.setState({
              error: true
            });
          })
          break;
        case 'DELETE':
          Axios.delete(url + '/goods/' + this.state.product.goodsId, {
            headers: {
              port: this.state.port
            }
          }).then((result) => {
            window.location.href = '/auth/products';
          }).catch((err) => {
            this.setState({
              error: true
            });
          })
          break;
        case 'IMPORT':
          Axios.post(url + '/importGoods', {
            goodsId: this.state.product.goodsId,
            quantity: this.state.quantity
          }, {
            headers: {
              port: this.state.port
            }
          }).then((result) => {
            window.location.href = '/auth/products';
          }).catch((err) => {
            this.setState({
              error: true
            });
          })
          break;
      }
    }

    render() {
        const { modal, product, action, error } = this.state;
        return (
          <div>
            {
              action === 'CREATE'
              ?
              <a className="dropdown-item" onClick={this.toggle}>Create</a>
              :
              <Button color={action === 'IMPORT' ? 'info' : action === 'UPDATE' ? 'info' : 'danger'} onClick={this.toggle}>{action === 'IMPORT' ? 'Import' : action === 'UPDATE' ? 'Update' : 'Delete'}</Button>
            }
            <Modal isOpen={modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>{action === 'IMPORT' ? 'Import Quantity' : action === 'UPDATE' ? 'Update Product' : 'Delete Product'}</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="pId">Product ID</Label>
                    <Input type="text" name="pId" id="pId" value={this.state.id} disabled={action === 'CREATE' ? false : true} onChange={(e) => this.setState({id: e.target.value})} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" value={this.state.name} disabled={action === 'CREATE' || action === 'UPDATE' ? false : true} onChange={(e) => this.setState({name: e.target.value})} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="type">Type</Label>
                    <Input type="text" name="type" id="type" value={this.state.type} disabled={action === 'CREATE' || action === 'UPDATE' ? false : true} onChange={(e) => this.setState({type: e.target.value})} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="quantity">Quantity</Label>
                    <Input type="text" name="quantity" id="quantity" value={this.state.quantity} disabled={action === 'CREATE' || action === 'IMPORT' ? false : true} onChange={(e) => this.setState({quantity: e.target.value})} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="price">Price</Label>
                    <Input type="text" name="price" id="price" value={this.state.price} disabled={action === 'CREATE' || action === 'UPDATE' ? false : true} onChange={(e) => this.setState({price: e.target.value})} />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={this.submit}>{action === 'IMPORT' ? 'Import' : action === 'UPDATE' ? 'Update' : action === 'DELETE' ? 'Delete' : 'Create'}</Button>
                <div style={{height: '20px'}}/>
                {error ? <Alert color="danger">An error has occurred</Alert> : null}
              </ModalFooter>
            </Modal>
          </div>
        );
    }

}

export default ProductForm;
