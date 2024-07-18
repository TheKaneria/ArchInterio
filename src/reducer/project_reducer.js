import {
  POST_PROJECT_BEGIN,
  POST_PROJECT_SUCCESS,
  POST_PROJECT_ERROR,
} from '../utils/action';

const Project_reducers = (state, action) => {
  switch (action.type) {
    case POST_PROJECT_BEGIN:
      return {...state};

    case POST_PROJECT_SUCCESS:
      return {
        ...state,
        post_data: action.payload.item,
        mainid: action.payload.id,
        members: action.payload.get_members,
        milestones: action.payload.get_milestones,
        note: action.payload.get_note,
        spacetypes: action.payload.get_spacetypes,
        selections: action.payload.get_selections,
        amcs: action.payload.get_amcs,
        tasks: action.payload.get_tasks,
        sitevisits: action.payload.get_sitevisits,
        invoices: action.payload.get_invoices,
        expenses: action.payload.get_expenses,
        ledgers: action.payload.get_ledgers,
      };

    case POST_PROJECT_ERROR:
      return {...state};

    default:
      return {...state};
  }
};
export default Project_reducers;
