import React from 'react'

import $ from 'jquery'
class KfcUSer extends React.Component{

    constructor(){
        super();
        this.state={
            users:[],
            form:{
                name:"",
                telephone:"",
                password:"",
                photo:""
            }
        }
    }
    loadKfcUser(){
        let url = "http://localhost:8888/test/findAll"
        $.get(url,({status,message,data})=>{
            if(status===200){
                this.setState({
                    users:data
                })
            }else{
                alert(message);
            }
        });
    }
    //网络初始化
    componentWillMount(){
        this.loadKfcUser();
    }

    deleteKfcUserHandler(id){
        this.delKfcUserById(id,({status,message})=>{
            if(status===200){
                alert(message);
                this.loadKfcUser();
            }else{
                alert(message);
 
            }
        })
     }
     //ajax操作，通过id删除学生
     delKfcUserById(id){
         let url="http://localhost:8888/test/deleteById?id="+id;
         $.get(url,({status,message})=>{
               if(status ===200){
                   this.loadKfcUser();

               }else {
                   alert(message);
                }
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
        let url="http://localhost:8888/test/saveorUpdate";
        $.post(url,this.state.form,({status,message})=>{
            alert(message);
            this.loadKfcUser();
        })
        event.preventDefault();
    }

    render()
    {
        let {users,name,telephone,password,photo} = this.state;
        return (
            <div className="kfcuser">
                <h2>KFC客户管理页面</h2>
                {/* 表单 */}
                {JSON.stringify(this.state)};
                <form onSubmit={this.submitForm}>
                    客户名 <input type="text" name="name" value={name}
                    onChange={this.changeHandler} />
                    电话 <input type="text" name="telephone" value={telephone}
                    onChange={this.changeHandler} />
                    密码 <input type="text" name="password" value={password}
                    onChange={this.changeHandler} />
                    住址 <input type="text" name="photo" value={photo}
                    onChange={this.changeHandler} />
                    <input type="submit" value="提交" />
                </form>
                {/* 角色列表 */}
                <table className="tbl">
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>客户名</th>
                            <th>电话</th>
                            <th>密码</th>
                            <th>住址</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           users.map((item)=>{
                              return (
                                <tr key={item.id}>
                                    <td><input type='checkbox' /></td>
                                    <td>{item.name}</td>
                                    <td>{item.telephone}</td>
                                    <td>{item.password}</td>
                                    <td>{item.photo}</td>
                                    <td>
                                        <span onClick={this.delKfcUserById.bind(this,item.id)}>删除</span>
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

export default KfcUSer;