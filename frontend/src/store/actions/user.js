import * as actionTypes from "./actionTypes";

// TODO : implement actions
export const signIn_ = user => {
  return {
    type: actionTypes.SIGN_IN,
    loggedUser: user
  };
};

export const signIn = user => {
  return dispatch => {
    dispatch(signIn_(user));
  };
};

export const signOut_ = () => {
  return {
    type: actionTypes.SIGN_OUT
  };
};

export const signOut = () => {
  return dispatch => {
    dispatch(signOut_());
  };
};

export const signUp_ = user => {
  return {
    type: actionTypes.SIGN_UP,
    user: user
  };
};

export const signUp = user => {
  return dispatch => {
    dispatch(signUp_(user));
  };
};
