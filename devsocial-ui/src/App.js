import React from 'react';
import {
  ChakraProvider,
  Container,
  theme
} from '@chakra-ui/react';
import { Router } from '@reach/router';
import Header from './components/Header';
import AuthRoute from './AuthRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Container pt="100px" pb={9}>
        <Router>
          <AuthRoute path="/" component={Home} />
          <AuthRoute path="/profile/:username" component={Profile} />
          <Login path="/login" />
          <Register path="/register" />
        </Router>
      </Container>
    </ChakraProvider>
  );
}

export default App;
