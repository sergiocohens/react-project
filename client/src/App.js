import React from 'react';
import Login from './Components/Login'
import Profile from './Components/Profile'
import Image from './Components/Image'
import Feed from './Components/Feed'
import './App.css';

function App() {
  return (
    <div className="App">
      <Login/>
      <Profile/>
      <Image/>
      <Feed/>
    </div>
  );
}

export default App;
