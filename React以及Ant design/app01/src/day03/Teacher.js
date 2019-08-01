//学生管理页面
import React from 'react';
import $ from 'jquery';
// import './Student.css'
class Teacher extends React.Component{

    constructor(props){
        super(props);
            this.state = {
                teas:[],
                form:{
                    username:'',
                    realname:''
                }
            }
        }
        //当用户操作表单项改变表单项内容的时候激发，获取表单项内容，改变到state中
        changeHandler = (event)=>{

            let tagName = event.target.name;
            let tagVal = event.target.value;
            this.setState({
               
                form:{...this.state.form,...{[tagName]:tagVal}}
            })

        }
        componentWillMount(){
            this.loadTeacher();
        }
        delTeacherHandler(id){
            this.delTeacherById(id,({status,message})=>{
                if(status === 200){
                    alert(message);
                    this.loadTeacher();
                }else{
                    alert(message); 
                }
            })
        }
        //ajax操作，通过id删除学生信息
        delTeacherById(id,handler){
            let url = "http://localhost:8888/teacher/deleteById?id="+id;
            $.get(url,function(result){
                handler(result);
            })
        }
        //ajax操作，加载学生信息
        loadTeacher(){
            //查询所有学生信息，将学生信息保存到state中
            let url = "http://localhost:8888/teacher/findAll";
            $.get(url,({status,data})=>{
              if(status === 200){
                    this.setState({
                        teas:data
                    })
              }else{
                  alert("接口访问异常");
              }
            });
        }
        //提交
        submitForm = (event)=>{
            //1.获取表单事件
        alert(JSON.stringify(this.state.form));
        //2.调用后台代码完成保存
        let url = "http://localhost:8888/teacher/saveOrUpdate";
        $.post(url,this.state.form,({status,message})=>{
            if(status===200){
                alert(message);
                this.loadTeacher();
            }
        })
            event.preventDefault();
        }
    render(){
        let name ="学生管理页面";
        let {teas,username,realname,form} = this.state;
        return (
            
            <div className="student">
               <h2>{name}</h2>
               {/* <Clock /> */}
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
                           teas.map((item)=>{
                               return (
                                <tr key={item.id}>
                                <td><input type='checkbox'/></td>
                                <td>{item.username}</td>
                                <td>{item.realname}</td>
                                <td>{item.gender}</td>
                                <td>
                                    <span onClick={this.delTeacherHandler.bind
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
export default Teacher;