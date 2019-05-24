import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Editperfil from './Editperfil';
import { connect } from 'react-redux';
import axios from 'axios';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1200,
  },
});

class Tabperfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {articles:[],
      value: 0,
    }
  }

  componentDidMount() {
    const { onLoad } = this.props;
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((response) => { console.log(response); 
    const longeur = response.data.length;
    this.setState({longeur}); console.log(longeur); onLoad(response.data)
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme, articles } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Posts" />
            <Tab label="Blogs Seguidos" />
            <Tab label="Edita tu perfil" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>Lista de Posts: {this.state.longeur}
          {articles.map(data => 
                <div align="left">
                  <ol>
                    {data.id}.- {data.title} <br />
                    Id del Autor: {data.userId} <br />
                  </ol>
                </div>
              )}
          </TabContainer>
          <TabContainer dir={theme.direction}>Lista de Post Seguidos: {this.state.longeur}
            {articles.map(data => 
                  <div align="left">
                    <ol>
                      {data.id}.- {data.title} <br />
                      Id del Autor: {data.userId} <br />
                    </ol>
                  </div>
            )}      <br/><br/>    
          </TabContainer> 
          <TabContainer dir={theme.direction}><Editperfil /></TabContainer>
        </SwipeableViews>
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

Tabperfil.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles, { withTheme: true })(Tabperfil));