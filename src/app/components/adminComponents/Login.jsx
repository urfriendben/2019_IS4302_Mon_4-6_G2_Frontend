import * as React from 'react';
import { Jumbotron } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Axios from 'axios';
import { url } from 'enum.json';

class Login extends React.Component {
    username = '';
    password = '';

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    LoginSubmit = () => {
      let history = this.props.history;
      Axios.post(url + '/login',
        {
          username: this.username,
          password: this.password
      }).then(function(res) {
        if (res.status !== 500) {
          sessionStorage.setItem('loggedIn', JSON.stringify({
            username: res.data.data.username,
            role: res.data.data.role,
            port: res.data.data.port
          }));
          history.push('/auth');
        }
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
