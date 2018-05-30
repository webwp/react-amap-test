import React , { Component } from 'react';
import { Map, Polyline } from 'react-amap';

import Routers from '../../components/router';

const randomPath = () => ({
 longitude: 60 + Math.random() * 50,
 latitude: 10 + Math.random() * 40,
})
 
class Changes extends Component{
  constructor(){
    super();
    this.state = {
      visible: true,
      draggable: true,
      path: Array(5).fill(true).map(randomPath),
    };
    this.lineEvents = {
      created: (ins) => {console.log(ins)},
      show: () => {console.log('line show')},
      hide: () => {console.log('line hide')},
      click: () => {console.log('line clicked')},
    }
    this.setss = {
        click:(e)=>{
            var s = this.state.path;
            s.push({longitude: e.lnglat.getLng(), latitude: e.lnglat.getLat()});
            // this.setState({
            //     path:s
            // })
            this.changePathsss(s)
        }
    }
  }
  
  toggleVisible(){
    this.setState({
      visible: !this.state.visible,
    });
  }
  
  toggleDraggable(){
    this.setState({
      draggable: !this.state.draggable,
    })
  }

  changePathsss(value){
    this.setState({
      path: value,
    });
  }
  
  changePath(){
    this.setState({
      path: Array(5).fill(true).map(randomPath),
    });
  }
  
  render(){
      console.log(this.state.path)
    return <div>
      <div style={{width: '100%', height: '370px'}}>
        <Routers />
        <Map plugins={['ToolBar']} zoom={3} events={this.setss}>
          <Polyline 
            path={ this.state.path }
            events={ this.lineEvents }
            visible={ this.state.visible }
            draggable={ this.state.draggable }
          />
        </Map>
      </div>
      <button onClick={() => {this.toggleVisible() } }>Toggle Visible</button>
      <button onClick={() => {this.toggleDraggable() } }>Toggle Draggable</button>
      <button onClick={() => {this.changePath() } }>Change Path</button>
    </div>
  }
}

export default Changes;