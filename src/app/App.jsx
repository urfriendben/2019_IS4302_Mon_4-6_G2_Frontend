import React, { Component } from 'react';
import 'sass/app.scss';
import RouterOutlet from 'router/RouterOutlet'
import AppNavbar from 'app/components/AppNavbar'
import AppFooter from 'app/components/AppFooter'

class App extends Component {
  render() {
    return (
      <div id="App">
        <AppNavbar/>

            <RouterOutlet/>

      </div>
    );
  }
}

export default App;
