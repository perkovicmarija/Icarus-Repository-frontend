import * as types from '../../actionTypes.js';

const initState = {
    icarusDocumentationFiles: [],
    icarusDocumentationFile: {},
    icarusDocumentationFileHistory: [],
    file: { data: [] }
}
export default function icarusDocumentationFileReducer(state = initState, action) {
    switch(action.type) {
        case types.LOAD_ICARUS_DOCUMENTATION_FILES_SUCCESS:
            return {
                ...state,
                icarusDocumentationFiles: action.icarusDocumentationFiles,
                icarusDocumentationFile: {}
            };
        case types.LOAD_ICARUS_DOCUMENTATION_FILES_IN_FOLDER_REQUEST:
            return {
                ...state,
                icarusDocumentationFiles: []
            };
        case types.VIEW_ICARUS_DOCUMENTATION_FILE:
            return {
                ...state,
                file: { data: [] }
            };
        case types.VIEW_ICARUS_DOCUMENTATION_FILE_SUCCESS:
            return {
                ...state,
                file: action.file
            };
        case types.LOAD_ICARUS_DOCUMENTATION_FILE_SUCCESS:
            return {
                ...state,
                icarusDocumentationFile: action.icarusDocumentationFile
            };
        case types.LOAD_ICARUS_DOCUMENTATION_FILE_HISTORY_SUCCESS:
            return {
                ...state,
                icarusDocumentationFileHistory: action.icarusDocumentationFileHistory
            };
        case types.PASS_ICARUS_DOCUMENTATION_FILE:
            return {
                ...state,
                icarusDocumentationFile: action.icarusDocumentationFile
            };
        case types.REVERSE_ICARUS_DOCUMENTATION_FILE_ORDER:
            return {
                ...state,
                icarusDocumentationFiles: [...state.icarusDocumentationFiles.slice().reverse()]
            };

        case types.UPLOAD_ICARUS_DOCUMENTATION_FILE_SUCCESS:
            return state;

        case types.LOAD_ICARUS_DOCUMENTATION_FILES_FAILED:
            return initState;
        default:
            return state;
    }
}
