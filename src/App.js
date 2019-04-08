import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import PrivateRoute from '@com/PrivateRoute';

import View from '@view';
import Login from '@view/login';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route component={Login} path='/login'/>
                    <PrivateRoute component={View} path='/'/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
