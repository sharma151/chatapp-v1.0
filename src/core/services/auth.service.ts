import httpBase from "@/core/services/httpBase";
import { AxiosError } from "axios";
import { handleError } from "@/utils/http.utils";
import type {
  AuthResponse,
  LoginFormInterface,
  RegisterFormInterface,
  UserProfileResponse,
} from "@/@types/forms/auth";
import type { AxiosResponseInterface } from "@/@types/responses/api-response";

// --- API Functions ---

class AuthService {
  // User Login
  static async login(credential: LoginFormInterface) {
    try {
      const response: AxiosResponseInterface<AuthResponse> =
        await httpBase.post("/users/login", credential);
      return response?.data?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  // User Registration
  static async register(formData: RegisterFormInterface) {
    try {
      const response: AxiosResponseInterface<RegisterFormInterface> =
        await httpBase.post("/users/register", formData);
      return response;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  //Fetch Profile Details

  static async fetchProfile() {
    try {
      const response: AxiosResponseInterface<UserProfileResponse> =
        await httpBase.get("/social-media/profile");
      return response;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  // User Logout
  static async logout() {
    try {
      const response: AxiosResponseInterface<unknown> =
        await httpBase.post("/users/logout");
      return response;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  //Updata user Avatar
  static async UpdataAvatar(formData: FormData) {
    try {
      const response = await httpBase.patch("/users/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  // Forgot Password
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
