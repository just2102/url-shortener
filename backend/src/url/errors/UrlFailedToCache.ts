export class UrlFailedToCache extends Error {
  constructor() {
    super('Failed to cache url');
  }
}
