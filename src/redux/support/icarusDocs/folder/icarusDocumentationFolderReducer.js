import * as types from '../../../actionTypes';

const initState = {
    documentationFolders: [],
    documentationFolder: {
        path: "/"
    },
    documentationFolderPath: [],
    documentationFolderTree: {
        children: []
    },
    storageInfo: {}
}
export default function documentationFolderReducer(state = initState, action) {
    switch(action.type) {
        case types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_SUCCESS:
            return {
                ...state,
                documentationFolders: action.documentationFolders,
                documentationFolder: {}
            };
        case types.LOAD_ICARUS_DOCUMENTATION_FOLDER_TREE_SUCCESS:
            return {
                ...state,
                documentationFolderTree: action.documentationFolderTree,
            };
        case types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_ON_PATH_REQUEST:
            return {
                ...state,
                documentationFolders: []
            };
        case types.CLEAR_FOLDERS:
            return {
                ...state,
                documentationFolders: []
            }
        case types.LOAD_ICARUS_DOCUMENTATION_FOLDER_SUCCESS:
            return {
                ...state,
                documentationFolder: action.documentationFolder
            };
        case types.LOAD_STORAGE_INFO_SUCCESS:
            return {
                ...state,
                storageInfo: action.storageInfo
            };
        case types.GO_BACK_TO_FOLDER:
            let index = 0;
            for(let i = 0, l = state.documentationFolderPath.length; i < l; i++) {
                if(state.documentationFolderPath[i].documentationFolderId === action.documentationFolder.documentationFolderId) {
                    index = i;
                    break;
                }
            }
            return {
                ...state,
                documentationFolderPath: [...state.documentationFolderPath.slice(0, index + 1)]
            };
        case types.GO_BACK_TO_ROOT_FOLDER:
            return {
                ...state,
                documentationFolderPath: []
            };
        case types.ENTER_FOLDER:
            return {
                ...state,
                documentationFolderPath: [...state.documentationFolderPath,  action.documentationFolder]
            };
        case types.EXIT_FOLDER:
            return {
                ...state,
                documentationFolderPath: [...state.documentationFolderPath.slice(0, -1)]
            };

        case types.UPDATE_ICARUS_DOCUMENTATION_FOLDER_SUCCESS:
            return {
                ...state,
                documentationFolder: action.documentationFolder
            };
        case types.REVERSE_ICARUS_DOCUMENTATION_FOLDER_ORDER:
            return {
                ...state,
                documentationFolders: [...state.documentationFolders.slice().reverse()]
            };

        case types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_FAILED:
            return initState;
        default:
            return state;
    }
}