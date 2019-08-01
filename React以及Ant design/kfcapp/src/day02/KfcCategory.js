import React from 'react'

import $ from 'jquery'
class KfcCategory extends React.Component{

    constructor(){
        super();
        this.state={
            categorys:[],
            form:{
                name:"",
                icon:"",
        }
    }
}
    loadCategory(){
        let url = "http://localhost:8888/Kfc_category/findAll"
        $.get(url,({status,message,data})=>{
            if(status===200){
                this.setState({
                    categorys:data,
                })
            }else{
                alert(message);
            }
        });
    }
    //网络初始化
    componentWillMount(){
        this.loadCategory();
    }

    deleteKfcCategoryHandler(id){
        this.delKfcCategoryById(id,({status,message})=>{
            if(status===200){
                alert(message);
                this.loadCategory();
            }else{
                alert(message);
 
            }
        })
     }
     //ajax操作，通过id删除
     delKfcCategoryById(id,handler){
         let url="http://localhost:8888/Kfc_category/deleteById?id="+id;
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
        let url="http://localhost:8888/Kfc_category/saveOrUpdate";
        $.post(url,this.state.form,({status,message})=>{
            alert(message);
            this.loadCategory();
        })
        event.preventDefault();
    }

    render(){
        let {categorys,name,icon} = this.state;
        return (
            <div className="kfccategory">
                <h2>KFC种类管理页面</h2>
                {/* 表单 */}
                {JSON.stringify(this.state)};
                <form onSubmit={this.submitForm}>
                    种类名称 <input type="text" name="name" value={name}
                    onChange={this.changeHandler} />
                    种类图像 <input type="text" name="icon" value={icon}
                    onChange={this.changeHandler} />
                    <input type="submit" value="提交" />
                </form>
                {/* 角色列表 */}
                <table className="tbl">
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>种类名称</th>
                            <th>种类图像</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           categorys.map((item)=>{
                              return (
                                <tr key={item.id}>
                                    <td><input type='checkbox' /></td>
                                    <td>{item.name}</td>
                                    <td>{item.icon}</td>
                                    <td>
                                        <span onClick={this.delKfcCategoryById.bind(this,item.id)}>删除</span>
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
export default KfcCategory;