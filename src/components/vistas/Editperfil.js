import React from "react";
import Typography from "@material-ui/core/Typography";
import { TextField, Button } from "@material-ui/core";

class Editperfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      email: "",
      phone: "",
      web: ""
    };
    this.clearData = this.clearData.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  clearData() {
    this.setState({
      user: "",
      email: "",
      phone: "",
      web: ""
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleValidation() {
    return "Su informacion ha sido modificada";
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.handleValidation()) {
      alert("Su informacion ha sido modificada");
      this.clearData();
    }
  }

  onCancel(event) {
    event.preventDefault();
    alert("Estas cancelado esta operacion");
    this.clearData();
  }

  render() {
    return (
      <div align="center">
        <Typography>
          <b>Informacion de usuario:</b>
        </Typography>{" "}
        <br />
        <Typography>
          <b>Usuario:</b>
        </Typography>{" "}
        <br />
        <TextField
          label="Aqui van las props del nombre de Usuario"
          variant="outlined"
          style={{ width: 400 }}
          onChange={this.handleChange}
        />{" "}
        <br />
        <br />
        <Typography>
          <b>Email:</b>
        </Typography>{" "}
        <br />
        <TextField
          label="Aqui van las props del Email"
          variant="outlined"
          style={{ width: 400 }}
          onChange={this.handleChange}
        />{" "}
        <br />
        <br />
        <Typography>
          <b>Telefono:</b>
        </Typography>{" "}
        <br />
        <TextField
          label="Aqui van las props del Telefono"
          variant="outlined"
          style={{ width: 400 }}
          onChange={this.handleChange}
        />{" "}
        <br />
        <br />
        <Typography>
          <b>Website:</b>
        </Typography>{" "}
        <br />
        <TextField
          label="Aqui van las props del Website"
          variant="outlined"
          style={{ width: 400 }}
          onChange={this.handleChange}
        />{" "}
        <br />
        <br />
        <Button type="submit" onClick={this.handleSubmit}>
          Guardar perfil
        </Button>
        <Button onClick={this.onCancel}>Cancelar</Button>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default Editperfil;
