import React, {Suspense, lazy} from 'react';
import {Switch, Route, Redirect} from 'react-router'
import {Skeleton} from 'antd'
import PrivateRoute from '@com/PrivateRoute';
import util from '@util'

const E404 = lazy(() => import('@view/404'));
export const Menus = [
    {
        name: '账号列表',
        path: '/account',
        icon: 'skin',
        role: [3],
        component: lazy(() => import('@view/account')),
    },
]


export default function Router() {
    return (
        <Suspense fallback={<Skeleton loading={true} active avatar/>}>
            <Switch>
                <Route path='/' exact render={() => <Redirect to={util.getHomePath()}/>}/>
                {
                    Menus.map((it, key) => (
                        <PrivateRoute component={it.component}
                                      key={key}
                                      exact={it.exact}
                                      role={it.role}
                                      path={it.path}/>
                    ))
                }
                <Route component={E404}/>
            </Switch>
        </Suspense>
    )
}
