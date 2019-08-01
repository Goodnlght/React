import React from 'react'

import $ from 'jquery'
class KfcOrderLine extends React.Component{

    constructor(){
        super();
        this.state={
            orderlines:[],
            orders:[],
            products:[],
            form:{
                num:"",
                orderId:"",
                productId:""
        }
    }
}
    loadOrderLine(){
        let url = "http://localhost:8888/Kfc_order_line/findAll"
        $.get(url,({status,message,data})=>{
            if(status===200){
                this.setState({
                    orderlines:data,
                })
            }else{
                alert(message);
            }
        });
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
    loadProduct(){
        let url = "http://localhost:8888/Kfc_product/findAll"
        $.get(url,({status,message,data})=>{
            if(status===200){
                this.setState({
                    products:data,
                })
            }else{
                alert(message);
            }
        });
    }
    //网络初始化
    componentWillMount(){
        this.loadOrderLine();
        this.loadOrder();
        this.loadProduct();
    }

    deleteKfcOrderLineHandler(id){
        this.delKfcOrderLineById(id,({status,message})=>{
            if(status===200){
                alert(message);
                this.loadOrderLine();
            }else{
                alert(message);
 
            }
        })
     }
     //ajax操作，通过id删除
     delKfcOrderLineById(id,handler){
         let url="http://localhost:8888/Kfc_order_line/deleteById?id="+id;
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
        let url="http://localhost:8888/Kfc_order_line/saveOrUpdate";
        $.post(url,this.state.form,({status,message})=>{
            alert(message);
            this.loadOrderLine();
        })
        event.preventDefault();
    }

    render(){
        let {orderlines,orders,products,num,orderId,productId,form} = this.state;
        return (
            <div className="kfcorderline">
                <h2>KFC在线订单管理页面</h2>
                {/* 表单 */}
                {JSON.stringify(this.state)};
                <form onSubmit={this.submitForm}>
                    订单数量 <input type="text" name="num" value={num}
                    onChange={this.changeHandler} />
                    订单id <select name="orderId" value={form.orderId} 
                     onChange={this.changeHandler}>
                        {
                            orders.map((item)=>{
                                return <option key={item.id} 
                                value={item.id}>{item.id}</option>
                            })
                        }
                     </select>
                    产品id <select name="productId" value={form.productId} 
                     onChange={this.changeHandler}>
                        {
                            products.map((item)=>{
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
                            <th>订单数量</th>
                            <th>订单id</th>
                            <th>产品id</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           orderlines.map((item)=>{
                              return (
                                <tr key={item.id}>
                                    <td><input type='checkbox' /></td>
                                    <td>{item.num}</td>
                                    <td>{item.orderId}</td>
                                    <td>{item.productId}</td>
                                    <td>
                                        <span onClick={this.deleteKfcOrderLineHandler.bind(this,item.id)}>删除</span>
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
export default KfcOrderLine;