import React from 'react'
import {Button,Table} from 'antd'
import $ from 'jquery'
class CategoryDetails extends React.Component{

    constructor(props){
        super(props);
            this.state = {
                visible:false,
                list:[],
        }
        console.log(this.props);

    }
    goBack(){
        this.props.history.goBack();
    }
    render(){
        let dingdan = this.props.location.state;
        let arr = [dingdan];
        const columns = [
            { title: 'id',dataIndex: 'Id'},
            { title: '产品信息id',dataIndex: 'productMessageId'},
            { title: '订单名称',dataIndex: 'name'},
            { title: '订单数量',dataIndex: 'number'},
            { title: '订单单价',dataIndex: 'price'},
            { title: '客户地址',dataIndex: 'address'},
        ]
        return (
            <div className="dingdan_details">
                <h3> 物流广告语：一路风尘，只为您的微笑</h3>
                <h2>{this.props.location.state.name}的详细信息</h2>
                <Table rowKey="id" size="small" 
                       columns={columns} 
                       dataSource={arr} 
                      />
               
                <Button type="link" onClick={this.goBack.bind(this)}>返回</Button> <br />
                <img src={dingdan.photo} style={{width:"80%",border:"1px solid #ededed",padding:"1em"}}/>
            </div>
        )
    }
}
export default CategoryDetails;