export class GenerateTokensResponse {
  accessToken: string;
  refreshToken: string;
}

export class GenerateTokenPayload {
  email: string;
  name: string;
}

export class CreateUserPayload {
  email: string;
  name: string;
  refreshToken: string;
}

export class UpdateRefreshTokenPayload {
  email: string;
  refreshToken: string;
}

export class UserAuthContext extends Request {
  user: UserInAuthContext;
}
export class UserInAuthContext {
  email: string;
}
export class UserInAuthContextWithRefreshToken extends UserInAuthContext {
  refreshToken: string;
}
