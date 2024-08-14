import { Button, Form, Input, Spin } from "antd";
import { MdEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useState } from "react";
import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";
import { Toaster, toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { doLogin } from "@/redux/features/auth/authAsyncActions";
import { useRouter } from "next/navigation";
import { verifyUser } from "@/redux/features/user/userAsyncActions";

const Login = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = (data) => {
    if (Object.values(data).length > 1) {
      // axiosInstance.post("/user/signin", data).then((res) => {
      //   if (res.status === 200) {
      //     setLoading(false);
      //     const token = res?.data?.token;
      //     Cookies.set(process.env.NEXT_PUBLIC_ECOMM_USER, token);
      //     toast.success("Logged in successfully");
      //     setTimeout(() => {
      //       window.location.href = "/profile";
      //     }, 1000);
      //   }
      // });

      dispatch(doLogin(data))
        .then((result) => {
          if (doLogin.fulfilled.match(result)) {
            const token = result?.payload?.token;
            Cookies.set(process.env.NEXT_PUBLIC_ECOMM_USER, token);
            toast.success("Logged in successfully");

            //load user
            dispatch(verifyUser());

            setTimeout(() => {
              // window.location.href = "/profile"; // to navigate with reload
              router.push("/profile");
            }, 1000);
          } else if (doLogin.rejected.match(result)) {
            toast.error("User fails to login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="user_login_container">
      <h3>Login</h3>
      <div className="mb-3">
        <Form
          //   {...layout}
          //   form={form}
          name="control-hooks"
          className="login-form"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Email is required",
              },
            ]}
          >
            <Input
              placeholder="Enter your email"
              prefix={<MdEmail />}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              prefix={<CiLock />}
            />
          </Form.Item>

          <Form.Item>
            <div className="d-flex justify-content-center">
              <Button
                size="lg"
                type="primary"
                htmlType="submit"
                className="primary_btn"
              >
                {loading ? (
                  <div>
                    <Spin size="small" />
                    Logging..
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default Login;
