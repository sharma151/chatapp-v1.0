// src/routes/__root.tsx
import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/app/store/auth.store";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    
    console.log("Auth Check:", {
      isAuthenticated,
      pathname: location.pathname,
    });

    if (!isAuthenticated && !location.pathname.startsWith("/auth")) {
      throw redirect({
        to: "/auth/login",
      });
    }

    if (isAuthenticated && location.pathname.startsWith("/auth")) {
      throw redirect({
        to: "/chats",
      });
    }
  },
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <main className="overflow-y-auto w-full ">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  );
}
