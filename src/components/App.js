import React from 'react';
import {Router, Route, Switch } from 'react-router-dom';
import Login from './login/Login';
import Signup from './login/Signup';
import Perfil from './vistas/Perfil';
import Mainview from './vistas/MainView';
import Entradas from './vistas/Entradas';
import Header from './Header';
import Footer from './Footer';
import history from '../history';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                email: '',
                id: '',
                permission_to_post: true,
                username: ''},
                authenticated: true
        };
    }

    handleLogin(data) {
        this.setState({user:data});
    }

    render() {
        console.log(this.state)
        return(
            <div>
                <Router history={history}>
                    <Header user={this.state.user} />
                    <Switch>
                        <Route path="/"exact render={(props) => <Login {...props} LogIn={this.handleLogin.bind(this)} /> } />
                        <Route path="/signup"exact component={Signup} />
                        <Route path="/mainview"exact component={Mainview} />
                        <Route path="/perfil"exact component={Perfil} />
                        <Route path="/entradas"exact render={(props) => <Entradas {...props} user={this.state.user} /> } />
                    </Switch>
                    <Footer />
                </Router>
            </div>
        )
    }
}

export default App;