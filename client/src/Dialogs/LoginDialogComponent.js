import React , { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../store/actions/index';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '@material-ui/lab/Alert';

class LoginDialogComponent extends Component {
   
    state = {
        formData:{

            emailId:{
                value:"",
                error:false,
                validate:true
            },
            password:{
                value:"",
                error:false,
                validate:true
            },

        }
    }


    showErrorMessage = () => {
        if(this.props.loginErrorMsg != "") {
            return (
            <Alert severity="error">{this.props.loginErrorMsg}</Alert>
            )
        }
    }

    closeLoginDialog = () => {
        let formData = this.state.formData;
        formData.emailId.value = "";
        formData.emailId.error = false
        formData.password.value = "";
        formData.password.error = false

        this.props.closeLoginDialog();
    }



    updateInputValues = (event,field) => {

        let formData = this.state.formData;
        switch (field) {
            case 'emailId':
                   formData.emailId.value = event.target.value;
                   break;
            case 'password':
                  formData.password.value = event.target.value;
                  break
            default:
                break;
        }

        this.setState({formData:formData})
    }

    submitLoginForm = () => {

        let formData = this.state.formData
        let submitFlag = true;
        let finalFormData = {};
        Object.keys(formData).forEach(function(key) {
            if(formData[key].validate){
                if(formData[key].value == "" )  {
                    formData[key].error = true;
                    submitFlag = false
                } 
            }
        });
        
        this.setState({formData:formData});
        if(submitFlag) this.props.submitLoginForm(this.state.formData);
    }


    componentWillReceiveProps(props){
        if(props.clearLoginInputs) {
            let formData = this.state.formData;
            Object.keys(formData).forEach(function(key) {
               formData[key].value = "" 
                formData[key].error = false;
            });
        }
    }

    render(){
        const { showLoginDialog } = this.props;
        return (
            <div>
                <Dialog fullWidth open={showLoginDialog} onClose={this.closeLoginDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {this.showErrorMessage()}
                    </DialogContentText>
                    
                    <TextField
                        
                        margin="dense"
                        id="email"
                        label="Email ID"
                        type="text"
                        value={this.state.formData.emailId.value}
                        error={this.state.formData.emailId.error}
                        onChange={ (e) =>  this.updateInputValues(e,'emailId')}
                        fullWidth
                        style={{marginTop:20}}

                    />

                    <TextField
                        
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        value={this.state.formData.password.value}
                        error={this.state.formData.password.error}
                        onChange={ (e) =>  this.updateInputValues(e,'password')}
                        fullWidth
                        style={{marginTop:20}}
                    />
                    

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeLoginDialog} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={this.submitLoginForm} color="primary">
                    Submit
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        showLoginDialog: state.auth.showLoginDialog,
        loginErrorMsg: state.auth.loginErrorMsg,
        clearLoginInputs: state.auth.clearLoginInputs,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeLoginDialog: () => dispatch(actions.closeLoginDialog()),
        submitLoginForm: (formData) => dispatch(actions.submitLoginForm(formData))
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(LoginDialogComponent);