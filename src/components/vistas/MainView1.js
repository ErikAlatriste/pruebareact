import React from "react";
import Leer from "./Leer";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import blue from "@material-ui/core/colors/blue";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";

const styles = theme => ({
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

class Mainview1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchError: false,
      posts: [],
      presentedPosts: [],
      pagStart: 0,
      pagEnd: 10,
      presentedPosts1: [],
      pagStart1: 0,
      pagEnd1: 10
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(res => {
        let presentedPosts = res.slice(this.state.pagStart, this.state.pagEnd);
        this.setState({
          posts: res,
          presentedPosts: presentedPosts
        });
      });
  }

  editText = (id, event) => {
    this.setState({
      posts: this.state.presentedPosts.map(post => {
        if (post.id === id) {
          post.title = event.target.value;
        }
        return post;
      })
    });
  };

  saveText = (id, event) => {
    this.setState({
      posts: this.state.posts.map(post => {
        if (post.id === id) {
          axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            title: post.title,
            body: post.body
          });
        }
        return post;
      })
    });
  };

  delTodo = id => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response =>
        this.setState({
          posts: [...this.state.posts.filter(post => post.id !== id)]
        }).catch(error => console.log(error))
      );
  };

  addTodo = (title, body) => {
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body,
        completed: false
      })
      .then(response =>
        this.setState({
          posts: [...this.state.todos, response.data]
        })
          .then(response => response.json())
          .then(json => console.log(json))
          .catch(error => console.log(error))
      );
  };

  handleNextClick = () => {
    let pagStart = this.state.pagEnd;
    let pagEnd = this.state.pagEnd + 10;
    let presentedPosts = this.state.posts.slice(pagStart, pagEnd);
    this.setState({
      presentedPosts: presentedPosts,
      pagStart: pagStart,
      pagEnd: pagEnd
    });
  };

  handlePreviousClick = () => {
    let pagStart1 = this.state.pagEnd;
    let pagEnd1 = this.state.pagEnd1 - 10;
    let presentedPosts1 = this.state.posts.slice(pagStart1, pagEnd1);
    this.setState({
      presentedPosts1: presentedPosts1,
      pagStart: pagStart1,
      pagEnd: pagEnd1
    });
  };

  render() {
    const Button = props => {
      return (
        <button className="btn" onClick={props.handleClick}>
          {props.title}
        </button>
      );
    };

    const Post = props => {
      return (
        <div className="post-card">
          <Card style={{ maxWidth: 400 }}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="Recipe"
                  style={{ backgroundColor: blue[500] }}
                >
                  EA
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={props.title}
              //subheader={data.user !== undefined ? data.user.username : "Erick"}
            />
            <CardMedia
              style={{ height: 0, paddingTop: "56.25%" }}
              image="/static/images/cards/paella.jpg"
              title="Paella dish"
            />
            <CardContent>
              <Typography component="p">
                <div>
                  {props.id}.- {props.title}
                </div>
                <div>
                  <b /> {moment(new Date(props.createdAt)).fromNow()}
                </div>
              </Typography>
            </CardContent>
            <CardActions style={{ display: "flex" }} disableActionSpacing>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
              <IconButton aria-label="Show more">
                <ExpandMoreIcon />
              </IconButton>
              <Typography>
                <div>Eliminar:</div>
                <Button onClick={this.props.delTodo}>Eliminar</Button>
                <div>Editar:</div>
                <Link to={`/${props.id}/entradas`}>
                  <Button>Editar</Button>
                </Link>
                <div>Leer:</div>
                <Link to={`/mainview/articulo/${props.id}`}>
                  <Button
                    render={props => (
                      <Leer {...props} title={props.title} body={props.body} />
                    )}
                  >
                    Leer
                  </Button>
                </Link>
              </Typography>
            </CardActions>
          </Card>
          <br />
        </div>
      );
    };

    const posts = this.state.presentedPosts
      .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
      .map(post => {
        return (
          <Post
            key={post.id}
            title={post.title}
            body={post.body}
            id={post.id}
            delTodo={this.props.delTodo}
            editText={this.props.editText}
            saveText={this.props.saveText}
          />
        );
      });
    const { classes } = this.props;
    return (
      <div align="center">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Typography>
          <h1>Posts</h1>
        </Typography>
        <ul className="post-container">{posts}</ul>
        <Button handleClick={this.handlePreviousClick} title="Anterior" />
        {`${this.state.pagEnd} of ${this.state.posts.length}`}
        <Button handleClick={this.handleNextClick} title="Siguiente" />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default Mainview1;
