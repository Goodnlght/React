import React from 'react';
import $ from 'jquery';

function MyUl(props){
    //props用于获取父组件在调用当前组件时传递的参数
        let {data,a} = props;
        return (
            <div className="myul">
            <ul >
                {
                    data.map(item=><li key={item.id}>
                    <span>{item.id}</span>
                    <span>{item.name}</span>
                    <span>{item.username}</span>
                    </li>)
                }
            </ul>
            </div>
        );
}

export default  MyUl;