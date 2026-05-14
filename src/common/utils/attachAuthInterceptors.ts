import type { AxiosInstance, AxiosError } from "axios";

// Guard to prevent multiple concurrent logout/navigation attempts
let isLoggingOut = false;

export const attachAuthInterceptors = (
  client: AxiosInstance,
  navigate?: (path: string) => void,
) => {
  // REQUEST
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      } else if (config.headers?.Authorization) {
        delete config.headers.Authorization;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  // RESPONSE
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (!isLoggingOut) {
          isLoggingOut = true;
          try {
            localStorage.removeItem("token");

            if (typeof navigate === "function") {
              // Use app router navigation when provided so app state is preserved
              navigate("/login");
            } else {
              // Fallback to a full navigation if no router function was provided
              // We use assign to avoid creating a new history entry in some browsers
              window.location.assign("/login");
            }
          } catch {
            // swallow errors here but still reject for upstream handling
          }
        }
      }

      return Promise.reject(error);
    },
  );
};
