import React from 'react'
import {Form,Input,Radio,Upload,Icon,Button,message} from 'antd'

class LiuYanForm extends React.Component {


  render(){

    const props = {
      name: 'file',
      action: 'http://http://134.175.154.93:8099/manager/file/upload',
      headers: {
        authorization: 'authorization-text',
      },
      onChange:(info)=> {
        if (info.file.status !== 'uploading') {
          let response = info.file.response.data;
          let url = "http://134.175.154.93:8888/"+response.groupname+"/"+response.id;
          alert(url);
          //将url设置到表单中
          this.props.form.setFieldValue({
            photo:url
          })
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    //双向数据绑定
    const { getFieldDecorator } = this.props.form;
    getFieldDecorator("id");
    getFieldDecorator("type");
    getFieldDecorator("status");
    return (
      <div className="liuyan_form">
      <Form className="login-form">
      <Form.Item label="用户名">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username !' }],
          })(
            <Input placeholder="username" />,
          )}
       </Form.Item>
       <Form.Item label="留言题目">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input your title !' }],
          })(
            <Input placeholder="title" />,
          )}
       </Form.Item>
       <Form.Item label="留言内容">
          {getFieldDecorator('quality', {
            rules: [{ required: true, message: 'Please input your quality !' }],
          })(
            <Input placeholder="quality" />,
          )}
       </Form.Item>
        <Form.Item label="头像">
            <Upload {...props}>
               <Button>
                  <Icon type="upload" /> Click to Upload
               </Button>
            </Upload>,
        </Form.Item>
      </Form>
      </div>
    )
  }
}
// 将通过props从父组件中获取的值拿出来设置到表单元素上
const mapPropsToFields = (props)=>{
  let obj = {};
  for(let key in props.initData){
    let val = props.initData[key];
    obj[key] = Form.createFormField({value:val})
  }
  return obj;
}

export default Form.create({
  mapPropsToFields
})(LiuYanForm);