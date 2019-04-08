import React from 'react';
import {Switch,Route} from 'react-router'

import Home from '@view/home'
import Test from '@view/test'

export default function Router() {
    return (
        <Switch>
            <Route component={Home} path='/' exact/>
            <Route component={Test} path='/test' />
        </Switch>
    )
}
