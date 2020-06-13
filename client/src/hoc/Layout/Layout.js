import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom';

//Importing actions
import * as actions from '../../store/actions/index';

// Material UI
//import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { withStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = theme => ({
    root: {
        display: 'flex',
      },
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
  });



class Layout extends Component {
    
    state = {
        openDrawer: false,
        logoutRedirect: false
    }

    

    handleDrawerOpen = () => {
        this.setState({openDrawer:true})
    }

    handleDrawerClose = () => {
        this.setState({openDrawer:false})
    }

    goToSignUp = () => {
        //this.props.history.push('/signup');
        this.props.openSignUpDialog();
    }

    goHome = () => {
        this.props.history.push('/');
    }

    openLogin = () => {
      this.props.showLoginDialog();
    }

    logoutUser = () => {
      this.props.logoutUser();
      this.props.history.push("/");
    }

    componentDidMount(){
      this.props.checkAutoLogin();
    }


    render () {
        const { classes , isLoggedIn , username } = this.props;
    
        return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: this.state.openDrawer,
                })}
            >
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, this.state.openDrawer && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap onClick={this.goHome}>
                    Meals Calorie Tracker
                </Typography>
                <Typography  style={{marginLeft:940}} noWrap>
                  {
                    isLoggedIn 
                    ? 
                    <span>Welcome { username} |  <Button color="inherit" onClick={this.logoutUser}>Logout</Button> </span> 
                    :
                    <div>
                      <Button color="inherit" onClick={this.openLogin}>Login</Button>
                      <Button color="inherit" onClick={this.goToSignUp} >Sign Up</Button>
                    </div>
                  }
                    
                </Typography>
                   
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={this.state.openDrawer}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                    {/* {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />} */}
                    <ChevronLeftIcon />
                </IconButton>
                </div>
                <Divider />
                <List>
                 <ListItem button key="Home" onClick={ (e) =>  this.props.history.push("/")}>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary={"Home"} />
                  </ListItem>
                  { isLoggedIn ?  
                    <ListItem button key="Meals" onClick={ (e) => this.props.history.push("/meals")}>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary={"My Meals"} />
                  </ListItem>
                  :''
                  }
                  
                </List>
            </Drawer>
                <main
                    className={clsx(classes.content, {
                    [classes.contentShift]: this.state.openDrawer,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    {this.props.children}
                </main>
         </div>
            
            
        )
    }
}


const mapStateToProps = state => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      username: state.auth.username  
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openSignUpDialog: () =>  dispatch(actions.openSignUpDialog()),
        showLoginDialog: () => dispatch(actions.showLoginDialog()),
        checkAutoLogin: () => dispatch(actions.checkAutoLogin()),
        logoutUser: () => dispatch(actions.logoutUser())
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(useStyles)(withRouter(Layout)));