import { getCurrentLanguage } from '../../helpers/LanguageProvider/config';
import * as types from '../actionTypes';

export function switchActivation() {
    return {
        type: types.ACTIVATE_LANG_MODAL
    }
}

export function changeLanguage(language) {
    return {
        type: types.CHANGE_LANGUAGE,
        language: getCurrentLanguage(language)
    }
}
