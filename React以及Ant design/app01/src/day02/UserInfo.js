import React from 'react';

function UserInfo(props){
    let {user} = props;
    if(user){
        return (
            <div className="userinfo">
                <div>
                    欢迎您,{user.name}
                </div>
            </div>
            )
    }return(
        <div>
        <a href="#">请登录</a>
        <a href="#">没有账号？请登录</a>
    </div>
    ) 
}
export default UserInfo;