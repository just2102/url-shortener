import { toast } from "react-toastify";
import { ApiResponse, RequestMethods } from "./requests.types";

export class Requests {
  static readonly baseUrl = import.meta.env.VITE_BACKEND_URL;

  static async requestWithRetry(
    endpoint: string,
    method: RequestMethods = "GET",
    body: object | null = null,
    attempt = 0
  ): Promise<ApiResponse | void> {
    const url = `${this.baseUrl}/${endpoint}`;
    const accessToken = localStorage.getItem("accessToken");

    const headers = new Headers();
    if (accessToken) {
      headers.append("Authorization", `Bearer ${accessToken}`);
    }
    if (body && method !== "GET") {
      headers.append("Content-Type", "application/json");
    }

    const init: RequestInit = {
      method,
      headers,
    };
    if (body && method !== "GET") {
      init.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, init);
      if (!response.ok) {
        if (response.status === 401 && attempt < 1) {
          const handleUnauthorizedErrorResponse =
            await this.handleUnauthorizedError();
          if (handleUnauthorizedErrorResponse?.shouldRepeatRequest) {
            return this.requestWithRetry(endpoint, method, body, attempt + 1);
          }
        }
        return this.handleErrors(response);
      }
      return await response.json();
    } catch (error) {
      console.error(`API call failed for endpoint ${endpoint}:`, error);
      throw error;
    }
  }

  static async get(endpoint: string) {
    return await this.requestWithRetry(endpoint);
  }

  static async handleErrors(response: Response) {
    toast.error(`Error: ${response.statusText}`);
  }

  static async handleUnauthorizedError() {
    const refreshToken = localStorage.getItem("refreshToken");
    const url = `${this.baseUrl}/auth/refreshToken`;
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${refreshToken}`);
    try {
      const response = await fetch(url, { headers, method: "POST" });
      if (!response.ok) {
        toast.info("Please login to use this app.");
        return;
      }

      const json = await response.json();
      localStorage.setItem("accessToken", json.accessToken);
      return {
        shouldRepeatRequest: true,
      };
    } catch (error) {
      console.error("Error refreshing token: ", error);
      toast.error("Error refreshing token");
    }
  }

  static async post(endpoint: string, data: object) {
    return await this.requestWithRetry(endpoint, "POST", data);
  }
}
