// import React from 'react';
// import { connect } from 'dva';

// import styles from './IndexPage.css';
// import { Steps } from 'antd';
// const Step = Steps.Step;

// function IndexPage() {
//   return (
//     <div className={styles.normal}>
//       <h1 className={styles.title}>Yay! Welcome to dva!</h1>
//       <div className={styles.welcome} />
//       <ul className={styles.list}>
//         <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
//         <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
//       </ul>
//       <Steps current={1}>
//           <Step title="Finished" description="This is a description." />
//           <Step title="In Progress" description="This is a description." />
//           <Step title="Waiting" description="This is a description." />
//       </Steps>
//     </div>
//   );
// }

// IndexPage.propTypes = {
// };

// export default connect()(IndexPage);
import React,{ Component } from 'react';
import { connect } from 'dva';
import { Link } from 'react-router';
import { Map , Polyline , Markers } from 'react-amap';

import Routers from '../components/router';

import styles from './IndexPage.css';

const randomPath = (ms) => ({
  longitude: 60 + Math.random() * 50,
  latitude: 10 + Math.random() * 40,
 })
 let m = localStorage.getItem('line')?JSON.parse(localStorage.getItem('line')):[
  {
    longitude: 108.298289,
    latitude: 22.889349,
    isMarker:true
   },{
    longitude: 108.297774,
    latitude: 22.879702,
    isMarker:false
   },{
    longitude: 108.299319,
    latitude: 22.868947,
    isMarker:false
   },{
    longitude: 108.302237,
    latitude: 22.858033,
    isMarker:false
   },{
    longitude: 108.306872,
    latitude: 22.848542,
    isMarker:false
   },{
    longitude: 108.312537,
    latitude: 22.839367,
    isMarker:true
   }
 ]


 const randomPosition = (value) => ({
  longitude: value.longitude,
  latitude: value.latitude
})
const randomMarker = (arr) => (
  arr.map((e, idx) => ({
      position:  e.isMarker ? randomPosition(e):''
  }))
);
const randomMarkerSet = (v)=>{
    return [v[0],v[v.length-1]];
}

class IndexPage extends Component{
  constructor(){
    super();
    this.state = {
      langyao:m,
      visible: true,
      draggable: true,
      path: Array(20).fill(true).map(randomPath),
      Markers:randomMarkerSet(randomMarker(m)),
      position:''
    };
    this.lineEvents = {
      created: (ins) => {console.log(ins)},
      show: () => {console.log('line show')},
      hide: () => {console.log('line hide')},
      click: () => {console.log('line clicked')},
    }
    this.onClickMap = {
      click: (e)=>{
        //点击地图获取新的经纬度
        let newPonit = {
          longitude: e.lnglat.getLng(),
          latitude: e.lnglat.getLat(),
          isMarker:true
         };
         let newArr = this.state.langyao;
         let _lenght= newArr.length;
         //设置路线终点Marker
         newArr[_lenght-1].isMarker = false;
         //将新的经纬度添加到数组
         newArr.push(newPonit)
         localStorage.setItem('line',JSON.stringify(newArr));
         //设置点击位置为地图中心点
         this.setState({
          position:{longitude: e.lnglat.getLng(), latitude: e.lnglat.getLat()}
         })
         //调用——setKet方法改变路线图
         this._setket(newArr);
      }
    }
  }
  
  _setket(value){
    //bug 路线值改变后未重新渲染！
    this.setState({
      langyao:value
    })
  }
  render(){
    return (
      <div>
        <Routers />
        <div style={{height:'500px'}}>
            <Map zoom={12} amapkey={'caacca41700b7e485f172946d097d845'} events={this.onClickMap}>
                <Polyline 
                  path={ this.state.langyao }
                  events={ this.lineEvents }
                  visible={ this.state.visible }
                  draggable={ this.state.draggable }
                />
                <Markers markers={ this.state.Markers } />
            </Map>
        </div>
      </div>
    )
  }
}

export default IndexPage;