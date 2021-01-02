export interface IAccessToken {
  accessToken: string;
}

export interface JwtPayload {
  email: string;
  permission: string;
}
