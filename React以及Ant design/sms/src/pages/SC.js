import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'antd'
import store from '../store'
import teacherReducer from '../store/teacherReducer';
class SC extends React.Component{
    
//添加教师
    addHandler(){
        let action = {type:'GET_TEACHER'}
        store.dispatch(action);
    }
    render(){
        let {teacherState} = this.props;
        // alert(JSON.stringify(this.props))
        return (
            <div className="sc">
                <h2>选课管理</h2>
                <div>
                    <Button onClick={this.addHandler.bind(this)}>添加</Button>
                </div>
                <ul>
                    
                    {teacherState.list.map((item,index)=>{
                        return <li key={index}>{item.name}</li>
                    })}
                </ul>
            </div>
        )
    }
}
export default connect(state=>state)(SC);