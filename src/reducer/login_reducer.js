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

const Login_reducers = (state, action) => {
  switch (action.type) {
    case CHECK_LOGIN_BEGIN:
      return {...state, login_loading: true};

    case CHECK_LOGIN_ERROR:
      return {...state, login_loading: false};

    case CHECK_LOGIN_SUCCESS:
      return {
        ...state,
        login_loading: false,
        Podcasts_array: action.payload,

        isLogin: true,
        users: action.payload,
      };
    case PROFILE_BEGIN:
      return {...state, profile_loading: true};

    case PROFILE_BEGIN_ERROR:
      return {...state, profile_loading: false};

    case PROFILE_BEGIN_SUCCESS:
      return {
        ...state,
        profile_loading: false,
        profile: action.payload,
      };

    case CHECK_LOGIN_ERROR:
      return {...state, login_loading: false};

    case RESTORE_LOGIN:
      return {...state, isLogin: action.payload};

    case RESTORE_TOKEN:
      return {...state, token: action.payload.token};
    case RESTORE_ROLE:
      return {...state, role: action.payload};
    case RESTORE_NAME:
      return {...state, username: action.payload};
    case LOGOUT_USER:
      AsyncStorage.clear();
      return {
        ...state,
        user_id: '',
        isLogin: false,
        role: '',
        username: '',
      };
    default:
      return {...state};
  }
};

export default Login_reducers;
