import React from 'react';
import {Switch,Route} from 'react-router'

import Home from '@view/home'
import Order from '@view/order'

export const Menus = [
    { name: '首页', path: '/', exact: true, icon: 'home' },
    { name: '订单列表', path: '/order', icon: 'tags' },
    { name: '银行账号列表', path: '/bank', icon: 'credit-card'},
    { name: '管理账号列表', path: '/adminUser', icon: 'skin' },
    { name: 'IP列表', path: '/ip', icon: 'bulb' },
]

export default function Router() {
    return (
        <Switch>
            <Route component={Home} path='/' exact/>
            <Route component={Order} path='/order' />
        </Switch>
    )
}
