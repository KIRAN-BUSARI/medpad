import { atom, selector } from 'recoil';
import { authState } from './auth';

export const userState = atom({
  key: 'userState',
  default: selector({
    key: 'userState/default',
    get: ({ get }) => {
      const auth = get(authState);
      return auth.user;
    }
  })
});

export const isAuthenticatedSelector = selector({
  key: 'isAuthenticatedSelector',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.isAuthenticated;
  }
});