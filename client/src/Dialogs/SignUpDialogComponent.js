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

class SignUpDialogComponent extends Component {
   
    state = {
        formData:{
            name:{
                value:"",
                error:false,
                validate:true
            },
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
            expectedCalories:{
                value:"",
                error:false,
                validate:true
            },
            isAdmin:{
                value:false,
                validate:false
            }   
        }
    }

    showErrorMessage = () => {
        if(this.props.signUpErrorMsg != "") {
            return (
            <Alert severity="error">{this.props.signUpErrorMsg}</Alert>
            )
        }
    }

    closeSignUpDialog = () => {
        this.props.closeSignUpDialog();
    }

    selectAdmin = (event) => {
        let formData = this.state.formData; 
        formData.isAdmin.value = event.target.checked;
        this.setState({
            formData: formData
        }) 
    }
    updateInputValues = (event,field) => {

        let formData = this.state.formData;
        switch (field) {
            case 'name':
                  formData.name.value = event.target.value;
                  break;
            case 'emailId':
                   formData.emailId.value = event.target.value;
                   break;
            case 'password':
                  formData.password.value = event.target.value;
                  break
            case 'expectedCalories':
                   formData.expectedCalories.value = event.target.value 
            default:
                break;
        }

        this.setState({formData:formData})
    }

    clearError = (event,field) => {
        let formData = this.state.formData;
        switch (field) {
            case 'name':
                formData.name.error = false;
                break;
          case 'emailId':
                 formData.emailId.error = false;
                 break;
          case 'password':
                formData.password.error = false;
                break
          case 'expectedCalories':
                 formData.expectedCalories.error = false 
          default:
              break;
        }

        this.setState({formData:formData})
    }



    submitSignUpForm = () => {

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
        if(submitFlag) this.props.submitSignUpForm(this.state.formData);
    }


    componentWillReceiveProps(props){
        if(props.clearSignUpData) {
            let formData = this.state.formData;
            Object.keys(formData).forEach(function(key) {
               formData[key].value = "" 
                formData[key].error = false;
            });
        }
    }

    render(){

        const { openSignUpDialogFlag } = this.props;

        return (
            <div>
                <Dialog fullWidth open={openSignUpDialogFlag} onClose={this.closeSignUpDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {this.showErrorMessage()}
                    </DialogContentText>
                    <TextField
                        
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        value={this.state.formData.name.value}
                        onChange={ (e) =>  this.updateInputValues(e,'name')}
                        onFocus={(e) => this.clearError(e,'name')}
                        error={this.state.formData.name.error}
                        fullWidth
                    />

                    
                    <TextField
                        
                        margin="dense"
                        id="email"
                        label="Email ID"
                        type="text"
                        value={this.state.formData.emailId.value}
                        error={this.state.formData.emailId.error}
                        onChange={ (e) =>  this.updateInputValues(e,'emailId')}
                        onFocus={(e) => this.clearError(e,'emailId')}
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
                        onFocus={(e) => this.clearError(e,'password')}
                        fullWidth
                        style={{marginTop:20}}
                    />
                    
                    <TextField
                        
                        margin="dense"
                        id="calories"
                        label="Expected Calories"
                        type="number"
                        value={this.state.formData.expectedCalories.value}
                        error={this.state.formData.expectedCalories.error}
                        onChange={ (e) =>  this.updateInputValues(e,'expectedCalories')}
                        onFocus={(e) => this.clearError(e,'expectedCalories')}
                        fullWidth
                        style={{marginTop:20}}
                    />

                    <FormControlLabel
                        control={<Switch checked={this.state.formData.isAdmin.value} onChange={this.selectAdmin} name="Admin Switch" />}
                        label="Is Admin ?"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeSignUpDialog} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={this.submitSignUpForm} color="primary">
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
       openSignUpDialogFlag: state.auth.openSignUpDialog,
       signUpErrorMsg: state.auth.signUpErrorMsg,
       clearSignUpData: state.auth.clearSignUpData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeSignUpDialog: () => dispatch(actions.closeSignUpDialog()),
        submitSignUpForm: (formData) => dispatch(actions.submitSignUpForm(formData))
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(SignUpDialogComponent);