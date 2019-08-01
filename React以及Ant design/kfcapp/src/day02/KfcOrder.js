import React from 'react'

import $ from 'jquery'
class KfcOrder extends React.Component{

    constructor(){
        super();
        this.state={
            orders:[],
            users:[],
            form:{
                orderTime:"",
                status:"",
                userId:""
        }
    }
}
    loadOrder(){
        let url = "http://localhost:8888/Kfc_order/findAll"
        $.get(url,({status,message,data})=>{
            if(status===200){
                this.setState({
                    orders:data,
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
    //网络初始化
    componentWillMount(){
        this.loadOrder();
        this.loadUser();
    }

    deleteKfcOrderHandler(id){
        this.delKfcOrderById(id,({status,message})=>{
            if(status===200){
                alert(message);
                this.loadOrder();
            }else{
                alert(message);
 
            }
        })
     }
     //ajax操作，通过id删除
     delKfcOrderById(id){
         let url="http://localhost:8888/Kfc_order/deleteById?id="+id;
         $.get(url,(status,message)=>{
             if(status===200){
                alert(message);
                // this.loadOrder();
             }else{
                 alert(message);
                 this.loadOrder();
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
        let url="http://localhost:8888/Kfc_order/saveOrUpdate";
        $.post(url,this.state.form,({status,message})=>{
            alert(message);
            this.loadOrder();
        })
        event.preventDefault();
    }

    render(){
        let {orders,users,orderTime,status,userId,form} = this.state;
        return (
            <div className="kfcorder">
                <h2>KFC订单管理页面</h2>
                {/* 表单 */}
                {JSON.stringify(this.state)};
                <form onSubmit={this.submitForm}>
                    订单时间 <input type="text" name="orderTime" value={orderTime}
                    onChange={this.changeHandler} />
                    订单状态 <input type="text" name="status" value={status}
                    onChange={this.changeHandler} />
                    客户id <select name="userId" value={form.userId} 
                     onChange={this.changeHandler}>
                        {
                            users.map((item)=>{
                                return <option key={item.id} 
                                value={item.id}>{item.name}</option>
                            })
                        }
                     </select>
                    <input type="submit" value="提交" />
                </form>
                {/* 角色列表 */}
                <table className="tbl">
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>订单时间</th>
                            <th>订单状态</th>
                            <th>客户id</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           orders.map((item)=>{
                              return (
                                <tr key={item.id}>
                                    <td><input type='checkbox' /></td>
                                    <td>{item.orderTime}</td>
                                    <td>{item.status}</td>
                                    <td>{item.userId}</td>
                                    <td>
                                        <span onClick={this.delKfcOrderById.bind(this,item.id)}>删除</span>
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
export default KfcOrder;