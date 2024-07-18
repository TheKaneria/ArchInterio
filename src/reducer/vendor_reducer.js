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

const Vendor_reducers = (state, action) => {
  switch (action.type) {
    case GETVENDOR_BEGIN:
      return {...state, vendor_loading: true};

    case GETVENDOR_SUCCESS:
      return {
        ...state,
        vendor_array: action.payload,
        vendor_loading: false,
      };

    case GETVENDOR_ERROR:
      return {...state, vendor_loading: false};

    case ADDVENDOR_BEGIN:
      return {...state, add_vendor_loading: true};

    case ADDVENDOR_SUCCESS:
      return {
        ...state,
        add_vendor_loading: false,
      };

    case ADDVENDOR_ERROR:
      return {...state, add_vendor_loading: false};

    case UPDATEVENDOR_BEGIN:
      return {...state, update_vendor_loading: true};

    case UPDATEVENDOR_SUCCESS:
      return {
        ...state,
        update_vendor_loading: false,
      };

    case UPDATEVENDOR_ERROR:
      return {...state, update_vendor_loading: false};

    default:
      return {...state};
  }
};
export default Vendor_reducers;
