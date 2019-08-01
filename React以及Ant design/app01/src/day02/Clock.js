import React from 'react';
import Render from './Render';
class Clock extends React.Component{

    //重写构造函数的时候要显示调用super
    constructor(props){
        super(props);
        //初始化state
        this.state = {
           now:new Date().toLocaleString()
        }
        //每隔1秒钟改变state
        setInterval(() => {
            this.setState({
                now:new Date().toLocaleString()
            })
        },1000);
    }
    render(){
        let {now} = this.state;
        return (
            <div>当前时间:{now}</div>
        )
    }
}
export default Clock;