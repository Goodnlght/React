import React from 'react';
import './App.css';
import Render from './day02/Render';  
import Student from './day02/Student'
import Life from './day02/Life'
import Course from './day03/Course'
import SC from './day03/SC'

import Teacher from './day03/Teacher'
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'
function App() {
  return (
    <div className="App">
        {/* <Life />
        <Render /> 
       
        */}
        <div className="App">
        <header className="header">
          <h1>学生选课系统</h1>
        </header>
        <article className="content">
          <BrowserRouter>
            <ul className="nav">
              <li><Link to='/student'>学生管理</Link></li>
              <li><Link to="/course">课程管理</Link></li>
              <li><Link to="/sc">选课管理</Link></li>
              <li><Link to="/teacher">教师管理</Link></li>
            </ul>  
            <div className="content-right">
              <Switch>
                    <Route path="/student" component={Student} /> 
                    <Route path="/course" component={Course} />
                    <Route path="/sc" component={SC} />  
                    <Route path="/teacher" component={Teacher} />  
                </Switch>
            </div>
          </BrowserRouter>  
          </article>    
        </div>
       
        
    </div>
  );
}

export default App;
