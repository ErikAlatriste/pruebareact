import React from "react";
import { Button, Typography, TextField } from "@material-ui/core";
import axios from "axios";

const Post = props => (
  <article className="post">
    <h2 className="post-title">{props.title}</h2>
    <hr />
    <p className="post-content">{props.content}</p>
  </article>
);

class Comments extends React.Component {
  state = {
    posts: [],
    post: {
      title: "",
      content: ""
    }
  };

  componentWillMount() {
    const { posts } = this.state;
    axios
      .get("https://my-simple-react-blog-app.firebaseio.com/posts.json")
      .then(response => {
        const data = Object.values(response.data);
        const updatedPosts = [...data];
        this.setState({ posts: updatedPosts });
        console.log(posts);
      });
  }
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const { post } = this.state;
    const newPost = {
      ...post,
      [name]: value
    };
    this.setState({ post: newPost });
    console.log(event.target.value);
    console.log(this.state.post.title);
    console.log(name);
  };

  handleSubmit = event => {
    event.preventDefault();
    const post = {
      title: this.state.post.title,
      content: this.state.post.content
    };
    const posts = this.state.posts;

    axios
      .post("https://my-simple-react-blog-app.firebaseio.com/posts.json", post)
      .then(response => {
        console.log(response);
        this.setState({ post: response.data });
      });
  };

  render() {
    let posts = <p>Aun no hay comentarios</p>;
    if (this.state.posts) {
      posts = this.state.posts.map(post => {
        return <Post key={post.id} {...post} />;
      });
    }

    return (
      <React.Fragment>
        <Typography>{posts}</Typography>
        <form className="new-post-form" onSubmit={this.handleSubmit}>
          <Typography>
            Titulo del comentario: <br />
            <TextField
              className="title-input"
              type="text"
              name="title"
              onChange={this.handleChange}
              variant="outlined"
              style={{ width: 500 }}
            />
          </Typography>
          <br />
          <Typography>
            Comentario: <br />
            <TextField
              className="content-input"
              type="text"
              name="content"
              onChange={this.handleChange}
              variant="outlined"
              style={{ width: 500 }}
            />
          </Typography>
          <Button className="submit-button" type="submit" value="submit">
            ENVIAR
          </Button>
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </React.Fragment>
    );
  }
}

export default Comments;
