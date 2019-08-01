import React from 'react'

import $ from 'jquery'
class KfcRole extends React.Component{

    constructor(){
        super();
        this.state={
            roles:[],
            form:{
                name:""
            }
        }
    }
    loadKfcRole(){
        let url = "http://localhost:8888/Kfc_role/findAll"
        $.get(url,({status,message,data})=>{
            if(status===200){
                this.setState({
                    roles:data,
                })
            }else{
                alert(message);
            }
        });
    }
    //网络初始化
    componentWillMount(){
        this.loadKfcRole();
    }

    deleteKfcRoleHandler(id){
        this.delKfcRoleById(id,({status,message})=>{
            if(status===200){
                alert(message);
                this.loadKfcRole();
            }else{
                alert(message);
 
            }
        })
     }
     //ajax操作，通过id删除学生
     delKfcRoleById(id,handler){
         let url="http://localhost:8888/Kfc_role/deleteById?id="+id;
         $.get(url,function(result){
             handler(result);
         })
     }

    //将input上的状态映射到组件state中
    changeHandler = (event)=>{
        let name = event.target.name;
        let val = event.target.value;
        this.setState({
            form:{...this.state.form,...{[name]:val}}
        })
    }

    submitForm = (event)=>{
        //1.获取表单数据
        alert(JSON.stringify(this.state.form));
        //2.调用后台代码完成保存
        let url="http://localhost:8888/Kfc_role/saveorUpdate";
        $.post(url,this.state.form,({status,message})=>{
            alert(message);
            
        })
        event.preventDefault();
    }

    render(){
        let {roles,name} = this.state;
        return (
            <div className="kfcrole">
                <h2>KFC角色管理页面</h2>
                {/* 表单 */}
                {JSON.stringify(this.state)};
                <form onSubmit={this.submitForm}>
                    角色名称 <input type="text" name="name" value={name}
                    onChange={this.changeHandler} />
                    <input type="submit" value="提交" />
                </form>
                {/* 角色列表 */}
                <table className="tbl">
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>角色名称</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           roles.map((item)=>{
                              return (
                                <tr key={item.id}>
                                    <td><input type='checkbox' /></td>
                                    <td>{item.name}</td>
                                    <td>
                                        <span onClick={this.deleteKfcRoleHandler.bind(this,item.id)}>删除</span>
                                        <span>修改</span>
                                    </td>
                                </tr>
                              );
                           })
                       }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default KfcRole;