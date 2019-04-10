import React, {Component} from 'react';
import {Table} from 'antd';
import {playOrderList} from '@api';
import moment from 'moment';
import './index.scss'
import columns from './columns'

const formatDate = 'YYYY-MM-DD HH:mm:ss';
export default class Order extends Component {
    state = {
        loading: false,
        page: 1,
        size: 10,
        total: 0,
        data: [],

        query: {
            orderNo: undefined,
            userId: undefined,         //玩家ID
            status: undefined,         //I,S,F
            mid: undefined,
            cardAccount: undefined,
            realName: undefined,
            beginTime: moment().subtract(6,'month').format(formatDate),
            endTime: moment().format(formatDate),
            page: 0,
            rows: 0,
        }
    }
    componentWillUnmount() {
        this.setState = () => {};
    }
    static getDerivedStateFromProps(props, state) {
        return {
            totalPage: Math.ceil(state.total / state.size),
            query:{
                ...state.query,
                page: state.page,
                rows: state.size,
            }
        };
    }
    componentDidMount(){
        this.fetch();
    }
    tableChange = (p,sorter)=>{

    }
    fetch = async ()=>{
        this.setState({
            loading: true,
        })
        try {
            const res = await playOrderList(this.state.query);
            this.setState({
                total: res.total,
                data: res.data,
                loading: false,
            })
        }catch (e) {
            this.setState({
                loading: false,
            })
        }
    }
    onShowSizeChange=(current, size)=>{
        this.setState({
            size
        })
    }

    render() {
        const {
            page,
            totalPage,
            total,
            size,
            data,
            loading,
        } = this.state;
        return (
            <div>
                <Table columns={columns(this)}
                       loading={loading}
                       rowKey={(item, index) => index}
                       locale={{emptyText: '无任何记录'}}
                       onChange={(p,filters,sorter) => this.tableChange(p,sorter)}
                       pagination={{
                           current: page,
                           pageSize: size,
                           showQuickJumper: true,
                           showSizeChanger: true,
                           showTotal: (total) => {
                               return `共 ${total} 条记录 第 ${page} / ${totalPage || 1} 页`;
                           },
                           onShowSizeChange: this.onShowSizeChange,
                           total,
                       }}
                       dataSource={data}/>
            </div>
        );
    }
}
