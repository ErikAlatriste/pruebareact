import React from "react";
import { Button, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class Entradas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userId: "", title: "", body: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, index) {
    this.setState({ [index]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("Gracias por enviar tu escrito: " + this.state.userId);
    this.attemptLogIn(event);
  }

  attemptLogIn() {
    fetch(`https://jsonplaceholder.typicode.com/posts/`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        post: { title: this.state.title, body: this.state.body }
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.props.history.replace("/sdasd");
      });
  }

  render() {
    const { classes } = this.props;
    const { articleToEdit } = this.props;
    const { title, body } = this.state;
    return (
      <div align="center">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Typography>
          <h1>
            React-Blog
            <br />
            <br />
            Usuario:{" "}
            {
              //{this.props.user.id}.
            }
            Autor:{" "}
            {
              //{this.props.user.username}.
            }
          </h1>
        </Typography>
        <br />
        <br />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Typography>
            <label>
              Nombre del Articulo:
              <br />
              <TextField
                label="Nombre del Articulo"
                variant="outlined"
                style={{ width: 750 }}
                type="text"
                title={this.state.title}
                onChange={e => this.handleChange(e, "title")}
              />
            </label>
          </Typography>
          <br />
          <Typography>
            <label>
              Contenido:
              <br />
              <TextField
                label="Contenido"
                variant="outlined"
                style={{ width: 750 }}
                multiline
                rows="15"
                type="text"
                body={this.state.body}
                onChange={e => this.handleChange(e, "body")}
              />
            </label>
          </Typography>
          <br />
          <Button type="submit" onClick={this.handleSubmit}>
            {articleToEdit ? "Update" : "Submit"}
          </Button>
        </form>
      </div>
    );
  }
}

export default Entradas;
