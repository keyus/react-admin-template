import React, {Component} from 'react';
import {Row, Col, Input, Button,} from 'antd'

export default class Filter extends Component {
    state = {
        username: undefined,
    }
    componentWillUnmount() {
        this.setState = () => {};
    }
    submit = () => {
        const {
            username,
        } = this.state;
        this.props.onSearch({
            username,
        });
    }
    onChange=(key,isSelect,submit)=>(val)=>{
        this.setState({
            [key]: isSelect ? val : val.target.value
        },()=>{
            submit && this.submit();
        })
    }
    resetFilter = () => {
        this.setState({
            username: undefined,
        },()=>this.submit())
    }
    render() {
        const {
            username,
        } = this.state;
        return (
            <>
                <Row gutter={18} className='filter-form'>
                    <Col span={6}>
                        <div className='filter-item'>
                            <label>账号:</label>
                            <div className='filter-auto'><Input type="text"
                                                                value={username}
                                                                onPressEnter={this.submit}
                                                                maxLength={20}
                                                                onChange={this.onChange('username')}
                                                                placeholder='请输入账号名称'/></div>
                        </div>
                    </Col>
                    <Col span={4}>
                        <Button type='primary' onClick={this.submit}>查询</Button>
                        <Button onClick={this.resetFilter} style={{marginLeft: '10px'}}>重置</Button>
                    </Col>
                </Row>
            </>
        );
    }
}
