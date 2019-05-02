import React, {Component} from 'react';
import {Table} from 'antd';
import {accoutList} from '@api';
import {pageSizeOptions} from '@config';
import columns from './columns'
import Filter from './filter'

export default class Account extends Component {
    state = {
        loading: false,
        page: 1,
        size: 10,
        total: 0,
        data: [],
        sorter: {},
        query: {}
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
    componentWillUnmount() {
        accoutList.source?.cancel();
        this.setState = () => {};
    }
    tableChange = (pagination, sorter)=>{
        this.setState({
            page: pagination.current,
            size: pagination.pageSize,
            sorter,
        },()=>this.fetch());
    }
    onSearch = (query)=>{
        this.setState({
            page: 1,
            size: 10,
            query,
        },()=>this.fetch())
    };
    fetch = async ()=>{
        this.setState({
            loading: true,
        })
        try {
            const res = await accoutList(this.state.query);
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
                <Filter onSearch={this.onSearch}/>
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
                           pageSizeOptions,
                           total,
                           showTotal(total){
                               return `共 ${total} 条记录 第 ${page} / ${totalPage || 1} 页`;
                           },
                       }}
                       dataSource={data}/>
            </div>
        );
    }
}
