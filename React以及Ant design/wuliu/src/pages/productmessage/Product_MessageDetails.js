import React from 'react'
import {Button,Table} from 'antd'
class Product_MessageDetails extends React.Component{

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
        let productmessage = this.props.location.state;
        let arr = [productmessage];
        const columns = [
            { title: '产品名称',dataIndex: 'name'},
            { title: '产品质量',dataIndex: 'quality'},
            { title: '产品价格',dataIndex: 'price'},
            { title: '产品数量',dataIndex: 'number'},
            { title: '产品类型',dataIndex: 'type'},
        ]
        return (
            <div className="product_message_details">
                <h3> 物流广告语：一路风尘，只为您的微笑</h3>
                <h2>{this.props.location.state.name}的详细信息</h2>
                <Table rowKey="id" size="small" 
                       columns={columns} 
                       dataSource={arr} 
                      />
                <Button type="link" onClick={this.goBack.bind(this)}>返回</Button> <br />
                <img src={productmessage.photo} style={{width:"80%",border:"1px solid #ededed",padding:"1em"}}/>
            </div>
        )
    }
}
export default Product_MessageDetails;