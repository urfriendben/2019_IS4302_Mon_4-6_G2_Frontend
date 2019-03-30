import * as React from 'react';
import { Jumbotron } from 'reactstrap';
import { Alert, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Axios from 'axios';
import { url } from 'enum.json';
import logo from 'img/logo.png';

class Login extends React.Component {
    username = '';
    password = '';

    constructor(props) {
        super(props);
        this.state = {
          error: false
        };
    }

    LoginSubmit = () => {
      let self = this;
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
      .catch(function(error) {
        self.setState({
          error: true
        })
      })

    }

    render() {
        return (
          <div style={{height:'100vh',width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
            <img style={{width: '30%'}} src={logo}/>
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
                <div style={{height: '20px'}}/>
                {this.state.error ? <Alert color="danger">Invalid Username or Password. Please try again.</Alert> : null}
              </Form>
            </Jumbotron>
          </div>
        );

    }

}

export default Login;
