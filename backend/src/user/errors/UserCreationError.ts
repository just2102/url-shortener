export class UserCreationError extends Error {
  constructor() {
    super('User creation failed');
  }
}
