export class Requests {
  static readonly baseUrl = import.meta.env.VITE_BACKEND_URL;

  static async get(endpoint: string) {
    const url = `${this.baseUrl}/${endpoint}`;
    const accessToken = localStorage.getItem("accessToken");

    const headers = new Headers();
    if (accessToken) {
      headers.append("Authorization", `Bearer ${accessToken}`);
    }

    try {
      const response = await fetch(url, { headers });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(`API call failed for endpoint ${endpoint}:`, error);
      throw error;
    }
  }

  static async post(endpoint: string, data: object) {
    const url = `${this.baseUrl}/${endpoint}`;
    const accessToken = localStorage.getItem("accessToken");

    const headers = new Headers();
    if (accessToken) {
      headers.append("Authorization", `Bearer ${accessToken}`);
    }
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(`API call failed for endpoint ${endpoint}:`, error);
      throw error;
    }
  }
}
