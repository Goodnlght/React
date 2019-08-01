import React from 'react'
import $ from 'jquery'
import {Button,Table,Icon,Modal,message} from 'antd'
import {Link} from 'react-router-dom'
import Product_MessageForm from './Product_MessageForm';

class Product_Message extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            visible:false,
            list:[],
            ids:[],
            productmessage:{},
            
        }
    }
    
    componentDidMount(){
        this.loadProduct_Message();
    }
    //加载信息
    loadProduct_Message(){
        this.setState({
            loading:true
        })
        let url="http://localhost:8888/product_message/findAll";
        $.get(url,({status,message,data})=>{
            if(status===200){
                this.setState({
                    list:data,
                    loading:false
                })
            }else{
                message.error(message);
            }
        })
    }
    //通过id删除信息
    deleteProduct_Message(id){

    }
    
    toDetails(record){
        this.props.history.push({
            pathname:'/product_MessageDetails',
            state:record,
            patload:{name:'terry'}
        });
     }
//批量删除(出错)
    batchDelete(){
        Modal.confirm({
            title: '是否确认删除？',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk:()=>{
                //编写代码进行删除
               let url = "http://localhost:8888/product_message/batchDelete";
               $.ajax({
                   url,
                   method:"POST",
                   data:JSON.stringify(this.state.ids),              
                   contentType:"application/json",
                   success:({status,messsage:msg})=>{
                    if(status===200){
                        message.success(msg);
                        this.loadProduct_Message();
                    }else{
                        message.error(msg);
                    }
                   }
               })
               
            },
            onCancel() {
              console.log('Cancel');
            },
          });

    }

     toDelete=(id)=> {
        //  let vm = this;
        Modal.confirm({
            title: '是否确认删除？',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk:()=>{
                //编写代码进行删除
               let url = "http://localhost:8888/product_message/deleteById?id="+id;
               $.get(url,({status,message:msg})=>{
                   if(status===200){
                       message.success(msg);
                       this.loadProduct_Message();
                   }else{
                       message.error(msg);
                   }
               })
               
            },
            onCancel() {
              console.log('Cancel');
            },
          });
      }  
    //添加回调
    //点击添加按钮的执行函数
    toAdd(){
        this.setState({
            visible: true,
            productmessage:{}
          });
    }
    //点击修改按钮的执行函数
    toEdit(record){
        this.setState({
            visible: true,
            productmessage:record
          });
    }
    //点击模态框的确认按钮
      handleOk = e => {
        //1.获取表单数据
        e.preventDefault();
        this.form.validateFields((err,values)=>{
            if(!err){
                let url="http://localhost:8888/product_message/saveOrUpdate";
                $.post(url,values,({status,message})=>{
                    if(status === 200){
                        message.success(message);
                        //关闭弹出框
                        this.setState({visible: false,});
                        //页面刷新
                        this.loadProduct_Message();
                    }else{
                        message.error(message);
                    }
                })
              }
            });
        //2.与后台交互完成保存或更新
        //3.关闭模态框，刷新页面
        this.setState({
          visible: false,
        });
      };
      handleSubmit = e =>{

      };
    //点击模态框的取消按钮
      handleCancel = e => {
        this.setState({
          visible: false,
        });
      };

    //ref函数
    Product_MessageFormRefs =(form)=>{
        this.form = form;
    }
    
    //渲染
    render(){

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({
                  ids:selectedRowKeys
              })
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
        };

          const columns = [
            { title: '产品名称',dataIndex: 'name'},
            { title: '产品质量',dataIndex: 'quality'},
            { title: '产品价格',dataIndex: 'price'},
            { title: '产品数量',dataIndex: 'number'},
            { title: '产品类型',dataIndex: 'type'},
            { 
                title: '操作',
                width:100,
                align:'center',
                render:(val,record)=>{
                    return(
                        <div>
                            <Icon type="delete"
                            onClick={this.toDelete.bind(this,record.id)} />&nbsp;
                            <Icon type="edit" onClick={this.toEdit.bind(this,record)} />&nbsp;
                            <Icon type="eye" onClick={this.toDetails.bind(this,record)}/>
                        </div>
                    )
                }

            },
          ];

          let pagination ={
            //分页位置
          position:'bottom',
          pageSize:3,
          defaultCurrent:1,
      }
        return (
            <div>
                <h2>产品管理</h2>
                <div className="btns">
                    <Button onClick={this.toAdd.bind(this)}>
                        添加</Button> &nbsp;
                    <Button type="danger" onClick={this.batchDelete.bind(this)}>
                        批量删除</Button>&nbsp;
                    <Button type="link">导出</Button>
                </div>
                {/* 表格 */}
                <Table rowKey="id" size="small" rowSelection={rowSelection} 
                       columns={columns} 
                       dataSource={this.state.list} 
                       loading={this.state.loading}
                       pagination={pagination}
                      />
                {/* 模态框 */}
                <Modal
                    title="产品信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <Product_MessageForm 
                    initData={this.state.productmessage} ref={this.Product_MessageFormRefs} />
                 </Modal>
            </div>
        )
    }
}
export default Product_Message;