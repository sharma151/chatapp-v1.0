import { toast } from "react-toastify";
import apiClient from "@/core/services/apiClient";
import { AxiosError, type AxiosResponse } from "axios";

// --- Types ---

// Define the shape of the data required for login
export interface LoginPayload {
  email?: string;
  password?: string;
  [key: string]: unknown;
}

// Define the shape of the data required for registration
export interface RegisterPayload {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  [key: string]: unknown;
}

// Define what the User object looks like (customize based on your backend)
export interface UserData {
  _id: string;
  email: string;
  name: string;
  accessToken?: string;
  user?: {
    _id: string;
    username: string;
    email: string;
  };
}

// --- API Functions ---

export const Handlelogin = async (
  formData: LoginPayload
): Promise<UserData | undefined> => {
  try {
    const response: AxiosResponse = await apiClient.post(
      "/users/login",
      formData
    );

    // Returning specific data based on your original code: response.data.data
    return response?.data?.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    toast.error(
      err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again."
    );
    return undefined;
  }
};

export const Handleregister = async (
  formData: RegisterPayload
): Promise<AxiosResponse | undefined> => {
  try {
    const response: AxiosResponse = await apiClient.post(
      "/users/register",
      formData
    );
    return response;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    toast.error(`Network error or server is down: ${err.message}`);
    return undefined;
  }
};

export const Handlelogout = async (): Promise<AxiosResponse | undefined> => {
  try {
    const response: AxiosResponse = await apiClient.post("/users/logout");
    return response;
  } catch (error) {
    const err = error as Error;
    toast.error(`Failed to logout User: ${err.message}`);
    return undefined;
  }
};

export const HandleForgotPassword = async (
  email: string
): Promise<AxiosResponse | undefined> => {
  try {
    const response: AxiosResponse = await apiClient.post(
      "/users/forgot-password",
      {
        email,
      }
    );
    return response;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    toast.error(
      err.response?.data?.message ||
        "Failed to send reset link. Please try again."
    );
    return undefined;
  }
};
