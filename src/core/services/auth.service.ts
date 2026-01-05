import httpBase from "@/core/services/httpBase";
import { AxiosError } from "axios";
import { handleError } from "@/utils/http.utils";
import type {
  AuthResponse,
  LoginFormInterface,
  RegisterFormInterface,
} from "@/@types/forms/auth";
import type { AxiosResponseInterface } from "@/@types/responses/api-response";

// --- API Functions ---

class AuthService {
  static async login(credential: LoginFormInterface) {
    try {
      const response: AxiosResponseInterface<AuthResponse> =
        await httpBase.post("/users/login", credential);
      return response?.data?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  static async register(formData: RegisterFormInterface) {
    try {
      const response: AxiosResponseInterface<RegisterFormInterface> =
        await httpBase.post("/users/register", formData);
      return response;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  static async logout() {
    try {
      const response: AxiosResponseInterface<unknown> =
        await httpBase.post("/users/logout");
      return response;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  static async forgotPassword(email: string) {
    try {
      const response: AxiosResponseInterface<null> = await httpBase.post(
        "/users/forgot-password",
        {
          email,
        }
      );
      return response;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }
}
export default AuthService;
