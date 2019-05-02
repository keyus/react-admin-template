import React from 'react'

export default function (self) {
    return [
        {
            title: '账号',
            dataIndex: 'username',
            key: 'username',
            width: '150px',
        },
        {
            title: '操作',
            width: '350px',
            render() {
                return (
                    <a href="javascript:;">重置密码</a>
                );
            },
        },
    ]
}
