import React from "react";
import { Button, Dialog, Typography } from "@material-ui/core";
import { Email, Lock } from "@material-ui/icons";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import bio from "../../assets/react.jpeg";
import axios from "axios";

let authToken = "";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      badLogin: "",
      dialogOpen: false,
      dialogPass: false,
      forgottenPwdEmail: "",
      checkEmail: "",
      emailClicked: { backgroundColor: "white", color: "black" },
      passwordClicked: { backgroundColor: "white", color: "black" }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleClick(event) {
    if (event.currentTarget.className.includes("email")) {
      this.setState({
        emailClicked: { backgroundColor: "blue", color: "white" }
      });
    } else if (event.currentTarget.className.includes("password")) {
      this.setState({
        passwordClicked: { backgroundColor: "blue", color: "white" }
      });
    } else {
      this.setState({ dialogOpen: true });
    }
  }

  handleBlur(event) {
    if (event.currentTarget.name === "email") {
      this.setState({
        emailClicked: { backgroundColor: "white", color: "black" }
      });
    } else if (event.currentTarget.name === "password") {
      this.setState({
        passwordClicked: { backgroundColor: "white", color: "black" }
      });
    }
  }

  handleClose() {
    this.setState({ dialogOpen: false });
    this.setState({ dialogPass: false });
  }

  attemptLogIn() {
    axios.defaults.baseURL = "https://reqres.in/api/";
    axios
      .post(
        "login",
        JSON.stringify({
          email: this.state.email,
          password: this.state.password
        }),
        { headers: { "Content-Type": "application/json" } }
      )
      .then(response => {
        console.log(response);
        return response.data;
      })
      .then(data => {
        this.props.LogIn(data);
        this.props.history.push("/mainview");
        localStorage.setItem("authToken", data);
        console.log(authToken);
      })
      .catch(error => {
        console.log(error);
        this.setState({ dialogPass: true });
      });
  }

  render() {
    let display_message;
    if (this.state.badLogin) {
      display_message = (
        <p style={{ marginBottom: 0 }}>{this.state.badLogin}</p>
      );
    }
    document.body.style = "background: #FFFFFF";
    return (
      <div align="center" className="centered-elements">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <img
          className="img-logo"
          src={bio}
          alt="biologo"
          style={{ margin: "auto", height: 337, width: 600 }}
        />
        <Typography>
          <h1 className="titulo-login">¡Bienvenido al Blog de React!</h1>
        </Typography>
        <form onSubmit={e => e.preventDefault()}>
          <table className="form-table" style={{ backgroundColor: "white" }}>
            <tbody>
              <tr className="login-table-tr tr-first" align="center">
                <td
                  className="login-table-td login-table-td-icon td-first"
                  style={this.state.emailClicked}
                >
                  <Email style={{ fontSize: 40 }} />
                </td>
                <td className="login-table-td login-table-td-input td-second">
                  <TextField
                    type="email"
                    name="email"
                    label="Correo electrónico"
                    className="disable-selection email"
                    variant="outlined"
                    onChange={this.handleChange}
                    onClick={this.handleClick}
                    onBlur={this.handleBlur}
                  />
                </td>
              </tr>
              <tr className="login-table-tr tr-second" align="center">
                <td
                  className="login-table-td login-table-td-icon td-first"
                  style={this.state.passwordClicked}
                >
                  <Lock style={{ fontSize: 40 }} />
                </td>
                <td className="login-table-td login-table-td-input td-second">
                  <TextField
                    type="password"
                    name="password"
                    label="Contraseña"
                    className="disable-selection password"
                    variant="outlined"
                    onChange={this.handleChange}
                    onClick={this.handleClick}
                    onBlur={this.handleBlur}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <Typography>
            <p
              style={{
                color: "black",
                width: "440px",
                textAlign: "right",
                fontSize: "0.8em"
              }}
            >
              <b onClick={this.handleClick} style={{ cursor: "pointer" }}>
                ¿Olvidaste tu contraseña?
              </b>
            </p>
            <p style={{ color: "#ef5350" }}>{display_message}</p>
            <p
              style={{
                color: "black",
                width: "440px",
                textAlign: "right",
                fontSize: "0.8em"
              }}
            >
              ¿Eres nuevo en el Blog de React? <br />
              <Link to={`/signup`}>¡¡Registrate!!</Link>
            </p>
          </Typography>
          <div style={{ width: "440px" }}>
            <Button
              align="right"
              className="login-button"
              onClick={() => this.attemptLogIn()}
              type="submit"
            >
              Iniciar Sesión
            </Button>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </form>

        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div style={{ width: "500px", height: "320px" }}>
            <div className="outer" style={{ width: "500px", height: "270px" }}>
              <div className="middle">
                <div className="inner">
                  <p> </p>
                  <h2 style={{ textAlign: "center", fontWeight: "500" }}>
                    Recuperar contraseña
                  </h2>
                  <p style={{ padding: "0 10% 0 10%" }}>
                    Introduzca la dirección de correo electrónico asociados con
                    su cuenta de Bio-alchemist
                  </p>
                  <input
                    type="email"
                    name="forgottenPwdEmail"
                    className="disable-selection"
                    onChange={this.handleChange}
                    style={{
                      marginLeft: "40px",
                      width: "80%",
                      border: "solid 1px #4c4c4c",
                      borderRadius: "3px"
                    }}
                  />
                  <p style={{ padding: "0 10% 0 10%", color: "#ac5fd3" }}>
                    {this.state.checkEmail}
                  </p>
                  <div className="holder">
                    <Button
                      id="pop-up-button"
                      className="login-button"
                      onClick={e => this.recoverPassword(e)}
                    >
                      Recuperar contraseña
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>

        <Dialog
          open={this.state.dialogPass}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div style={{ width: "500px", height: "170px" }}>
            <div className="outer" style={{ width: "500px", height: "120px" }}>
              <div className="middle">
                <div className="inner">
                  <p> </p>
                  <Typography>
                    <h2 style={{ textAlign: "center", fontWeight: "500" }}>
                      Error, tus datos son incorrectos
                    </h2>
                    <p style={{ padding: "0 10% 0 10%" }}>
                      Favor de introducir una direccion de correo electronico y
                      un password validos
                    </p>
                  </Typography>
                  <div className="holder" align="center">
                    <Button
                      id="pop-up-button"
                      className="login-button"
                      onClick={this.handleClose}
                    >
                      Cerrar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Login;
