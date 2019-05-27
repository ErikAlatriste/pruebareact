import React from 'react';
import {Button, Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import axios from "axios";

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
  });

class EntradasEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {user_id: '',
                      title: '',
                      body: '',
                    };

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.articleToEdit) {
            this.setState({
                title: nextProps.articleToEdit.title,
                body: nextProps.articleToEdit.body,
            });
        }
    }

    handleChange(event,index) {
        this.setState({[index]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        alert('Gracias por enviar tu escrito: ' + this.state.user_id);
        this.attemptLogIn(event)
    }

    componentDidMount() {
        this.attemptLogIn()
    }
    async attemptLogIn(){
        try {
            const response = axios.get(`https://jsonplaceholder.typicode.com/posts/${this.props.match.params.id}`)
            this.setState({
                title: response.data.title,
                body: response.data.body,
                userId: response.data.userId
            });
        }
        catch (error) {
            console.log(error)
          }
          const axios = require("axios");
          axios.put(`https://jsonplaceholder.typicode.com/posts/${this.props.match.params.id}`,
                  {headers: {"title":this.state.title,"body":this.state.body}}
              )
              .then(response => console.log(response.status))
              .catch(e => console.log(e));
    }

    render(){
        const { classes } = this.props;
        const { articleToEdit } = this.props;
        return(
            <div align="center">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <Typography><h1>React-Blog<br/><br/>Usuario: {//{this.props.user.id}.
                }
                Autor: {//{this.props.user.username}.
                }
                </h1></Typography>
                <br />
                <br />
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Typography>
                        <label>
                            Nombre del Articulo:
                            <br/>
                            <TextField 
                            label="Nombre del Articulo"
                            variant="outlined"
                            style={{width:750}}
                            type="text" title={this.state.title} onChange={(e) => this.handleChange(e,"title")} 
                            />
                        </label>
                    </Typography>
                    <br />
                    <Typography>
                        <label>
                            Contenido:
                            <br/>
                            <TextField 
                            label="Contenido"
                            variant="outlined"
                            style={{width:750}}
                            multiline
                            rows="15"
                            type="text" body={this.state.body} onChange={(e) => this.handleChange(e,"body")} 
                            />
                        </label>
                    </Typography>
                    <br/>
                    <Button type="submit" value="Enviar">{articleToEdit ? 'Update' : 'Submit'}</Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onSubmit: data => dispatch({ type: 'SUBMIT_ARTICLE', data }),
    onEdit: data => dispatch({ type: 'EDIT_ARTICLE', data}),
})

const mapStateToProps = state => ({
    articleToEdit: state.home.articleToEdit,
})

export default connect(mapStateToProps, mapDispatchToProps)(EntradasEdit);