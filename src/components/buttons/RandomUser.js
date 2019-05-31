import React from "react";
import { render } from "react-dom";
import { Button, Typography } from "@material-ui/core";

class RandomUser extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { random: 0 };
  }

  handleClick() {
    const min = 1;
    const max = 10;
    const rand = Math.floor(Math.random() * (max - min)) + min;
    this.setState({ random: this.state.random + rand });
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <Typography>
            <h3>Usuario Random</h3>
          </Typography>
          <Button onClick={this.handleClick.bind(this)}>Random User</Button>
          <Typography>
            <div className="card" style={{ marginTop: 10 }}>
              <div className="card-block">
                Usuario Aleatorio: {this.state.random}
              </div>
            </div>
          </Typography>
        </div>
      </div>
    );
  }
}

export default RandomUser;
