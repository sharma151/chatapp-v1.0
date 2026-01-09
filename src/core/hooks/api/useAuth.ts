import { useMutation, useQuery } from "@tanstack/react-query";
import AuthService from "@/core/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useToast } from "../common/useToast";
import { useNavigate } from "@tanstack/react-router";
import type {
  LoginFormInterface,
  RegisterFormInterface,
} from "@/@types/forms/auth";
export const useAuth = () => {
  const loginStore = useAuthStore((state) => state.login);
  const logoutStore = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const { success: Success } = useToast();

  // LOGIN
  const loginMutation = useMutation({
    mutationFn: async (payload: LoginFormInterface) =>
      await AuthService.login(payload),

    onSuccess: (data) => {
      loginStore({
        user: {
          id: data?.user?._id || "",
          name: data?.user?.username || "",
          email: data?.user?.email,
          avatar: data?.user?.avatar?.url || "",
        },
        accessToken: data?.accessToken || "",
      });

      navigate({ to: "/chats" });
      Success("Logged in successfully");
    },
  });

  // REGISTER
  const registerMutation = useMutation({
    mutationFn: (payload: RegisterFormInterface) =>
      AuthService.register(payload),
    onSuccess: () => {
      Success("Registration successful. Please login.");
    },
  });

  //USER PROFILE DETAIL

  const UserProfileDetail = useQuery({
    queryKey: ["profiledetail"],
    queryFn: AuthService.fetchProfile,
  });

  // LOGOUT
  const logoutMutation = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      logoutStore();
      navigate({ to: "/auth/login" });
      Success("Logged out successfully");
    },
  });

  //Update Avatar
  const UpdateAvatar = useMutation({
    mutationFn: async (formData: FormData) =>
      await AuthService.UpdataAvatar(formData),

    onSuccess: () => {
      Success("Avatar Updated Succesfully");
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    updateAvatar: UpdateAvatar.mutate,
    userdetail: UserProfileDetail.data,
  };
};
