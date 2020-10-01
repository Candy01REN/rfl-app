import React from 'react';
import { HashRouter,Switch,Route,Router,HashHistory,Link} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Home from './views/Home'
import About from './views/About'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={};
    
  }
  render(){
    return (
      <HashRouter>
        <Switch>
          <Route component={Home} exact path = "/"></Route>
          <Route component={About} path = "/about"></Route>
        </Switch>
      </HashRouter>
    );
  }
}


export default App;
