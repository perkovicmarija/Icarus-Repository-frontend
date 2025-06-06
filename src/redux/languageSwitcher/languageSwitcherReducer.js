import { getDefaultLanguage } from '../../helpers/LanguageProvider/config';
import * as types from '../actionTypes';

const initState = {
    isActivated: false,
    language: getDefaultLanguage()
}
export default function(state = initState, action) {
  switch (action.type) {
      case types.ACTIVATE_LANG_MODAL:
        return {
            ...state,
            isActivated: !state.isActivated,
        };
    case types.CHANGE_LANGUAGE:
        let htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.dir = action.language.direction;
        return {
            ...state,
            language: action.language,
        };
    default:
      return state;
  }
}
