import { Persoon } from '../__generated__/graphql';

export interface IAuthState {
  isAuthenticated: boolean;
  user: Persoon | null;
  roles: string[] | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export const setAuthState = (
  user: Persoon,
  roles: string[],
  accessToken: string,
  refreshToken: string,
): IAuthState => {
  const newAuthState = {
    isAuthenticated: true,
    user,
    roles,
    accessToken,
    refreshToken,
  };
  localStorage.setItem('AUTH_STATE', JSON.stringify(newAuthState));
  return newAuthState;
};

export const getAuthState = (): IAuthState | null => {
  const authStateJson = localStorage.getItem('AUTH_STATE');
  if (authStateJson) {
    return JSON.parse(authStateJson);
  }
  return null;
};

export const deleteAuthState = () => {
  localStorage.removeItem('AUTH_STATE');
};
