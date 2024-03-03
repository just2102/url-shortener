export class InvalidRefreshToken extends Error {
  constructor() {
    super('Invalid refresh token');
  }
}
