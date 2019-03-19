import React, { Component } from 'react';
import 'sass/app.scss';
import RouterOutlet from 'router/RouterOutlet'
import AppNavbar from 'app/components/AppNavbar'
import AppFooter from 'app/components/AppFooter'
import CustomerMenu from 'app/components/customerComponents/Menu';

class App extends Component {
  render() {
    return (
      <div id="App">
        <AppNavbar/>
            <div class="container">
            <RouterOutlet/>
            </div>
        <AppFooter/>
      </div>
    );
  }
}

export default App;
