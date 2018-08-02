import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Avatar
} from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import Favorite from '@material-ui/icons/Favorite';
import red from '@material-ui/core/colors/red';
import { connect } from 'react-redux';
import { logout } from '../../actions/items';
import { Redirect} from 'react-router-dom';

const styles = theme => ({
  headerTabs: {
    flexGrow: 0.8
  },
  headerTitle: {
    flexGrow: 1
  },
  usernameAvatar: {
    backgroundColor: red[500]
  }
})

class Header extends React.Component {
  state = {
    value: 0,
    anchorEl: null,
  };

  handleChange = (event, value) => {
    this.props.history.push(value ? '/home/favorites' : '/home')
    this.setState({ value });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    const { logout, history } = this.props;

    logout()
    history.push('/login')
  }

  render() {
    const { value, anchorEl } = this.state;
    const { loginData, classes } = this.props;

    if(!loginData) {
			return <Redirect to='/login' />
		}

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Tabs value={value} onChange={this.handleChange} className={classes.headerTabs}>
              <Tab label={<Home />} />
              <Tab label={<Favorite />} />
            </Tabs>
            <Typography variant="title" color="inherit" className={classes.headerTitle}>
              Movie search
            </Typography>
            <div className='header-user'>
              <IconButton
                color="inherit"
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}>
                <Avatar
                  aria-label='Username avatar'
                  className={classes.usernameAvatar}
                >
                  {loginData.username.slice(0, 2).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.logout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginData: state.loginData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));