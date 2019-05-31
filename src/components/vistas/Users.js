import React from "react";
import "./Users.css";
import Typography from "@material-ui/core/Typography";
import FollowButton from "../buttons/Follow";
import RandomUser from "../buttons/RandomUser";

class UserProfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    fetch("https://randomuser.me/api/?results=10")
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({ users: data.results });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let userList = this.state.users.map(user => {
      return (
        <div className="profile" key={user.name.first}>
          <img className="profile__image" src={user.picture.medium} />
          <h3 className="profile__name">
            {user.name.first} {user.name.last}
          </h3>
          <p className="profile__location">
            {user.location.city}, {user.location.state}
          </p>
          <FollowButton />
        </div>
      );
    });
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="profiles">
          <Typography>{userList}</Typography>
          <RandomUser />
        </div>
      </div>
    );
  }
}

export default UserProfiles;
