import { createFileRoute, Link } from "@tanstack/react-router";
import { Form, Input, Button, Typography, Grid, Card } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";

import { useAuth } from "@/core/hooks/api/useAuth";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login, isLoggingIn } = useAuth();
  const [loginForm] = Form.useForm();
  const screens = useBreakpoint();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card
        className="w-full"
        style={{
          maxWidth: screens.sm ? 420 : "100%",
        }}
      >
        <Title level={3} className="text-center">
          Login
        </Title>

        <Form
          form={loginForm}
          layout="vertical"
          onFinish={login}
          requiredMark={false}
        >
          {/* Username */}
          <Form.Item
            label="username"
            name="username"
            rules={[
              { required: true, message: "Please enter your username" },
              { type: "string", message: "Enter a valid username" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your username"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              iconRender={(visible: unknown) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          {/* Forgot password */}
          <div className="mb-4 text-right">
            <Link
              to="/auth/forgotPassword"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoggingIn}
              block
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>
        </Form>

        {/* Register */}
        <div className="text-center">
          <Text type="secondary">Don’t have an account?</Text>{" "}
          <Link
            to="/auth/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Register
          </Link>
        </div>
      </Card>
    </div>
  );
}
