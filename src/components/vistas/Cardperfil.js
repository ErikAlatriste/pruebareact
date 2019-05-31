import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import perfil from "../../assets/perfil.jpg";
import axios from "axios";
import FollowButton from "../buttons/Follow";
import "../buttons/Follow";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};
function MediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card} style={{ margin: 10 }}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={perfil}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Usuario:
          </Typography>
          <Typography component="p">Seguidores:</Typography>
          <Typography component="p">Blog Seguidos:</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" className="btn btn-primary">
          <FollowButton className="btn-primary" />
        </Button>
        <Button size="small" color="primary">
          Cerrar Sesion
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
