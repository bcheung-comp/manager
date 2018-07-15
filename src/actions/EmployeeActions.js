import firebase from 'firebase';
import NavigationService from '../navigators/NavigationService';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_SAVE,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEES_FETCH,
  EMPLOYEES_FETCH_SUCCESS
} from './types';

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const employeeCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    dispatch({ type: EMPLOYEE_CREATE });

    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(employeeCreateSuccess(dispatch));
  };
};

const employeeCreateSuccess = (dispatch) => {
  dispatch({
    type: EMPLOYEE_CREATE_SUCCESS,
  });
  NavigationService.goBack();
};

export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    dispatch({ type: EMPLOYEE_SAVE });

    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(employeeSaveSuccess(dispatch));
  };
};

const employeeSaveSuccess = (dispatch) => {
  dispatch({
    type: EMPLOYEE_SAVE_SUCCESS,
  });
  NavigationService.goBack();
};

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    dispatch({ type: EMPLOYEES_FETCH });
    
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
