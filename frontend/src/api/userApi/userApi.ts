import { Requests } from "../requests";
import { AuthorizedUser } from "./types";

export class UserApi {
  private static baseApiEndpoint = "user";

  static async getUser(): Promise<AuthorizedUser | undefined> {
    const res = await Requests.get(this.baseApiEndpoint);
    if (res) {
      return res as AuthorizedUser;
    }
  }
}
