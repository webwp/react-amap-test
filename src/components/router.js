import React , { Component } from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Router extends Component{
    constructor(props){
        super(props);
        this.state = {
            current: 'mail',
        }
    }
    componentWillMount(){
        const url = window.location.href,arrKey=['mail','mapline','custom','mackermap','change'];
        for(var i=0;i<arrKey.length;i++){
            if(url.indexOf(arrKey[i])>=0){
                this.setState({
                    current:arrKey[i]
                })
            }
        }

    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
    }
    render(){
        return(
            <div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="mail">
                        <a href="#/" rel="noopener noreferrer">首页</a>
                    </Menu.Item>
                    <Menu.Item key="mapline">
                        <a href="#/mapline" rel="noopener noreferrer">绘图</a>
                    </Menu.Item>
                    <Menu.Item key="custom">
                        <a href="#/custom" rel="noopener noreferrer">测试一</a>
                    </Menu.Item>
                    <Menu.Item key="mackermap">
                        <a href="#/mackermap" rel="noopener noreferrer">测试二</a>
                    </Menu.Item>
                    <Menu.Item key="change">
                        <a href="#/change" rel="noopener noreferrer">测试三</a>
                    </Menu.Item>

                </Menu>
                
            </div>

        )
    }
}
export default Router;