import { useAuthStore } from "@/app/store/auth.store";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const login = useAuthStore((s) => s.login);

  const handleLogin = () => {
    // later call API
    login({ id: "1", name: "Saurav" });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-96 space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Login
        </button>

        <p className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link to="/auth/register" className="text-green-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
