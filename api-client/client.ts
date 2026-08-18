import ky from "ky";
import { API_CONFIG } from "@/lib/api-config";

const clientApi = ky.create({
  prefixUrl: "/api",
  timeout: API_CONFIG.TIMEOUT,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("Content-Type", "application/json");
      },
    ],
  },
});

export default clientApi;
