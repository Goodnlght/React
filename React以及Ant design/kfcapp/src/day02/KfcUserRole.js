import React from 'react'

import $ from 'jquery'
class KfcUSerRole extends React.Component{

    constructor(){
        super();
        this.state={
            userroles:[],
            users:[],
            roles:[],
            form:{
                userId:"",
                roleId:""
            }
        }
    }
    loadKfcUserRole(){
        let url = "http://localhost:8888/Kfc_user_role/findAll"
        $.get(url,({status,message,data})=>{
            if(status===200){
                this.setState({
                    userroles:data,
                })
            }else{
                alert(message);
            }
        });
    }
    loadUser(){
        let url = "http://localhost:8888/test/findAll"
        $.get(url,({status,message,data})=>{
            if(status===200){
                this.setState({
                    users:data,
                })
            }else{
                alert(message);
            }
        });
    }
    loadRole(){
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
        this.loadKfcUserRole();
        this.loadUser();
    }

    deleteKfcUserRoleHandler(id){
        this.delKfcUserRoleById(id,({status,message})=>{
            if(status===200){
                alert(message);
                this.loadKfcUserRole();
            }else{
                alert(message);
 
            }
        })
     }
     //ajax操作，通过id删除学生
     delKfcUserRoleById(id,handler){
         let url="http://localhost:8888/Kfc_user_role/deleteById?id="+id;
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
        let url="http://localhost:8888/Kfc_user_role/saveOrUpdate";
        $.post(url,this.state.form,({status,message})=>{
            alert(message);
            this.loadKfcUserRole();
        })
        event.preventDefault();
    }

    render(){
        let {userroles,users,roles,userId,roleId,form} = this.state;
        return (
            <div className="kfcuserrole">
                <h2>KFC客户角色管理页面</h2>
                {/* 表单 */}
                {JSON.stringify(this.state)};
                <form onSubmit={this.submitForm}>
                    客户id  <select name="userId" value={form.userId} 
                     onChange={this.changeHandler}>
                        {
                            users.map((item)=>{
                                return <option key={item.id} 
                                value={item.id}>{item.name}</option>
                            })
                        }
                     </select>
                    角色id <input type="text" name="roleId" value={roleId}
                    onChange={this.changeHandler} />
                    <input type="submit" value="提交" />
                </form>
                {/* 角色列表 */}
                <table className="tbl">
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>客户id</th>
                            <th>角色id</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           userroles.map((item)=>{
                              return (
                                <tr key={item.id}>
                                    <td><input type='checkbox' /></td>
                                    <td>{item.userId}</td>
                                    <td>{item.roleId}</td>
                                    <td>
                                        <span onClick={this.deleteKfcUserRoleHandler.bind(this,item.id)}>删除</span>
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
export default KfcUSerRole;