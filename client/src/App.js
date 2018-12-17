import React, { Component } from 'react';
import './App.css';
import ShoppingList from './components/ShoppingList'
import Signup from './components/User/Signup';
import Signin from './components/User/Signin';
import CustomNavbar from './components/Layout/CustomNavbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <div className="App">
      <CustomNavbar />
        <Switch>
          <Route exact path='/' component={ShoppingList} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/signin' component={Signin} />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
