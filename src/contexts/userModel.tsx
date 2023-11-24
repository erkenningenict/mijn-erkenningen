export interface IAuth {
  isAuthenticated: boolean;
  Roles: string[];
}
export const initialAuth: IAuth = {
  isAuthenticated: false,
  Roles: [],
};
