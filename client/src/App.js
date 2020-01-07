import React from 'react';
import Login from './Components/Login'
import Profile from './Components/Profile'
// import Image from './Components/Image'
import Feed from './Components/Feed'
import './App.css';
import { BrowserRouter, Link , Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
       <Login/> 
  

<Switch>
  <Route path= "/profile" component={Profile} />
  <Route path= "/feed" component={Feed} />
</Switch>




      
    </div>
  );
}
 
export default App;
