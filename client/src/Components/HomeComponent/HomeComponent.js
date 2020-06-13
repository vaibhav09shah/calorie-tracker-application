import React , { Component } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { Route , Switch , withRouter , Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Spinner from '../../Reusables/loadingSpinner';
import SignUpDialogComponent from '../../Dialogs/SignUpDialogComponent';
import LoginDialogComponent from '../../Dialogs/LoginDialogComponent';
import MsgDialog from '../../Dialogs/msgDialog';
import * as actions from '../../store/actions/index';


class HomeComponent extends Component {

    closeMsgDialog = () => {
        this.props.closeMsgDialog();
    }

    showLoginDialog = () => {
        this.closeMsgDialog();
        this.props.showLoginDialog();
    }

    componentWillReceiveProps(props){
        if(props.redirectToMeals){
            props.history.push('/meals');
            this.props.setRedirectFalse();
        }
    }

    render(){
        const { showLoader , showMsgDialog , signUpSuccessMsg} = this.props;
        return(
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item sm={12} md={12} lg={12}>
                        <div style={{minHeight:200}}>

                        </div>
                    </Grid>
                    <Grid item sm={12} md={12} lg={4}></Grid>
                    <Grid item sm={12} md={12} lg={8}>
                        {
                            showLoader ? 
                            <Spinner />
                            :
                            <Typography variant="h6">
                                Welcome to Meals Calorie Tracker Application 
                            </Typography>
                        }
                        
                    </Grid>
                    </Grid>
                    <SignUpDialogComponent />
                    <LoginDialogComponent />
                    <MsgDialog 
                        show={showMsgDialog}
                        closeMsgDialog={this.closeMsgDialog}
                        severity="success"
                        message={signUpSuccessMsg}
                        showLogin={this.showLoginDialog}
                    />
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
      showLoader: state.auth.showLoader,
      showMsgDialog: state.auth.showMsgDialog,
      signUpSuccessMsg: state.auth.signUpSuccessMsg,
      redirectToMeals: state.auth.redirectToMeals
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
       closeMsgDialog: () => dispatch(actions.closeMsgDialog()),
       showLoginDialog: () => dispatch(actions.showLoginDialog()),
       setRedirectFalse: () => dispatch(actions.setRedirectFalse())
    }
  
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HomeComponent));
  