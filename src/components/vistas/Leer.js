import React from "react";
import { Button, Typography, TextField } from "@material-ui/core";
import Comments from "./Comments";

class Leer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [props]
    };
    console.log(props);
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(res => {
        this.setState({
          posts: res
        });
      });
  }

  render() {
    return (
      <div align="center">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Typography>
          <h1>Leer</h1>
        </Typography>{" "}
        <br />
        <Typography>
          <h3>Titulo del articulo: </h3>
        </Typography>{" "}
        <br />
        <Typography>
          <h3>Contenido: </h3>
        </Typography>
        <div align="left" style={{ padding: 10 }}>
          <Typography>
            <h3>Comentarios: </h3>
          </Typography>
          <Comments />
        </div>
      </div>
    );
  }
}

export default Leer;
