import React from 'react';
import {Button, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import blue from '@material-ui/core/colors/blue';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';

const styles = theme => ({
    card: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: blue[500],
    },
  });

class Mainview extends React.Component{
    constructor(props) {
        super(props);
        this.state = {posts:[],
            expanded: false
                    };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount(){
        const { onLoad } = this.props;
        axios('https://jsonplaceholder.typicode.com/posts')
        .then((response) => { console.log(response); onLoad(response.data)});
    }

    handleDelete(id) {
        const { onDelete } =this.props;
        return axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(() => onDelete(id));
    }

    handleEdit(data) {
        const { setEdit } = this.props;

        setEdit(data);
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
      };

    render(){
        const { classes, articles } = this.props;
        console.log("STATE POSTS",this.state.posts);
        return(
            <div align="center">
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Typography><h1>Posts</h1></Typography>
                {articles.map(data =>
                    <div>
                        <Grid>
                        <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                EA
                                </Avatar>
                            }
                            action={
                                <IconButton>
                                <MoreVertIcon />
                                </IconButton>
                            }
                        title={data.title}
                        //subheader={data.user !== undefined ? data.user.username : "Erick"}
                        />
                        <CardMedia
                        className={classes.media}
                        image="/static/images/cards/paella.jpg"
                        title="Paella dish"
                        />
                        <CardContent>
                        <Typography component="p">
                        <div>{data.body}</div>
                        <div><b></b> {moment(new Date(data.createdAt)).fromNow()}</div>
                        </Typography>
                        </CardContent>
                        <CardActions className={classes.actions} disableActionSpacing>
                            <IconButton aria-label="Add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="Share">
                                <ShareIcon />
                            </IconButton>
                            <IconButton
                                className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                                })}
                                onClick={this.handleExpandClick}
                                aria-expanded={this.state.expanded}
                                aria-label="Show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                            <Button onClick={() => this.handleDelete(data._id)}>Eliminar</Button>
                            <Button onClick={() => this.handleEdit(data)}>Editar</Button>
                            <Button>Leer</Button>
                        </CardActions>
                            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>
                                    Aqui va mas texto
                                    </Typography>
                                    <Typography paragraph>
                                    Y aqui tambien
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                        </Grid>
                        <br/>
                    </div>
                    )}
                );
  
            </div>
        );
    }
}

const mapStateToProps = state => ({
    articles: state.home.articles,
});

const mapDispatchToProps = dispatch => ({
    onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data}),
    onDelete: id => dispatch({ type: 'DELETE_ARTICLE', id}),
    setEdit: article => dispatch({ type: 'SET_EDIT', article }),
});

Mainview.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(Mainview));