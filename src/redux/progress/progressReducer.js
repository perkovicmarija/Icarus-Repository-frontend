import * as types from '../actionTypes';

const initState = {
    progress: 0,
    progressOpened: false
}
export default function progressReducer(state = initState, action) {
    switch(action.type) {
        case types.DOWNLOAD_FILE_PROGRESS:
            return {
                ...state,
                progress: action.progress,
            };
        case types.DOWNLOAD_FILE_PROGRESS_OPEN:
            return {
                ...state,
                progressOpened: true,
            };
        case types.DOWNLOAD_FILE_PROGRESS_CLOSE:
            return {
                ...state,
                progressOpened: false,
            };
        default:
            return state;
    }
}