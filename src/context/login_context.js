import React, {useContext, useEffect, useReducer, useState} from 'react';
import {AsyncStorage} from 'react-native';
import {
  CHECK_LOGIN_BEGIN,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGIN_ERROR,
  RESTORE_TOKEN,
  USER_ID,
  USER_ROLE,
  LOGOUT_USER,
  RESTORE_LOGIN,
  PROFILE_BEGIN_ERROR,
  PROFILE_BEGIN_SUCCESS,
  PROFILE_BEGIN,
  RESTORE_ROLE,
  RESTORE_NAME,
} from '../utils/action';
import {
  login_check_url,
  BASE_URL,
  ACCEPT_HEADER,
  profile_url,
} from '../utils/baseurl';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import Login_reducers from '../reducer/login_reducer';

const Logincontext = React.createContext();
const initialState = {
  login_loading: false,
  token: '',
  role: '',
  islogin: false,
  profile_loading: false,
  profile: '',
  user_id: '',
  username: '',
  users: '',
};

export const Loginprovider = ({children}) => {
  const [state, dispatch] = useReducer(Login_reducers, initialState);
  const [refresh, setRefresh] = useState('');

  const Loginapi = async (param, props) => {
    dispatch({type: CHECK_LOGIN_BEGIN});
    console.log('formdata', param);
    axios
      .post(login_check_url, param, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      })
      .then(async res => {
        console.log('res-login', JSON.stringify(res.data, null, 2));
        AsyncStorage.setItem('token', res.data.token);
        if (res.data.success === 1) {
          AsyncStorage.setItem('role', res.data.user.role);
          AsyncStorage.setItem('name', res.data.user.name);
          AsyncStorage.setItem('userinfo', JSON.stringify(res.data.user));
          dispatch({
            type: CHECK_LOGIN_SUCCESS,
            payload: res.data.user,
          });
          Toast.show('Login Successfully.');
          await AsyncStorage.setItem('islogin', 'yes');
          props.navigation.navigate('Mytabs');
          await setRefresh(1);
        } else {
          Toast.show('something went wrong please try again.');
          dispatch({type: CHECK_LOGIN_ERROR});
        }
      })
      .catch(err => {
        console.log('err', err);
        dispatch({type: CHECK_LOGIN_ERROR});
      });
  };

  // const Getprofile = async (pro, props) => {
  //   var Token = await AsyncStorage.getItem('token');
  //   dispatch({type: PROFILE_BEGIN});
  //   axios
  //     .get(profile_url, {
  //       headers: {
  //         Accept: ACCEPT_HEADER,
  //         Authorization: 'Bearer ' + Token,
  //       },
  //     })
  //     .then(res => {
  //       if (res.data.status === 'Token is Expired') {
  //         setLogout();
  //       } else {
  //         if (res.data.success === 1)
  //           dispatch({type: PROFILE_BEGIN_SUCCESS, payload: res.data.user});
  //       }
  //     })
  //     .catch(err => {
  //       dispatch({type: PROFILE_BEGIN_ERROR});
  //     });
  // };

  const setLogout = async props => {
    await dispatch({type: LOGOUT_USER});
    await props.navigation.reset({
      routes: [{name: 'Welcome'}],
    });
    await setRefresh(2);
  };
  useEffect(() => {
    AsyncStorage.getItem('islogin').then(value => {
      if (value) {
        dispatch({type: RESTORE_LOGIN, payload: JSON.parse(value)});
      }
    });
    AsyncStorage.getItem('token').then(value => {
      if (value) {
        // console.log("----------", value);
        dispatch({type: RESTORE_TOKEN, payload: value});
      }
    });
    AsyncStorage.getItem('role').then(value => {
      if (value) {
        console.log('role---------->', value);
        dispatch({type: RESTORE_ROLE, payload: JSON.parse(value)});
      }
    });
    AsyncStorage.getItem('name').then(value => {
      if (value) {
        console.log('name---------->', value);
        dispatch({type: RESTORE_NAME, payload: value});
      }
    });

    AsyncStorage.getItem('login_param').then(value => {
      if (value) {
        console.log('-------', value);
      }
    });
  }, [refresh]);
  return (
    <Logincontext.Provider
      value={{
        ...state,
        Loginapi,
        setLogout,
        // Getprofile,
      }}>
      {children}
    </Logincontext.Provider>
  );
};

export const useLoginContext = () => {
  return useContext(Logincontext);
};
