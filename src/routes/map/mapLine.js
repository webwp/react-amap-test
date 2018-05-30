import React , {Component} from 'react';
import { Map, Polyline } from 'react-amap';
import Routers from '../../components/router';

const randomPath = () => ({
 longitude: 60 + Math.random() * 50,
 latitude: 10 + Math.random() * 40,
})
 
class MapLine extends Component{
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
  
  changePath(){
    this.setState({
      path: Array(5).fill(true).map(randomPath),
    });
  }
  
  render(){
      console.log("------",this.props.__map__);
    return <div>
      <div style={{width: '100%', height: '370px'}}>
        <Routers />
        <Map plugins={['ToolBar']} zoom={3}>
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

export default MapLine;
