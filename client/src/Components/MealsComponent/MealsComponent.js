import React , { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { withRouter, Redirect  } from 'react-router-dom';
import * as actions from '../../store/actions/index';

import AddMealDialog from '../../Dialogs/AddMealsDialog';
import Spinner from '../../Reusables/loadingSpinner';

//Date
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

var monthNames = [
 "Jan",
 "Feb",
 "Mar",
 "Apr",
 "May",
 "Jun",
 "Jul",
 "Aug",
 "Sep",
 "Oct",
 "Nov",
 "Dec"
]

class MealsComponent extends Component {

    state = {
        initialDataFetch: false,
        fromDate:new Date(),
        toDate: new Date()
    }

    componentDidMount(){
        if(!this.props.isLoggedIn){
            this.props.history.push("/");
        } else {
            this.props.getUsersMeals();
        }
    }

    openMealsDialog = () => {
        this.props.openMealsDialog();
    }

   componentWillReceiveProps(props){
       if(props.token != "" && !this.state.initialDataFetch){
           this.props.getUsersMeals();
           this.setState({initialDataFetch:true})
       }
   }

    handleFromDateChange = (date) => {
        this.setState({fromDate:date})
        this.props.setFromDate(date);
    };

    handleToDateChange = (date) => {
        this.setState({toDate:date});
        this.props.setToDate(date);
    };

    getMealsWithFilters = () => {
        this.props.getUsersMeals();
    }

    deleteItem = (id) => {
        this.props.deleteItem(id);
    }



    displayDate = (d) => {
        let date = new Date(d);
        let displayDate = date.getDate() +" "+ monthNames[date.getMonth()]+" "+date.getFullYear();
        return displayDate; 
    }

    getCalorieColor = (d) => {
        let color = "primary";
        if(this.props.is_admin) return color;
        let date = new Date(d);
        let displayDate = date.getDate() +"-"+date.getMonth()+"-"+date.getFullYear();
        let dateCaloriesArr = this.props.userMealsList.dateCalories;
        dateCaloriesArr.map(e => {
            if(e.includes(displayDate)){
                let arr = e.split("=");
                let totalCalories = parseInt(arr[1]);
                if(totalCalories > parseInt(this.props.expected_calories)) {
                    color = "secondary"
                } else {
                    color = "primary";
                }
            }
        })

        return color;
    }

    render(){
        const { showLoader , userMealsList , is_admin  } = this.props;
        return(
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item sm={12} md={12} lg={8}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="From Date"
                                value={this.state.fromDate}
                                onChange={this.handleFromDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <KeyboardDatePicker
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="To Date"
                                value={this.state.toDate}
                                onChange={this.handleToDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            &nbsp; &nbsp;
                            <Button style={{marginTop:20}} onClick={this.getMealsWithFilters} variant="contained" color="primary">
                                 Submit
                            </Button>
                            <p> <b>Maximum Calories for the day: {this.props.expected_calories} </b> </p>
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item lg={4} dir="rtl">
                        <Button onClick={this.openMealsDialog} variant="contained" color="primary">
                            Add My Meal
                        </Button>
                    </Grid>
                    <Grid item sm={12} md={12} lg={12}>
        
                    </Grid>
                </Grid>
                <AddMealDialog />
                <Grid item></Grid>
                { showLoader ?  <Spinner /> : '' }
               {  (userMealsList.userMeals !== undefined &&  userMealsList.userMeals.length > 0) ? 
               
               <TableContainer component={Paper}>
                    <Table style={{minWidth:500}} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            { is_admin ? <TableCell> <b> Username </b> </TableCell> : '' }
                            <TableCell> <b> Meal </b></TableCell>
                            <TableCell align="right"><b>Calories</b></TableCell>
                            <TableCell align="center"><b>Date</b></TableCell>
                            <TableCell align="left"><b>Actions</b></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {userMealsList.userMeals.map(row => (
                            
                            <TableRow key={row.name}>
                            { is_admin ? 
                                <TableCell> {row.username} </TableCell>                                
                                :''
                            }
                            <TableCell component="th" scope="row">
                            <Chip
                                
                                icon={<FaceIcon />}
                                label={row.meal}
                                clickable
                                color={this.getCalorieColor(row.date)}
                                deleteIcon={<DoneIcon />}
                            />

                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="center">{ this.displayDate(row.date)}</TableCell>
                            <TableCell align="left">
                                    <DeleteIcon color="secondary" onClick={ () => this.deleteItem(row._id)}></DeleteIcon>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    :''
               }
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        showLoader: state.auth.showLoader,
        token: state.auth.token,
        userMealsList: state.meal.userMealsList,
        expected_calories: state.auth.expected_calories,
        is_admin: state.auth.is_admin,
        isLoggedIn: state.auth.isLoggedIn
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        openMealsDialog: () => dispatch(actions.showMealDialog()),
        getUsersMeals: () => dispatch(actions.getUserMeals()),
        deleteItem: (id) => dispatch(actions.deleteMeal(id)),
        setFromDate: (date) => dispatch(actions.setFromDate(date)),
        setToDate: (date) => dispatch(actions.setToDate(date))
    }

  }
  
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(MealsComponent));
  
