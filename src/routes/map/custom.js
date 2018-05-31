import React , { Component } from 'react';
import { Map,Marker } from 'react-amap';

import Routers from '../../components/router';
import { Button } from 'antd'

let map;
const ZoomCtrl = (props) => {
   map = props.__map__;
  if (!map) {
    console.log('组件必须作为 Map 的子组件使用');
    return;
  }
  const style = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: '#fff',
    padding: '10px'
  }
  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();
  const pingyi = () => map.panBy(50, 100);
  const zuobiao =()=> {
    map.on('click', function(e) {
        //document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
        alert(e.lnglat.getLng() + ',' + e.lnglat.getLat());
    });
  }

  created: (mapInstance) => {
    console.log('高德地图 Map 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：~~~~');
    console.log(mapInstance.getZoom());
    console.log(1);
    var driving = new AMap.Driving({
        map: map,
        panel: "panel"
    }); 
    
    // 根据起终点经纬度规划驾车导航路线
    driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281, 39.903719));
    console.log(1);
  }

  const daohang = () => {
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
      created:(mapInstance)=>{
            //构造路线导航类
            console.log("构造路线导航类");
            // var driving = new AMap.Driving({
            //     map: map,
            //     panel: "panel"
            // }); 
            // // 根据起终点经纬度规划驾车导航路线
            // driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281, 39.903719));
      }
  }

  return (<div style={style}>
    <Button onClick={zoomIn}>缩小</Button>
    <Button onClick={zoomOut}>放大</Button>
    <Button onClick={pingyi}>平移</Button>
    <Button onClick={zuobiao}>点击地图获取坐标</Button>
  </div>);
};




class App extends React.Component {
    constructor() {
      super();
      this.amapEvents = {
        created: (mapInstance) => {
          console.log('高德地图 Map 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
          console.log(mapInstance.getZoom());
        }
      };
      this.markerEvents = {
        created: (markerInstance) => {
        //   console.log('高德地图 Marker 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
        //   console.log(markerInstance.getPosition());
        //构造路线导航类
        var driving = new AMap.Driving({
            map: map,
            panel: "panel"
        }); 
        // 根据起终点经纬度规划驾车导航路线
        driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281, 39.903719));
        }
      }
      this.markerPosition = { longitude: 120, latitude: 30 };
    }
    onHandle = ()=>{
        created: (markerInstance) => {
            
        }
    }
    componentWillMount(){
      const { history } = this.props.history;
      console.log(history);
    }
    render() {
      return <div style={{ width: '100%', height: '400px' }}>
      <Routers />
        <Map events={this.amapEvents} zoom={12} >
          <Marker position={this.markerPosition} events={this.markerEvents} />
          <ZoomCtrl />
        </Map>
      </div>
    }
  }
export default App;