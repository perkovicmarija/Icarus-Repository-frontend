//import { getStore } from '../../redux/store';
import authAction from "../../redux/auth/authActions";

export function statusHelper(response) {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}
