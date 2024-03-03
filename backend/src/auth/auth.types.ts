import { User } from 'src/user/user.schema';
import { UserInAuthContextWithRefreshToken } from 'src/user/user.types';

export class GoogleUserContext extends Request {
  user: GoogleUser;
}

export class GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
}

export class AuthLoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export class UserRefreshTokenContext {
  user: UserInAuthContextWithRefreshToken;
}

export class RefreshTokensResponse {
  accessToken: string;
  refreshToken: string;
}
