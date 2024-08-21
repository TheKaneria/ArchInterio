import React, {useContext, useEffect, useReducer, useState} from 'react';
import {AsyncStorage} from 'react-native';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import Basic_reducers from '../reducer/basic_reducer';
import {useLoginContext} from './login_context';
import {
  ACCEPT_HEADER,
  add_client_url,
  get_city_url,
  get_country_url,
  get_state_url,
  getclient_url,
  gettype_url,
  update_client_url,
} from '../utils/baseurl';
import {
  ADDCLIENT_BEGIN,
  ADDCLIENT_ERROR,
  ADDCLIENT_SUCCESS,
  CITY_BEGIN,
  CITY_ERROR,
  CITY_SUCCESS,
  COUNTRY_BEGIN,
  COUNTRY_ERROR,
  COUNTRY_SUCCESS,
  GETCLIENT_BEGIN,
  GETCLIENT_BEGIN_ERROR,
  GETCLIENT_BEGIN_SUCCESS,
  GETTYPE_BEGIN,
  GETTYPE_BEGIN_ERROR,
  GETTYPE_BEGIN_SUCCESS,
  STATE_BEGIN,
  STATE_ERROR,
  STATE_SUCCESS,
  UPDATECLIENT_BEGIN,
  UPDATECLIENT_ERROR,
  UPDATECLIENT_SUCCESS,
} from '../utils/action';
import SimpleToast from 'react-native-simple-toast';

const Basiccontext = React.createContext();
const initialState = {
  type_loading: false,
  type_array: [],
  clint_loading: false,
  clint_array: [],
  add_clint_loading: false,
  update_clint_loading: false,
  counrty_array: [],
  state_array: [],
  city_array: [],
};

export const Basicprovider = ({children}) => {
  const {setLogout} = useLoginContext();
  const [state, dispatch] = useReducer(Basic_reducers, initialState);

  const GetTypeget = async props => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: GETTYPE_BEGIN});
    axios
      .get(gettype_url, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        // console.log('res-gettype', res.data);
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else {
          if (res.data.success === 1)
            dispatch({type: GETTYPE_BEGIN_SUCCESS, payload: res.data.data});
        }
      })
      .catch(err => {
        dispatch({type: GETTYPE_BEGIN_ERROR});
      });
  };

  const GetClint = async props => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: GETCLIENT_BEGIN});
    axios
      .get(getclient_url, {
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
            dispatch({type: GETCLIENT_BEGIN_SUCCESS, payload: res.data.data});
        }
      })
      .catch(err => {
        dispatch({type: GETCLIENT_BEGIN_ERROR});
        console.log('Error in Get Client ', err);
      });
  };

  const Add_Clent = async (props, formdata) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: ADDCLIENT_BEGIN});
    axios
      .post(add_client_url, formdata, {
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
            type: ADDCLIENT_SUCCESS,
          });
        }
      })
      .catch(err => {
        dispatch({type: ADDCLIENT_ERROR});
        console.log('Error in Adding Client ', err);
      });
  };

  const Update_Clent = async (props, formdata) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: UPDATECLIENT_BEGIN});
    axios
      .post(update_client_url, formdata, {
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
            type: UPDATECLIENT_SUCCESS,
          });
        }
      })
      .catch(err => {
        dispatch({type: UPDATECLIENT_ERROR});
      });
  };

  const get_Country = async props => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: COUNTRY_BEGIN});
    axios
      .get(get_country_url, {
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
            dispatch({type: COUNTRY_SUCCESS, payload: res.data.data});
        }
      })
      .catch(err => {
        dispatch({type: COUNTRY_ERROR});
      });
  };

  const get_State = async (props, id) => {
    var Token = await AsyncStorage.getItem('token');

    const formdata = new FormData();
    formdata.append('country_id', id);

    dispatch({type: STATE_BEGIN});
    axios
      .post(get_state_url, formdata, {
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
            dispatch({type: STATE_SUCCESS, payload: res.data.data});
        }
      })
      .catch(err => {
        dispatch({type: STATE_ERROR});
      });
  };

  const get_City = async (props, id) => {
    var Token = await AsyncStorage.getItem('token');
    const formdata = new FormData();
    formdata.append('state_id', id);

    dispatch({type: CITY_BEGIN});
    axios
      .post(get_city_url, formdata, {
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
            dispatch({type: CITY_SUCCESS, payload: res.data.data});
        }
      })
      .catch(err => {
        dispatch({type: CITY_ERROR});
      });
  };
  return (
    <Basiccontext.Provider
      value={{
        ...state,
        GetTypeget,
        GetClint,
        Add_Clent,
        Update_Clent,
        get_Country,
        get_State,
        get_City,
      }}>
      {children}
    </Basiccontext.Provider>
  );
};

export const useBasicContext = () => {
  return useContext(Basiccontext);
};
