import { useMutation } from "@tanstack/react-query";
import {
  Handlelogin,
  Handleregister,
  Handlelogout,
  type LoginPayload,
  type RegisterPayload,
  // type LoginResponse,
} from "@/core/services/auth.service";
import { useAuthStore } from "@/app/store/auth.store";
import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";
export const useAuth = () => {
  const loginStore = useAuthStore((state) => state.login);
  const logoutStore = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  // 🔐 LOGIN
  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => Handlelogin(payload),

    onSuccess: (data) => {
      console.log("Login Data:", data);
      loginStore({
        user: {
          id: data?.user?._id || "",
          name: data?.user?.username || "",
          email: data?.user?.email,
        },
        accessToken: data?.accessToken || "",
      });

      navigate({ to: "/chats" });
    },
  });

  // 📝 REGISTER
  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => Handleregister(payload),
    onSuccess: () => {
      toast.success("Registration successful. Please login.");
    },
  });

  // 🚪 LOGOUT
  const logoutMutation = useMutation({
    mutationFn: Handlelogout,
    onSuccess: () => {
      logoutStore();
      toast.success("Logged out successfully");
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,

    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,

    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
};
