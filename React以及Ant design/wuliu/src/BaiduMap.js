import React from 'react'

class BaiduMap extends React.Component{
   
	componentDidMount () {
		const {BMap,BMAP_STATUS_SUCCESS,BMAP_ANCHOR_TOP_LEFT}=window;
		 var map = new BMap.Map("allmap");
		 var point = new BMap.Point(116.404, 39.915);
		 map.centerAndZoom(point, 14);
		 map.enableScrollWheelZoom();
		 map.enableInertialDragging();
		 map.enableContinuousZoom();
		 var size = new BMap.Size(10, 20);
		 map.addControl(new BMap.CityListControl({
			 anchor: BMAP_ANCHOR_TOP_LEFT,
			 offset: size,
		 }));
		 var geolocation = new BMap.Geolocation();
		 geolocation.getCurrentPosition(function(r){
			 if(this.getStatus() == BMAP_STATUS_SUCCESS){
				 var mk = new BMap.Marker(r.point);
				 map.addOverlay(mk);
				 map.panTo(r.point);
				 alert('您的位置：'+r.point.lng+','+r.point.lat);
			 }
			 else {
				 alert('failed'+this.getStatus());
			 }        
		 },{enableHighAccuracy: true})
	 }
	 render(){
		 return (
			 <div>
			 <div  id='allmap' style={{
				 width:'100vw',
				 height:'100vh'
			   }}></div></div>
		 )
	 }
	}
export default BaiduMap;
