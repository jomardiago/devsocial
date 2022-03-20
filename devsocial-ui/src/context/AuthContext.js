import React from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: {}
};

if (localStorage.getItem('token')) {
    const decodedToken = jwtDecode(localStorage.getItem('token'));

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
    } else {
        initialState.user = decodedToken;
    }
}

const AuthContext = React.createContext({
    user: {},
    login: () => {},
    logout: () => {},
    updateConnections: () => {}
});

const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };
        case 'UPDATE_CONNECTIONS': {
            return {
                ...state,
                user: {
                    ...state.user,
                    connections: action.payload
                }
            }
        }
        default:
            return state;
    }
};

const AuthProvider = props => {
    const [ state, dispatch ] = React.useReducer(authReducer, initialState);

    const login = user => {
        localStorage.setItem('token', user.token);
        dispatch({ type: 'LOGIN', payload: user });
    };

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
    };

    const updateConnections = user => {
        const newConnections = user.connections;
        dispatch({ type: 'UPDATE_CONNECTIONS', payload: newConnections });
    };

    return (
        <AuthContext.Provider value={{ user: state.user, login, logout, updateConnections }} { ...props } />
    );
}

export { AuthContext, AuthProvider };
