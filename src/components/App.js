import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Login from "./login/Login";
import Signup from "./login/Signup";
import Perfil from "./vistas/Perfil";
import Mainview1 from "./vistas/MainView1";
import Entradas from "./vistas/Entradas";
import EntradasEdit from "./vistas/EntradasEdit";
import Leer from "./vistas/Leer";
import Header from "./Header";
import Footer from "./Footer";
import history from "../history";
import axios from "axios";
import UserProfiles from "../components/vistas/Users";

const GETUSER = "https://reqres.in/api/users?page=2";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        id: "",
        permission_to_post: true,
        permission_to_edit: true,
        permission_to_delete: true,
        username: ""
      },
      authenticated: true
    };
  }

  componentDidMount() {
    const Token = window.localStorage.getItem("Authorization");
    if (Token) {
      console.log("Token found");
      console.log(Token);
      axios
        .get(GETUSER, {
          headers: { Authorization: Token }
        })
        .then(response => {
          if (!response.ok) {
            if (response.status === 401) {
              window.localStorage.clear();
              window.location.reload();
            } else {
              throw Error(response.statusText);
            }
          }
          return response.json();
        })
        .then(data => {
          this.handleLogin(data);
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      console.log("Token not found");
      this.setState({ authenticated: true });
    }
  }

  handleLogin(data) {
    this.setState({ user: data });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Router history={history}>
          <Header user={this.state.user} />
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Login {...props} LogIn={this.handleLogin.bind(this)} />
              )}
            />
            <Route path="/signup" exact component={Signup} />
            <Route path="/mainview" exact component={Mainview1} />
            <Route path="/perfil" exact component={Perfil} />
            <Route
              path="/entradas"
              exact
              render={props => <Entradas {...props} user={this.state.user} />}
            />
            <Route exact path="/:id/entradas" component={EntradasEdit} /> } />
            <Route path="/mainview/articulo/:id" exact component={Leer} />
            <Route path="/usuarios" exact component={UserProfiles} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
