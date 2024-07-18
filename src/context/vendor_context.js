import {AsyncStorage} from 'react-native';

import {useLoginContext} from './login_context';
import axios from 'axios';
import {
  ADDVENDOR_BEGIN,
  ADDVENDOR_ERROR,
  ADDVENDOR_SUCCESS,
  GETVENDOR_BEGIN,
  GETVENDOR_SUCCESS,
  GETVENDOR_ERROR,
  UPDATEVENDOR_BEGIN,
  UPDATEVENDOR_ERROR,
  UPDATEVENDOR_SUCCESS,
} from '../utils/action';
import {
  ACCEPT_HEADER,
  add_vendor_url,
  get_vendor_url,
  update_vendor_url,
} from '../utils/baseurl';
import React, {useContext, useReducer} from 'react';
import SimpleToast from 'react-native-simple-toast';
import Vendor_reducers from '../reducer/vendor_reducer';

const Vendorcontext = React.createContext();
const initialState = {
  vendor_loading: false,
  vendor_array: [],
  add_vendor_loading: false,
  update_vendor_loading: false,
};

export const Vendorprovider = ({children}) => {
  const {setLogout} = useLoginContext();
  const [state, dispatch] = useReducer(Vendor_reducers, initialState);

  const GetVendor = async props => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: GETVENDOR_BEGIN});
    axios
      .get(get_vendor_url, {
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
            dispatch({type: GETVENDOR_SUCCESS, payload: res.data.data});
        }
      })
      .catch(err => {
        dispatch({type: GETVENDOR_ERROR});
      });
  };

  const Add_Vendor = async (props, formdata) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: ADDVENDOR_BEGIN});
    axios
      .post(add_vendor_url, formdata, {
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
            type: ADDVENDOR_SUCCESS,
          });
        }
      })
      .catch(err => {
        console.log('errr', JSON.stringify(err, null, 2));
        dispatch({type: ADDVENDOR_ERROR});
      });
  };
  const UPdate_Vendor = async (props, formdata) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: UPDATEVENDOR_BEGIN});
    axios
      .post(update_vendor_url, formdata, {
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
            type: UPDATEVENDOR_SUCCESS,
          });
        }
      })
      .catch(err => {
        console.log('errr', JSON.stringify(err, null, 2));
        dispatch({type: UPDATEVENDOR_ERROR});
      });
  };

  return (
    <Vendorcontext.Provider
      value={{
        ...state,
        GetVendor,
        Add_Vendor,
        UPdate_Vendor,
      }}>
      {children}
    </Vendorcontext.Provider>
  );
};

export const useVendorContext = () => {
  return useContext(Vendorcontext);
};
