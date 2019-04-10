import moment from 'moment'
export default function () {
    return [
        {
            title: '订单编号',
            dataIndex: 'orderNo',
            key: 'orderNo',
        },
        {
            title: '交易日期',
            dataIndex: 'createTime',
            key: 'createTime',
            sorter: true,
            render(val) {
                return moment(val).format('YYYY-MM-DD HH:mm:ss')
            },
        },
        {
            title: '玩家ID',
            dataIndex: 'goodsNo',
            key: 'goodsNo',
        },
        {
            title: '提现金额',
            dataIndex: 'o4',
            key: 'o4',
            sorter: true,
        },
        {
            title: '品牌',
            dataIndex: 'o5',
            key: 'o5',
        },
        {
            title: '操作',
            render() {
                return '操作'
            },
        },
    ]
}
