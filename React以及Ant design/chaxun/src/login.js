import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const Search = Input.Search;

class Login extends React.Component{
   
      render(){
          
       return (
           <div>
                <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                        <br />
                        <br />
                <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        onSearch={value => console.log(value)}
                />
           </div>
       )
    }
}
export default Login;