import { Requests } from "../requests";
import { ShortenUrlResponse, UrlData } from "./types";

export class UrlApi {
  private static baseApiEndpoint = "url";

  static async shortenUrl(url: string) {
    const res = await Requests.post(`${this.baseApiEndpoint}/shorten`, { url });
    return res as ShortenUrlResponse;
  }

  static async getUrls() {
    const res = await Requests.get(`${this.baseApiEndpoint}/getUrlsForUser`);
    if (res) {
      return res as UrlData[];
    }
  }
}
