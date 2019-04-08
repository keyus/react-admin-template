import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout, Icon, Avatar, Popover} from 'antd';
import {Switch,Route} from 'react-router'
import {logout} from '@action/user'
import Home from '@view/home'
import Test from '@view/test'

const {
    Header, Sider, Content,
} = Layout;
class View extends Component {
    state = {
        visible: false,
    }
    handleVisibleChange = (visible) => {
        this.setState({
            visible
        });
    }
    logout = ()=>{
        const {logout, history} = this.props;
        logout(history);
    }
    render() {
        return (
            <Layout className='view-container'>
                <Header className='view-header'>
                    <div className='view-logo'>
                        <span><Icon type="thunderbolt" theme="filled" style={{color: '#00a8ff'}}/> PP <em>支付</em></span>
                    </div>
                    <div className='view-user'>
                        <Popover
                            content={
                            <div className='view-user-popver'>
                                <p><a onClick={this.logout}><Icon type="export" /> 退出</a></p>
                            </div>
                            }
                            title={`用户：${this.props.user.username}`}
                            trigger="click"
                            visible={this.state.visible}
                            placement="bottomRight"
                            onVisibleChange={this.handleVisibleChange}
                        >
                            <Avatar icon="user" />
                            <Icon type="caret-down" className='xi' />
                        </Popover>
                    </div>
                </Header>
                <Layout>
                    <Sider className='view-side'>Sider</Sider>
                    <Content>
                        <Switch>
                            <Route component={Home} path='/' exact/>
                            <Route component={Test} path='/test' />
                        </Switch>
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
const mapDispath=(dispatch)=>{
    return {
        logout(history){
            dispatch(logout(history))
        }
    }
}
export default connect(mapState,mapDispath)(View)
