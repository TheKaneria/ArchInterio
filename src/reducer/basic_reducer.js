import {AsyncStorage} from 'react-native';
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

const Basic_reducers = (state, action) => {
  switch (action.type) {
    case GETTYPE_BEGIN:
      return {...state, type_loading: true};

    case GETTYPE_BEGIN_SUCCESS:
      return {...state, type_array: action.payload, type_loading: false};

    case GETTYPE_BEGIN_ERROR:
      return {...state, type_loading: false};

    case GETCLIENT_BEGIN:
      return {...state, clint_loading: true};

    case GETCLIENT_BEGIN_SUCCESS:
      return {...state, clint_array: action.payload, clint_loading: false};

    case GETCLIENT_BEGIN_ERROR:
      return {...state, clint_loading: false};

    case ADDCLIENT_BEGIN:
      return {...state, add_clint_loading: true};
    case ADDCLIENT_SUCCESS:
      return {
        ...state,
        add_clint_loading: false,
      };
    case ADDCLIENT_ERROR:
      return {...state, add_clint_loading: false};

    case UPDATECLIENT_BEGIN:
      return {...state, update_clint_loading: true};
    case UPDATECLIENT_SUCCESS:
      return {
        ...state,
        update_clint_loading: false,
      };
    case UPDATECLIENT_ERROR:
      return {...state, update_clint_loading: false};

    case COUNTRY_BEGIN:
      return {...state};

    case COUNTRY_SUCCESS:
      return {...state, counrty_array: action.payload};

    case COUNTRY_ERROR:
      return {...state};

    case STATE_BEGIN:
      return {...state};

    case STATE_SUCCESS:
      return {...state, state_array: action.payload};

    case STATE_ERROR:
      return {...state};

    case CITY_BEGIN:
      return {...state};

    case CITY_SUCCESS:
      return {...state, city_array: action.payload};

    case CITY_ERROR:
      return {...state};

    default:
      return {...state};
  }
};

export default Basic_reducers;
