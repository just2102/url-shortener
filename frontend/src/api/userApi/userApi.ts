import { Requests } from "../requests";
import { AuthorizedUser } from "./types";

export class UserApi {
  private static baseApiEndpoint = "user";

  static async getUser() {
    const res = await Requests.get(this.baseApiEndpoint);
    return res as AuthorizedUser;
  }
}
