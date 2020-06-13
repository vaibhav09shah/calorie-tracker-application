import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    openSignUpDialog: false,
    showLoader: false,
    signUpErrorMsg:'',
    showMsgDialog: false,
    showLoginDialog: false,
    clearSignUpData: false,
    isLoggedIn: false,
    userDetails:{},
    username:"",
    token:"",
    id:"",
    loginErrorMsg:"",
    clearLoginInputs:false,
    redirectToMeals:false
}

const openSignUpDialog = (state,action) => {
    return {
        ...state,
        openSignUpDialog: true
    }
}

const closeSignUpDialog = (state,action) => {
    return {
        ...state,
        openSignUpDialog: false
    }
}

const showLoader = (state,actio) => {
    return {
        ...state,
        showLoader: true,
        openSignUpDialog: false,
        showLoginDialog: false
    }
}

const showSignUpError = (state,action) => {
    return {
        ...state,
        openSignUpDialog: true,
        showLoader: false,
        signUpErrorMsg: action.payload
    }
}

const showSignUpSuccess = (state,action) => {
    return {
        ...state,
        showLoader:false,
        signUpSuccessMsg:action.payload,
        showMsgDialog: true,
        clearSignUpData: true
    }
}

const hideMsgDialog = (state,action) => {
    return {
        ...state,
        showMsgDialog: false
    }
}

const showLoginDialog = (state,action) => {
    return {
        ...state,
        showLoginDialog: true
    }
}

const hideLoginDialog = (state,action) => {
    return {
        ...state,
        showLoginDialog: false,
        loginErrorMsg:""
    }
}

const userLoginSuccess = (state,action) => {
    return {
        ...state,
        isLoggedIn: true,
        showLoader: false,
        username: action.payload.name,
        token: action.payload.token,
        email:action.payload.email,
        id:action.payload.id,
        is_admin: action.payload.is_admin,
        expected_calories: action.payload.expected_calories,
        clearLoginInputs:true,
        redirectToMeals:true
    }
}

const logoutUser = (state) => {
    return {
        ...state,
        isLoggedIn: false,
        username: "",
        token:"",
        id:""
    }
}

const userLoginFailure = (state,action) => {
    return {
        ...state,
        showLoginDialog: true,
        loginErrorMsg: action.payload,
        showLoader: false,
    }
}

const setRedirectFalse = (state,action) => {
    return {
        ...state,
        redirectToMeals:false
    }
}

const hideLoader = (state,action) => {
    return {
        ...state,
        showLoader: false
    }
}

const reducer = (state = initialState , action) => {
    switch (action.type) {    
        case actionTypes.OPEN_SIGNUP_DIALOG: return openSignUpDialog(state,action);
        case actionTypes.CLOSE_SIGNUP_DIALOG: return closeSignUpDialog(state,action);
        case actionTypes.SHOW_LOADER: return showLoader(state,action);
        case actionTypes.SHOW_SIGNUP_ERROR: return showSignUpError(state,action);
        case actionTypes.SHOW_SIGNUP_SUCCESS: return showSignUpSuccess(state,action);
        case actionTypes.HIDE_MSG_DIALOG: return hideMsgDialog(state,action);
        case actionTypes.SHOW_LOGIN_DIALOG: return showLoginDialog(state,action);
        case actionTypes.HIDE_LOGIN_DIALOG: return hideLoginDialog(state,action);
        case actionTypes.USER_LOGIN_SUCCESS: return userLoginSuccess(state,action);
        case actionTypes.LOGOUT_USER: return logoutUser(state);
        case actionTypes.USER_LOGIN_FAILURE: return userLoginFailure(state,action);
        case actionTypes.SET_REDIRECT_FALSE: return setRedirectFalse(state,action);
        case actionTypes.HIDE_LOADER: return hideLoader(state,action);
        default:
            return state;
    }
}

export default reducer;