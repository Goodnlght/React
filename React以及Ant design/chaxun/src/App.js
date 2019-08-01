import React from 'react';
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom'
import Login from './login'
import './App.css';

function App() {
  return (
    <div className="App">
       <h2>App页面</h2>
         <Login />
    </div>
  );
}

export default App;
