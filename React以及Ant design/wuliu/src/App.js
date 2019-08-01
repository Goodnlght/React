import React from 'react';
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom'

import './App.css';
import User from './pages/user/User'
import Product_Message from './pages/productmessage/Product_Message';
import LiuYan from './pages/liuyan/LiuYan';
import Company from './pages/company/Company';
import Category from './pages/Category/Category';
import Address from './pages/address/Address';
import Administrator from './pages/administrator/Administrator';
import CompanyDetails from './pages/company/CompanyDetails';
import AddressDetails from './pages/address/AddressDetails'
import CategoryDetails from './pages/Category/CategoryDetails'
import AdministratorDetails from './pages/administrator/AdministratorDetails'
import UserDetails from './pages/user/UserDetails'
import LiuYanDetails from './pages/liuyan/LiuYanDetails'
import Product_MessageDetails from './pages/productmessage/Product_MessageDetails'
import DingDan from './pages/DingDan/DingDan'
import DingDanDetails from './pages/DingDan/DingDanDetails'

function App() {
  let ss = window.localStorage.getItem("userName");
  return (
    <div className="App">
       <BrowserRouter>
            <div className="nav_left">
                 <div className="welcome">
                    欢迎您，{ss}
                 </div>
                <div className="title">
                    智慧查询-物流查询
                    
                </div>
                  <ul>
                    <li>
                      <Link to="/user">用户管理</Link>
                    </li>
                    <li>
                      <Link to="/product_message">商品管理</Link>
                    </li>
                    <li>
                      <Link to="/dingdan">订单管理</Link>
                    </li>
                    <li>
                      <Link to="/liuyan">留言管理</Link>
                    </li>
                    <li>
                      <Link to="/company">公司管理</Link>
                    </li>
                    <li>
                      <Link to="/category">种类管理</Link>
                    </li>
                    <li>
                      <Link to="/administrator">登录管理</Link>
                    </li>
                    <li>
                      <Link to="/address">地址管理</Link>
                    </li>
                  </ul>
            </div>
            <div className="content" >
                <Switch>
                  <Route path="/user" component={User} />
                  <Route path="/userdetails" component={UserDetails} />
                  <Route path="/product_message" component={Product_Message} />
                  <Route path="/product_messagedetails" component={Product_MessageDetails} />
                  <Route path="/dingdan" component={DingDan} />
                  <Route path="/dingdandetails" component={DingDanDetails} />
                  <Route path="/liuyan" component={LiuYan} />
                  <Route path="/liuyandetails" component={LiuYanDetails} />
                  <Route path="/company" component={Company} />
                  <Route path="/companydetails" component={CompanyDetails} />
                  <Route path="/category" component={Category} />
                  <Route path="/categorydetails" component={CategoryDetails} />
                  <Route path="/administrator" component={Administrator} />
                  <Route path="/administratordetails" component={AdministratorDetails} />
                  <Route path="/address" component={Address} />
                  <Route path="/addressdetails" component={AddressDetails} />
                </Switch>
            </div>
       </BrowserRouter>
    </div>
  );
}

export default App;
