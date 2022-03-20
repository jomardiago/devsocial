import React from 'react';
import { Redirect } from '@reach/router';
import { AuthContext } from './context/AuthContext';

function AuthRoute({ component: Component, ...rest }) {
    const { user } = React.useContext(AuthContext);
    const isAuthenticated = user ? Object.keys(user).length > 0 : false;
    
    if (isAuthenticated) {
        return <Component {...rest} />
    } else {
        return <Redirect to="/login" />
    }
}

export default AuthRoute;
