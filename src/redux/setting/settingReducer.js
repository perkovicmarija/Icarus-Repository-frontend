import * as types from '../actionTypes';

const initState = {
  clients: []
}

export default function settingReducer(state = initState, action) {
  switch(action.type) {
    case types.LOAD_ALL_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.clients
      };

    default:
      return state;
  }
}