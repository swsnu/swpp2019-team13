import * as actionTypes from "./actionTypes";

// TODO : implement actions
export const signIn_ = () => {
  return {
    type: actionTypes.SIGN_IN
  };
};

export const signIn = () => {
  return dispatch => {
    dispatch(signIn_());
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

export const signUp_ = () => {
  return {
    type: actionTypes.SIGN_UP
  };
};

export const signUp = () => {
  return dispatch => {
    dispatch(signUp_());
  };
};

export const getUserByID_ = id => {
  return {
    type: actionTypes.GET_USER_BY_ID
  };
};

export const getUserByID = id => {
  return dispatch => {
    dispatch(getUserByID_(id));
  };
};
