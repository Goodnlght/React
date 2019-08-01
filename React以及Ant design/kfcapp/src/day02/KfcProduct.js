import React from 'react'

import $ from 'jquery'
class KfcProduct extends React.Component{

    constructor(){
        super();
        this.state={
            products:[],
            categorys:[],
            form:{
                name:"",
                description:"",
                price:"",
                photo:"",
                status:"",
                xiaoliang:"",
                categoryId:""
            }
        }
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
        this.loadProduct();
        this.loadCategory();
    }

    deleteKfcProductHandler(id){
        this.delKfcProductById(id,({status,message})=>{
            if(status===200){
                alert(message);
                this.loadProduct();
            }else{
                alert(message);
 
            }
        })
     }
     //ajax操作，通过id删除
     delKfcProductById(id,handler){
         let url="http://localhost:8888/Kfc_product/deleteById?id="+id;
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
        let url="http://localhost:8888/Kfc_product/saveOrUpdate";
        $.post(url,this.state.form,({status,message})=>{
            alert(message);
            this.loadProduct();
        })
        event.preventDefault();
    }

    render(){
        let {products,categorys,name,description,price,photo,status,xiaoliang,categoryId,form} = this.state;
        return (
            <div className="kfcproduct">
                <h2>KFC产品管理页面</h2>
                {/* 表单 */}
                {JSON.stringify(this.state)};
                <form onSubmit={this.submitForm}>
                    产品名称 <input type="text" name="name" value={name}
                    onChange={this.changeHandler} />
                    产品描述 <input type="text" name="description" value={description}
                    onChange={this.changeHandler} />
                    产品价格 <input type="text" name="price" value={price}
                    onChange={this.changeHandler} />
                    产品位置 <input type="text" name="photo" value={photo}
                    onChange={this.changeHandler} />
                    产品状态 <input type="text" name="status" value={status}
                    onChange={this.changeHandler} />
                    产品销量 <input type="text" name="xiaoliang" value={xiaoliang}
                    onChange={this.changeHandler} />
                    种类id <select name="categoryId" value={form.categoryId} 
                     onChange={this.changeHandler}>
                        {
                            categorys.map((item)=>{
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
                            <th>产品名称</th>
                            <th>产品描述</th>
                            <th>产品价格</th>
                            <th>产品位置</th>
                            <th>产品状态</th>
                            <th>产品销量</th>
                            <th>种类id</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           products.map((item)=>{
                              return (
                                <tr key={item.id}>
                                    <td><input type='checkbox' /></td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>{item.photo}</td>
                                    <td>{item.status}</td>
                                    <td>{item.xiaoliang}</td>
                                    <td>{item.categoryId}</td>
                                    <td>
                                        <span onClick={this.deleteKfcProductHandler.bind(this,item.id)}>删除</span>
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
export default KfcProduct;