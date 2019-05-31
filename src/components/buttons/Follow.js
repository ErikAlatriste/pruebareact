import React from "react";
import Button from "@material-ui/core/Button";
import "./Follow.css";

class FollowButton extends React.Component {
  constructor() {
    super();
    this.state = {
      follow: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      follow: !this.state.follow
    });
  }

  render() {
    const label = this.state.follow ? "Follow" : "Unfollow";
    return (
      <div>
        <Button className="btn btn-primary" onClick={this.handleClick}>
          {label}
        </Button>
      </div>
    );
  }
}

export default FollowButton;
