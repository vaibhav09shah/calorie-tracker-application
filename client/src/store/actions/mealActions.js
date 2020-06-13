import * as actionTypes from './actionTypes';
import axios from 'axios';
import store from '../store';
import * as config from '../../config';

export const showMealDialog = () => {
    return {
        type: actionTypes.SHOW_MEAL_DIAOLOG
    }
}

export const hideMealDialog = () => {
    return {
        type: actionTypes.HIDE_MEAL_DIAOLOG
    }
}

export const showSpinner = () => {
    return {
        type: actionTypes.SHOW_LOADER_MEALS
    }
}

export const hideSpinner = () => {
    return {
        type: actionTypes.HIDE_LOADER_MEALS
    }
}

export const addMeal = (mealData) => dispatch => {
    dispatch(hideMealDialog());
    dispatch(showSpinner());
    var storeData =  store.getState();
    let token = storeData.auth.token
    var headers = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let addMealData = {
        meal: mealData.mealName.value,
        calories: mealData.calories.value,
        userId: storeData.auth.id,
        emailId: storeData.auth.email,
        username: storeData.auth.username
    }
    axios.post(config.addMealAPI , addMealData , headers )
         .then(response => {
             dispatch(addedMealsSuccess());
         })
         .catch(err => {
             console.log(err.response);
             dispatch(addMealFailure(err.response.data.message));
             
         })
}

export const addMealFailure = (message) =>  {
    return {
        type: actionTypes.SET_ADD_MEAL_ERR_MSG,
        payload:message
    }
}


export const addedMealsSuccess = () => dispatch =>  {
    // Close Dialog
    // Update Meals List
    //dispatch(hideSpinner())
    dispatch(getUserMeals())
}

export const showMealAddedSuccessFulDialog = () => {

}
export const setFromDate = (date) => {
    return {
        type:actionTypes.SET_FROM_DATE,
        payload: date
    }
}

export const setToDate = (date) => {
    return {
        type:actionTypes.SET_TO_DATE,
        payload: date
    }
}

export const getUserMeals = () => dispatch => {
    var storeData =  store.getState();

    var fromDate = storeData.meal.fromDate;
    var toDate =  storeData.meal.toDate;
    fromDate.setHours(0,0,0);
    toDate.setHours(23,59,59);

    let token = storeData.auth.token
    var headers = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let body = {
        id:storeData.auth.id,
        fromDate: fromDate,
        toDate: toDate,
        is_admin: storeData.auth.is_admin
    }

    axios.post(config.getUserMeals , body , headers)
          .then(response => {
              dispatch({
                type: actionTypes.SET_USER_MEALS,
                payload: response.data                  
            })
              
          })
          .catch(err => {
              console.log(err)
          })
}

export const deleteMeal = (id) => dispatch =>  {
    console.log(id);
    var storeData =  store.getState();
    let token = storeData.auth.token
    var headers = {
        headers: { Authorization: `Bearer ${token}` }
    };

    axios.delete(config.deleteMealAPI+"/"+id, headers)
         .then(response => {
             console.log(response);
             dispatch(getUserMeals())
         })
         .catch(err => {
             console.log(err)
         })
}