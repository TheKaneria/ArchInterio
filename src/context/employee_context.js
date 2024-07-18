import {AsyncStorage} from 'react-native';
import Employee_reducers from '../reducer/employee_reducer';
import {useLoginContext} from './login_context';
import axios from 'axios';
import {
  ADDEMPLOYEE_BEGIN,
  ADDEMPLOYEE_BEGIN_ERROR,
  ADDEMPLOYEE_BEGIN_SUCCESS,
  GETEMPLOYEE_BEGIN,
  GETEMPLOYEE_BEGIN_ERROR,
  GETEMPLOYEE_BEGIN_SUCCESS,
  UPDATEEMPLOYEE_BEGIN,
  UPDATEEMPLOYEE_BEGIN_ERROR,
  UPDATEEMPLOYEE_BEGIN_SUCCESS,
} from '../utils/action';
import {
  ACCEPT_HEADER,
  add_employee_url,
  getemployee_url,
  update_employee_url,
} from '../utils/baseurl';
import React, {useContext, useReducer} from 'react';
import SimpleToast from 'react-native-simple-toast';

const Employeecontext = React.createContext();
const initialState = {
  employee_loading: false,
  employee_array: [],
  add_employee_loading: false,
  update_employee_loading: false,
};

export const Employeeprovider = ({children}) => {
  const {setLogout} = useLoginContext();
  const [state, dispatch] = useReducer(Employee_reducers, initialState);

  const GetEmployee = async props => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: GETEMPLOYEE_BEGIN});
    axios
      .get(getemployee_url, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        // console.log('res-getclint', res.data);
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else {
          if (res.data.success === 1)
            dispatch({type: GETEMPLOYEE_BEGIN_SUCCESS, payload: res.data.data});
        }
      })
      .catch(err => {
        dispatch({type: GETEMPLOYEE_BEGIN_ERROR});
      });
  };

  const Add_Employee = async (props, formdata) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: ADDEMPLOYEE_BEGIN});
    axios
      .post(add_employee_url, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else {
          if (res.data.success === 1) {
            SimpleToast.show(res.data.message);
            props.navigation.goBack(null);
          }
          dispatch({
            type: ADDEMPLOYEE_BEGIN_SUCCESS,
          });
        }
      })
      .catch(err => {
        console.log('errr', JSON.stringify(err, null, 2));
        dispatch({type: ADDEMPLOYEE_BEGIN_ERROR});
      });
  };
  const UPdate_Employee = async (props, formdata) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: UPDATEEMPLOYEE_BEGIN});
    axios
      .post(update_employee_url, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else {
          if (res.data.success === 1) {
            SimpleToast.show(res.data.message);
            props.navigation.goBack(null);
          }
          dispatch({
            type: UPDATEEMPLOYEE_BEGIN_SUCCESS,
          });
        }
      })
      .catch(err => {
        console.log('errr', JSON.stringify(err, null, 2));
        dispatch({type: UPDATEEMPLOYEE_BEGIN_ERROR});
      });
  };

  return (
    <Employeecontext.Provider
      value={{
        ...state,
        GetEmployee,
        Add_Employee,
        UPdate_Employee,
      }}>
      {children}
    </Employeecontext.Provider>
  );
};

export const useEmployeeContext = () => {
  return useContext(Employeecontext);
};
