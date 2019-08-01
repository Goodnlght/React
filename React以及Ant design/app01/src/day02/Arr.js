import React from 'react';

class Arr extends React.Component{
    //重写构造函数的时候要显示调用super
    constructor(props){
        super(props);
        //初始化state
        this.state = {
           now:Math.random()*100
        }
        //每隔1秒钟改变state
        setInterval(() => {
            this.setState({
                now:Math.random()*100
            })
        },1000);
    }
    render(){
        let arr1 = [1,2,3,4];
        return (
            <div>当前数组:{this.setState}</div>
        )
    }
}
export default Arr;