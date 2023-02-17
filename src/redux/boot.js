import { store } from './store';
import authActions from './auth/authActions';

export default () =>
  new Promise(() => {
    store.dispatch(authActions.checkAuthorization());
  });
