import React from 'react'
import $ from 'jquery'
import {Button,Table,Icon,Modal,message,ReactDOM,Pagination} from 'antd'
import {Link} from 'react-router-dom'
import UserForm from './UserForm';

class User extends React.Component{

    
    constructor(props){
        super(props);
        this.state={
            visible:false,
            list:[],
            ids:[],
            user:{},
            mountNode:this.props.current
            // num: 0,
            // pagenum:this.props.current
        }
    }
    
    componentDidMount(){
        this.loadUser();
    }
    //加载学生信息
    loadUser(){
        this.setState({
            loading:true
        })
        let url="http://localhost:8888/logistics/findAll";
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
    deleteUser(id){

    }
    
    toDetails(record){
        this.props.history.push({
            pathname:'/userDetails',
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
               let url = "http://localhost:8888/user/batchDelete";
               $.ajax({
                   url,
                   method:"POST",
                   data:JSON.stringify(this.state.ids),              
                   contentType:"application/json",
                   success:({status,messsage:msg})=>{
                    if(status===200){
                        message.success(msg);
                        this.loadUser();
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
               let url = "http://localhost:8888/logistics/findById?id="+id;
               $.get(url,({status,message:msg})=>{
                   if(status===200){
                       message.success(msg);
                       this.loadUser();
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
            user:{}
          });
    }
    //点击修改按钮的执行函数
    toEdit(record){
        this.setState({
            visible: true,
            user:record
          });
    }
    //点击模态框的确认按钮
      handleOk = e => {
        //1.获取表单数据
        e.preventDefault();
        this.form.validateFields((err,values)=>{
            if(!err){
                let url="http://localhost:8888/logistics/saveOrUpdate";
                $.post(url,values,({status,message})=>{
                    if(status === 200){
                        message.success(message);
                        //关闭弹出框
                        this.setState({visible: false,});
                        //页面刷新
                        this.loadUser();
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
   UserFormRefs =(form)=>{
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
            { title: '用户名',dataIndex: 'username'},
            { title: '密码',dataIndex: 'password'},
            { title: '电子邮箱',dataIndex: 'eMail'},
            { title: '姓名',dataIndex: 'realname'},
            { title: '性别',dataIndex: 'gender'},
            { title: '年龄',dataIndex: 'age'},
            { title: '电话',dataIndex: 'telephone'},
            { title: '地址',dataIndex: 'address'},
            { 
                title: '操作',
                width:100,
                align:'center',
                render:(val,record,mountNode)=>{
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
                <h2>用户管理</h2>
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
                    title="用户信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <UserForm 
                    initData={this.state.user} ref={this.UserFormRefs} />
                 </Modal>
                 
            </div>
        )
    }
}

export default User;