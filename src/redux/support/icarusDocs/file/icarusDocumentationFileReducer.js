import * as types from '../../../actionTypes';

const initState = {
    documentationFiles: [],
    documentationFile: {},
    documentationFileHistory: [],
    documentationFileRevisions: [],
    file: { data: [] }
}
export default function documentationFileReducer(state = initState, action) {
    switch(action.type) {
        case types.LOAD_ICARUS_DOCUMENTATION_FILES_SUCCESS:
            return {
                ...state,
                documentationFiles: action.documentationFiles,
                documentationFile: {}
            };
        case types.LOAD_ICARUS_DOCUMENTATION_FILES_IN_FOLDER_REQUEST:
            return {
                ...state,
                documentationFiles: []
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
                documentationFile: action.documentationFile
            };
        case types.LOAD_ICARUS_DOCUMENTATION_FILE_HISTORY_REQUEST:
            return {
                ...state,
                documentationFileHistory: []
            };
        case types.LOAD_ICARUS_DOCUMENTATION_FILE_HISTORY_SUCCESS:
            return {
                ...state,
                documentationFileHistory: action.documentationFileHistory
            };
        case types.LOAD_ICARUS_DOCUMENTATION_FILE_REVISIONS_REQUEST:
            return {
                ...state,
                documentationFileRevisions: []
            };
        case types.LOAD_ICARUS_DOCUMENTATION_FILE_REVISIONS_SUCCESS:
            return {
                ...state,
                documentationFileRevisions: action.documentationFileRevisions
            };
        case types.PASS_ICARUS_DOCUMENTATION_FILE:
            return {
                ...state,
                documentationFile: action.documentationFile
            };
        case types.REVERSE_ICARUS_DOCUMENTATION_FILE_ORDER:
            return {
                ...state,
                documentationFiles: [...state.documentationFiles.slice().reverse()]
            };

        case types.UPLOAD_ICARUS_DOCUMENTATION_FILE_SUCCESS:
            return state;

        case types.LOAD_ICARUS_DOCUMENTATION_FILES_FAILED:
            return initState;
        default:
            return state;
    }
}