import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'

/* components */
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Container from './components/layout/Container';
import Message from './components/layout/Message';

/* pages */
import Home from './components/pages/Home';
import Login from './components/pages/Auth/Login';
import MyPets from './components/pages/Pet/MyPets';
import Profile from './components/pages/User/Profile';
import Register from './components/pages/Auth/Register';

/* context */
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/user/profile">
              <Profile />
            </Route>
            <Route path="/pet/mypets">
              <MyPets />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
