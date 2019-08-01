import React from 'react';
import KfcUser from './day01/KfcUser'
import './App.css';
import KfcRole from './day02/KfcRole'
import KfcUserRole from './day02/KfcUserRole'
import KfcProduct from './day02/KfcProduct'
import KfcOrder from './day02/KfcOrder'
import KfcOrderLine from './day02/KfcOrderLine'
import KfcCategory from './day02/KfcCategory'
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <header>
          <h1>KFC自动点餐系统</h1>
      </header>
      <article className="content">
      <BrowserRouter>
         <ul className="nav">
            <li><Link to='/kfcuser'>客户管理</Link></li>
            <li><Link to='/kfcrole'>角色管理</Link></li>
            <li><Link to='/kfcuserrole'>客户角色</Link></li>
            <li><Link to='/kfcproduct'>产品管理</Link></li>
            <li><Link to='/kfcorder'>订单管理</Link></li>
            <li><Link to='/kfcorderline'>订单列表</Link></li>
            <li><Link to='/kfccategory'>种类管理</Link></li>

         </ul>
         <div className="content-right">
            <Switch>
                <Route path='/kfcuser' component={KfcUser}/>
                <Route path='/kfcrole' component={KfcRole} />
                <Route path='/kfcuserrole' component={KfcUserRole} />
                <Route path='/kfcproduct' component={KfcProduct} />
                <Route path='/kfcorder' component={KfcOrder} />
                <Route path='/kfcorderline' component={KfcOrderLine} />
                <Route path='/kfccategory' component={KfcCategory} />

            </Switch>
         </div> 
      </BrowserRouter>
      </article>
    </div>
  );
}

export default App;
