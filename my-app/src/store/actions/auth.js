import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
        };
        let url = 'http://localhost:3003/auth';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwexXImK-Nmg_K8gpL74HB-sOv9xpwVPM'
        }
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.LocalId);
                dispatch(authSuccess(response.data.idToken, response.data.LocalId));
            })
            .catch(err => {
                dispatch(authFailed(err.response.data));
            })
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
  return dispatch => {
      const token = localStorage.getItem('token');
      if (token) {
          const userId = localStorage.getItem('userId');
          dispatch(authSuccess(token,userId));
      } else {
              dispatch(logout())
      }
  }
};