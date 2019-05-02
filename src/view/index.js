import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout, Icon, Avatar, Popover} from 'antd';
import {NavLink} from 'react-router-dom';
import {logout} from '@action/user'
import Router, {Menus} from './router'

const {
    Header, Sider, Content,
} = Layout;
class View extends Component {
    state = {
        visible: false,
        sideVisible: true,
        usernameFirstLetter: '',
    }
    static getDerivedStateFromProps(props) {
        let {username} = props.user;
        return {
            usernameFirstLetter: username?.toString().substr(0, 1).toLocaleUpperCase()
        };
    }
    handleVisibleChange = (visible) => {
        this.setState({
            visible
        });
    }
    logout = ()=>{
        this.props.logout();
    }
    toggle = ()=>{
        this.setState({
            sideVisible: !this.state.sideVisible
        })
    }
    get side(){
        if(this.state.sideVisible){
            return (
                <Sider className='view-side' >
                    <div className='view-logo'>
                        <span><Icon type="thunderbolt" theme="filled" /> PP <em>模板</em></span>
                    </div>
                    <ul>
                        {
                            Menus.map((it,key)=>(
                                <li key={key}><NavLink to={it.path} exact={it.exact}><Icon type={it.icon} theme="filled" />{it.name}</NavLink></li>
                            ))
                        }
                    </ul>
                </Sider>
            )
        }
    }
    render() {
        const {
            visible,
            usernameFirstLetter,
        } = this.state;
        const {
            username,
        } = this.props.user || {};
        return (
            <Layout className='view-container'>
                {this.side}
                <Layout>
                    <Header className='view-header' style={{
                        left: '220px',
                    }}>
                        <div className='view-header-left'>
                            <Icon type="menu-fold" onClick={this.toggle}/>
                        </div>
                        <div className='view-user'>
                            <Popover
                                content={
                                    <div className='view-user-popver'>
                                        <p><a onClick={this.logout}><Icon type="export"/> 退出登录</a></p>
                                    </div>
                                }
                                trigger="click"
                                visible={visible}
                                placement="bottomRight"
                                onVisibleChange={this.handleVisibleChange}
                            >
                                <div className='view-user-box'>
                                    <Avatar style={{backgroundColor: '#039be5'}}>
                                        {usernameFirstLetter}
                                    </Avatar>
                                    <span style={{marginLeft: '6px'}}>{username}</span>
                                    <Icon type="caret-down" className='xi'/>
                                </div>
                            </Popover>
                        </div>
                    </Header>
                    <Content className='view-main'>
                        <div className='view-main-content'><Router/></div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
const mapState =(state)=>{
    return {
        user: state.user
    }
}
const mapDispatch=(dispatch)=>{
    return {
        logout(){
            dispatch(logout())
        }
    }
}
export default connect(mapState,mapDispatch)(View)
