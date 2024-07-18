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

const Employee_reducers = (state, action) => {
  switch (action.type) {
    case GETEMPLOYEE_BEGIN:
      return {...state, employee_loading: true};

    case GETEMPLOYEE_BEGIN_SUCCESS:
      return {
        ...state,
        employee_array: action.payload,
        employee_loading: false,
      };

    case GETEMPLOYEE_BEGIN_ERROR:
      return {...state, employee_loading: false};

    case ADDEMPLOYEE_BEGIN:
      return {...state, add_employee_loading: true};

    case ADDEMPLOYEE_BEGIN_SUCCESS:
      return {
        ...state,
        add_employee_loading: false,
      };

    case ADDEMPLOYEE_BEGIN_ERROR:
      return {...state, add_employee_loading: false};

    case UPDATEEMPLOYEE_BEGIN:
      return {...state, update_employee_loading: true};

    case UPDATEEMPLOYEE_BEGIN_SUCCESS:
      return {
        ...state,
        update_employee_loading: false,
      };

    case UPDATEEMPLOYEE_BEGIN_ERROR:
      return {...state, update_employee_loading: false};

    default:
      return {...state};
  }
};
export default Employee_reducers;
