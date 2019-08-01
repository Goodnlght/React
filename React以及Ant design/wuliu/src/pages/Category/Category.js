import React from 'react'
import $ from 'jquery'
import {Button,Table,Icon,Modal,message} from 'antd'
import {Link} from 'react-router-dom'
import CategoryForm from './CategoryForm';

class Category extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            visible:false,
            list:[],
            ids:[],
            category:{}
        }
    }
    
    componentDidMount(){
        this.loadCategory();
    }
    //加载学生信息
    loadCategory(){
        this.setState({
            loading:true
        })
        let url="http://localhost:8888/category/findAll";
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
    //通过id删除学生信息
    deleteCategory(id){

    }
    
    toDetails(record){
        this.props.history.push({
            pathname:'/categoryDetails',
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
               let url = "http://localhost:8888/category/batchDelete";
               $.ajax({
                   url,
                   method:"POST",
                   data:JSON.stringify(this.state.ids),              
                   contentType:"application/json",
                   success:({status,messsage:msg})=>{
                    if(status===200){
                        message.success(msg);
                        this.loadCategory();
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
               let url = "http://localhost:8888/category/deleteById?id="+id;
               $.get(url,({status,message:msg})=>{
                   if(status===200){
                       message.success(msg);
                       this.loadCategory();
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
            category:{}
          });
    }
    //点击修改按钮的执行函数
    toEdit(record){
        this.setState({
            visible: true,
            category:record
          });
    }
    //点击模态框的确认按钮
      handleOk = e => {
        //1.获取表单数据
        e.preventDefault();
        this.form.validateFields((err,values)=>{
            if(!err){
                let url="http://localhost:8888/category/saveOrUpdate";
                $.post(url,values,({status,message})=>{
                    if(status === 200){
                        message.success(message);
                        //关闭弹出框
                        this.setState({visible: false,});
                        //页面刷新
                        this.loadCategory();
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
    CategoryFormRefs =(form)=>{
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
            { title: '货物类型',dataIndex: 'type'},
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
                <h2>种类管理</h2>
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
                       pagination={pagination}/>
                {/* 模态框 */}
                <Modal
                    title="货物类型"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <CategoryForm 
                    initData={this.state.category} ref={this.CategoryFormRefs} />
                 </Modal>
            </div>
        )
    }
}
export default Category;