import React from 'react'
import {Button,Table} from 'antd'
class AddressDetails extends React.Component{

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
        let address = this.props.location.state;
        let arr = [address];
        const columns = [
            { title: '收货地址',dataIndex: 'address'},
        ]
        return (
            <div className="address_details">
                <h3> 物流广告语：一路风尘，只为您的微笑</h3>
                <h2>{this.props.location.state.address}的详细信息</h2>
                <Table rowKey="id" size="small" 
                       columns={columns} 
                       dataSource={arr} 
                      />
                <Button type="link" onClick={this.goBack.bind(this)}>返回</Button> <br />
                <img src={address.photo} style={{width:"80%",border:"1px solid #ededed",padding:"1em"}}/>
            </div>
        )
    }
}
export default AddressDetails;