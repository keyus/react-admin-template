import React from 'react';
import {Route, Redirect} from 'react-router';


export const isAuthenticated =()=>{
    if(localStorage.getItem('token')){
        return true;
    }
    return false;
}

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}
