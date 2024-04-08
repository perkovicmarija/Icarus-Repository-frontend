import * as types from '../../actionTypes.js';

const initState = {
    icarusDocumentationFolders: [],
    icarusDocumentationFolder: {
        path: "/"
    },
    icarusDocumentationFolderPath: [],
    icarusDocumentationFolderTree: {
        children: []
    },
    storageInfo: {}
}
export default function icarusDocumentationFolderReducer(state = initState, action) {
    switch(action.type) {
        case types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_SUCCESS:
            return {
                ...state,
                icarusDocumentationFolders: action.icarusDocumentationFolders,
                icarusDocumentationFolder: {}
            };
        case types.LOAD_ICARUS_DOCUMENTATION_FOLDER_TREE_SUCCESS:
            return {
                ...state,
                icarusDocumentationFolderTree: action.icarusDocumentationFolderTree,
            };
        case types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_ON_PATH_REQUEST:
            return {
                ...state,
                icarusDocumentationFolders: []
            };
        case types.CLEAR_FOLDERS:
            return {
                ...state,
                icarusDocumentationFolders: []
            }
        case types.LOAD_ICARUS_DOCUMENTATION_FOLDER_SUCCESS:
            return {
                ...state,
                icarusDocumentationFolder: action.icarusDocumentationFolder
            };
        case types.LOAD_STORAGE_INFO_SUCCESS:
            return {
                ...state,
                storageInfo: action.storageInfo
            };
        case types.GO_BACK_TO_FOLDER:
            let index = 0;
            for(let i = 0, l = state.icarusDocumentationFolderPath.length; i < l; i++) {
                if(state.icarusDocumentationFolderPath[i].icarusDocumentationFolderId === action.icarusDocumentationFolder.icarusDocumentationFolderId) {
                    index = i;
                    break;
                }
            }
            return {
                ...state,
                icarusDocumentationFolderPath: [...state.icarusDocumentationFolderPath.slice(0, index + 1)]
            };
        case types.GO_BACK_TO_ROOT_FOLDER:
            return {
                ...state,
                icarusDocumentationFolderPath: []
            };
        case types.ENTER_FOLDER:
            return {
                ...state,
                icarusDocumentationFolderPath: [...state.icarusDocumentationFolderPath,  action.icarusDocumentationFolder]
            };
        case types.EXIT_FOLDER:
            return {
                ...state,
                icarusDocumentationFolderPath: [...state.icarusDocumentationFolderPath.slice(0, -1)]
            };

        case types.UPDATE_ICARUS_DOCUMENTATION_FOLDER_SUCCESS:
            return {
                ...state,
                icarusDocumentationFolder: action.icarusDocumentationFolder
            };
        case types.REVERSE_ICARUS_DOCUMENTATION_FOLDER_ORDER:
            return {
                ...state,
                icarusDocumentationFolders: [...state.icarusDocumentationFolders.slice().reverse()]
            };

        case types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_FAILED:
            return initState;
        default:
            return state;
    }
}
