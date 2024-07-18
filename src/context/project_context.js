import {AsyncStorage} from 'react-native';

import {useLoginContext} from './login_context';
import axios from 'axios';
import {
  POST_PROJECT_BEGIN,
  POST_PROJECT_SUCCESS,
  POST_PROJECT_ERROR,
} from '../utils/action';
import {ACCEPT_HEADER, post_project_url} from '../utils/baseurl';
import React, {useContext, useReducer} from 'react';
import SimpleToast from 'react-native-simple-toast';
import Project_reducers from '../reducer/project_reducer';

const Projectcontext = React.createContext();
const initialState = {
  post_data: {},
  mainid: '',
  members: [],
  milestones: [],
  note: [],
  spacetypes: [],
  selections: [],
  amcs: [],
  tasks: [],
  sitevisits: [],
  invoices: [],
  expenses: [],
  ledgers: [],
};

export const Projectprovider = ({children}) => {
  const {setLogout} = useLoginContext();
  const [state, dispatch] = useReducer(Project_reducers, initialState);

  const GetProject = async (props, id) => {
    var Token = await AsyncStorage.getItem('token');
    const formdata = new FormData();
    formdata.append('id', id);
    dispatch({type: POST_PROJECT_BEGIN});
    axios
      .post(post_project_url, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        // console.log('res-data', res.data);
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else {
          if (res.data.success === 1) {
            const item = res.data.data;
            const get_members = res.data.data.members;
            const get_milestones = res.data.data.milestones;
            const get_note = res.data.data.notes;
            const get_spacetypes = res.data.data.spacetypes;
            const get_selections = res.data.data.selections;
            const get_amcs = res.data.data.amcs;
            const get_tasks = res.data.data.tasks;
            const get_sitevisits = res.data.data.sitevisits;
            const get_invoices = res.data.data.invoices;
            const get_expenses = res.data.data.expenses;
            const get_ledgers = res.data.data.ledgers;
            dispatch({
              type: POST_PROJECT_SUCCESS,
              payload: {
                item,
                id,
                get_members,
                get_milestones,
                get_note,
                get_spacetypes,
                get_selections,
                get_amcs,
                get_tasks,
                get_sitevisits,
                get_invoices,
                get_expenses,
                get_ledgers,
              },
            });
          }
        }
      })
      .catch(err => {
        dispatch({type: POST_PROJECT_ERROR});
      });
  };

  return (
    <Projectcontext.Provider
      value={{
        ...state,
        GetProject,
      }}>
      {children}
    </Projectcontext.Provider>
  );
};

export const useProjectContext = () => {
  return useContext(Projectcontext);
};
