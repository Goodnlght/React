//导入react作为所有代码api的一个支撑
import React from 'react';
//导入一个css
import './Hello.css';
import MyUl from './MyUl'
//定义一个函数，这个函数必须有个返回值为jsx
function Hello(){
    let data = [
        {id:1,name:'terry'},
        {id:2,name:'larry'},
        {id:3,name:'tom'}
               ];
	return (
       <div>
           <h1 className="title">你好  react</h1>
           <p>前端企业级框架</p>
           <MyUl data={data} a="aaa"/>
       </div>
	);
}
// 默认导出Hello函数
 export default Hello;