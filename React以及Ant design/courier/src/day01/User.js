import React from 'react'

class User extends React.Component{

    constructor(props){
        super(props);
            this.state = {
                stus:[],
                form:{
                    username:'',
                    realname:''
                } 
            }
        }


    render(){
        let name ="客户管理页面";
        let {stus,username,realname,form} = this.state;
        return (
            
            <div className="student">
               <h2>{name}</h2>
               ---{JSON.stringify(this.state)}
               {/*  */}
               <form onSubmit={this.submitForm}> 
                   用户名 <input type='text' name="username" value={form.username}
                   onChange={this.changeHandler}/>
                   姓名 <input type='text' name="realname" value={form.realname}
                    onChange={this.changeHandler}/>
                   性别 <input type='text' name="gender" value={form.gender}
                    onChange={this.changeHandler}/>
                    <input type="submit" value="提交"/>
               </form>
               <table className="tbl">  
                   <thead>
                       <tr>
                           <th>编号</th>
                           <th>用户名</th>
                           <th>姓名</th>
                           <th>性别</th>
                           <th>操作</th>
                       </tr>
                   </thead>
                   <tbody>
                       {
                           stus.map((item)=>{
                               return (
                                <tr key={item.id}>
                                <td><input type='checkbox'/></td>
                                <td>{item.username}</td>
                                <td>{item.realname}</td>
                                <td>{item.gender}</td>
                                <td>
                                    <span onClick={this.delStudentHandler.bind
                                        (this,item.id)}>删除</span>
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
export default User;