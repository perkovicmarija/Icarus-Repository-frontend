import * as types from "./../actionTypes";

const initState = {
  token: null,
  userSignUp: {},
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
      };
    //return state.set('idToken', action.token);
    case types.LOGOUT:
      return initState;
    case "LOGOUT_401":
      return { ...state, token: null };
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        userSignUp: action.userSignUp,
      };
    default:
      return state;
  }
}
