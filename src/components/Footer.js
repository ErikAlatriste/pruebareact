import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import face from "../assets/face.png";
import insta from "../assets/insta.png";
import youtube from "../assets/youtube.png";

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing.unit * 2
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  }
});

function Footer(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar
        position="fixed"
        color="primary"
        className={classes.appBar}
        style={{ backgroundColor: "black" }}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <div>
            <IconButton>
              <img src={face} style={{ width: 30, height: 30 }} alt="fb logo" />
            </IconButton>
            <IconButton>
              <img
                src={insta}
                style={{ width: 30, height: 30 }}
                alt="insta logo"
              />
            </IconButton>
            <IconButton>
              <img
                src={youtube}
                style={{ width: 40, height: 30 }}
                alt="yt logo"
              />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
