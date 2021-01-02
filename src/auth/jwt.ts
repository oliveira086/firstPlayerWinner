export interface IAccessToken {
  accessToken: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  permission: string;
}
