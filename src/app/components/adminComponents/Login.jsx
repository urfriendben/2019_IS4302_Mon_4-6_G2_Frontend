import * as React from 'react';
import { Jumbotron } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Axios from 'axios';

class Login extends React.Component {
    username = '';
    password = '';

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    LoginSubmit = () => {
      Axios.post('http://172.23.202.175:8010/login', 
        {
          username: this.username,
          password: this.password
      }).then(function(res) {
        console.log(res);
        sessionStorage.setItem('loggedIn', JSON.stringify({
          username: res.username,
          role: res.role
        }));
      })
     
  
    }

    render() {
        return (
          <div style={{height:'100vh',width:'100%',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
            <Jumbotron style={{width:'100%',borderRadius:0}}>
              <Form>
                <FormGroup>
                  <Label for="exampleUsername">Username</Label>
                  <Input type="username" name="username" id="username" placeholder="user name" onChange={(e) => this.username = e.target.value} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleUsername">Password</Label>
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
