
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
import Grid from '@material-ui/core/Grid';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


class AddMealsDialog extends Component {
   
    state = {
        formData:{

            mealName:{
                value:"",
                error:false,
                validate:true
            },
            calories:{
                value:"",
                error:false,
                validate:true
            }

        }
    }


    showErrorMessage = () => {
        if(this.props.addMealErrMsg != "") {
            return (
            <Alert severity="error">{this.props.addMealErrMsg}</Alert>
            )
        }
    }

    closeMealDialog = () => {
        let formData = this.state.formData;
        formData.mealName.value = "";
        formData.mealName.error = false
        formData.calories.value = "";
        formData.calories.error = false

        this.props.closeMealDialog();
    }



    updateInputValues = (event,field) => {

        let formData = this.state.formData;
        switch (field) {
            case 'mealName':
                   formData.mealName.value = event.target.value;
                   break;
            case 'calories':
                  formData.calories.value = event.target.value;
                  break
            default:
                break;
        }

        this.setState({formData:formData})
    }

    clearError = (event,field) => {
        let formData = this.state.formData;
        switch (field) {
            case 'mealName':
                   formData.mealName.error = false;
                   break;
            case 'calories':
                  formData.calories.error = false;
                  break
            default:
                break;
        }

        this.setState({formData:formData})
    }

    addMeal = () => {

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
        console.log(this.state)
        
        if(submitFlag) this.props.addMeal(this.state.formData);
    }

    componentWillReceiveProps(props){
        if(props.clearMealsInput) {
            let formData = this.state.formData;
            Object.keys(formData).forEach(function(key) {
               formData[key].value = "" 
                formData[key].error = false;
            });
        }
    }

    render(){
         const { showMealDialog } = this.props;
        return (
            <div>
                <Dialog fullWidth open={showMealDialog} onClose={this.closeMealDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Your Meal</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {this.showErrorMessage()}
                    </DialogContentText>
                    
                    <TextField
                        
                        margin="dense"
                        id="mealname"
                        label="Meal Name"
                        type="text"
                        value={this.state.formData.mealName.value}
                        error={this.state.formData.mealName.error}
                        onFocus={(e) => this.clearError(e,'mealName')}
                        onChange={ (e) =>  this.updateInputValues(e,'mealName')}
                        fullWidth
                        style={{marginTop:20}}

                    />

                    <TextField
                        
                        margin="dense"
                        id="calories"
                        label="calories"
                        type="number"
                        value={this.state.formData.calories.value}
                        error={this.state.formData.calories.error}
                        onFocus={ (e) =>  this.clearError(e,'calories') }
                        onChange={ (e) =>  this.updateInputValues(e,'calories')}
                        fullWidth
                        style={{marginTop:20}}
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeMealDialog} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={this.addMeal} color="primary">
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
        showMealDialog: state.meal.showMealDialog,
        addMealErrMsg: state.meal.addMealErrMsg,
        clearMealsInput: state.meal.clearMealsInput
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeMealDialog: () => dispatch(actions.hideMealDialog()),
        addMeal: (mealData) => dispatch(actions.addMeal(mealData))
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(AddMealsDialog);