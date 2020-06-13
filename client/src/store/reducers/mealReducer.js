import * as actionTypes from '../actions/actionTypes';

const initialState = {
    showMealDialog: false,
    addMealErrMsg:"",
    showSpinner:false,
    clearMealsInput:false,
    userMealsList:[],
    fromDate:new Date(),
    toDate: new Date()
}


const showMealsDialog = (state,action) => {
    return {
        ...state,
        showMealDialog: true
    }
}

const hideMealssDialog = (state,action) => {
    return {
        ...state,
        showMealDialog: false,
        clearMealsInput: true
    }
}

const setAddMealErrMsg = (state,action) => {
    return {
        ...state,
        addMealErrMsg: action.payload,
        showMealDialog: true,
        showSpinner:false
    }
}

const showMealsSpinner = (state,action) => {
    return {
        ...state,
        showSpinner: true
    }
}

export const hideMealSpinner = (state,action) => {
    return {
        ...state,
        showSpinner: false
    }
}

export const setUserMeals = (state,action) => {
    return {
        ...state,
        userMealsList:action.payload
    }
}

export const setFromDate = (state,action) => {
    return {
        ...state,
        fromDate: new Date(action.payload)
    }
}

export const setToDate = (state,action) => {
    return {
        ...state,
        toDate: new Date(action.payload)
    }
}


const reducer = (state = initialState , action) => {
    switch(action.type){
        case actionTypes.SHOW_MEAL_DIAOLOG: return showMealsDialog(state,action);
        case actionTypes.HIDE_MEAL_DIAOLOG: return hideMealssDialog(state,action);
        case actionTypes.SET_ADD_MEAL_ERR_MSG: return setAddMealErrMsg(state,action);
        case actionTypes.SHOW_MEAL_DIAOLOG: return showMealsSpinner(state,action);
        case actionTypes.HIDE_LOADER_MEALS: return hideMealSpinner(state,action);
        case actionTypes.SET_USER_MEALS: return setUserMeals(state,action);
        case actionTypes.SET_FROM_DATE: return setFromDate(state,action);
        case actionTypes.SET_TO_DATE: return setToDate(state,action)
        default: return state
    }
}

export default reducer