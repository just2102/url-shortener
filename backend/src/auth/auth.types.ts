import { User } from 'src/user/user.schema';

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
