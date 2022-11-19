export type AuthUserDataType = {
  default_city: number;
  email: string;
  roles: string[];
  user_id: string;
  username: string;
};

export interface IAuthState {
  isPaid: boolean;
  isAuthenticated: boolean;
  userData: AuthUserDataType;
  isLoading: boolean;
}

export const initialState: IAuthState = {
  isPaid: false,
  isAuthenticated: false,
  userData: undefined,
  isLoading: false,
};
