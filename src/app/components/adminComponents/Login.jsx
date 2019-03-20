import * as React from 'react';
import { Jumbotron } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Login extends React.Component {
    email = '';
    password = '';

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    LoginSubmit = () => {
      sessionStorage.setItem('loggedIn', JSON.stringify({
        email: this.email,
        role: this.email === 'supplier' ? 'SUPPLIER' : 'SHIPPING'
      }));
      this.props.history.push('/auth');
    }

    render() {
        return (
          <div style={{height:'100vh',width:'100vw',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
            <Jumbotron style={{width:'100vw',borderRadius:0}}>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" name="email" id="email" placeholder="example@email.com" onChange={(e) => this.email = e.target.value} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Password</Label>
                  <Input type="password" name="password" id="password" onChange={(e) => this.password = e.target.value} />
                </FormGroup>
                <Button onClick={this.LoginSubmit}>Submit</Button>
              </Form>
            </Jumbotron>
          </div>
        );

    }

}

export default Login;
