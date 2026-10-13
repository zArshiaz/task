import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface AuthState {
  accessToken: string | null;
  username: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  username: null,
  isLoggedIn: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    login(accessToken: string, username: string): void {
      patchState(store, { accessToken, username, isLoggedIn: true });
    },
    logout(): void {
      patchState(store, initialState);
    },
  })),
);
