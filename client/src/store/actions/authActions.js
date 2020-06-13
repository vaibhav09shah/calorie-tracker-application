import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as config from '../../config';


export const openSignUpDialog = () => {
    return {
        type: actionTypes.OPEN_SIGNUP_DIALOG
    }
}

export const closeSignUpDialog = () => {
    return {
        type: actionTypes.CLOSE_SIGNUP_DIALOG
    }
}

export const showLoader = () => {
    return {
        type: actionTypes.SHOW_LOADER
    }
}

export const showSignUpError = (msg) => {
    return {
        type: actionTypes.SHOW_SIGNUP_ERROR,
        payload:msg

    }
}

export const showSignUpSuccess = (msg) => {
    return {
        type: actionTypes.SHOW_SIGNUP_SUCCESS,
        payload: msg
    }
}

export const closeMsgDialog = () => {
    return {
        type: actionTypes.HIDE_MSG_DIALOG
    }
}

export const showLoginDialog = () => {
    return {
        type: actionTypes.SHOW_LOGIN_DIALOG
    }
}

export const closeLoginDialog = () => {
    return {
        type: actionTypes.HIDE_LOGIN_DIALOG
    }
}

export const submitSignUpForm = (formData) => dispatch => {
    dispatch(showLoader());
    let finalFormData = {
        username: formData.name.value,
        email: formData.emailId.value,
        password: formData.password.value,
        expected_calories: formData.expectedCalories.value,
        is_admin: formData.isAdmin.value,
    }
    //console.log(finalFormData);
    axios.post(config.signUpAPI,finalFormData)
         .then(response => {
             dispatch(showSignUpSuccess(response.data.message))
         })
         .catch(err => {
             dispatch(showSignUpError(err.response.data.message));
             console.log( 'err', err.response);
    })
}

export const submitLoginForm = (loginData) => dispatch => {
    dispatch(showLoader())
    let finalForm = {
        email: loginData.emailId.value,
        password: loginData.password.value
    }

    axios.post(config.loginAPI,finalForm)
         .then(response => {
            dispatch(userLoginSuccessful(response.data))
         })
         .catch(err => {
             dispatch(userLoginFailure(err.response.data.message))
             console.log('err ',err.response);
         })
}

export const userLoginFailure = (msg) => {
    return {
        type: actionTypes.USER_LOGIN_FAILURE,
        payload: msg
    }
} 

export const userLoginSuccessful = (userData) => {
    localStorage.setItem('userDetails',JSON.stringify(userData));
    localStorage.setItem('expirationTime',new Date(new Date().getTime() + 60 * 60 * 1000));  // One Hour
    return {
        type: actionTypes.USER_LOGIN_SUCCESS,
        payload: userData
    }
}

export const checkAutoLogin =  () => dispatch =>  {
    const expiryTime = new Date(localStorage.getItem('expirationTime'));
    if(expiryTime >= new Date()) {
        let userDetailsString = localStorage.getItem('userDetails');
        let userDetails = JSON.parse(userDetailsString);
        dispatch(userLoginSuccess(userDetails)) 
    } else {
        dispatch(logoutUser());
    }
}


export const userLoginSuccess = (userDetails) => {
    return {
        type: actionTypes.USER_LOGIN_SUCCESS,
        payload: userDetails
    }
}

export const logoutUser = () => {
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userDetails');
    return {
        type: actionTypes.LOGOUT_USER
    }
}

export const setRedirectFalse = () => {
    return {
        type: actionTypes.SET_REDIRECT_FALSE
    }
}