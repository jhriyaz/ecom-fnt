import { Button, Divider, Form, Input, Spin } from "antd";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import Cookies from "js-cookie";
import { Toaster, toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { doLogin } from "@/redux/features/auth/authAsyncActions";
import { useRouter } from "next/navigation";
import { verifyUser } from "@/redux/features/user/userAsyncActions";
import { BiLock } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { notificationFunc } from "../global/notification";
import { useSelector } from "react-redux";
import handleGoogleSignIn from "@/utils/handleGoogleSignIn";

const LoginForm = ({ setIsOpen }) => {
  const dispatch = useAppDispatch();
  const { isLoading, message } = useSelector(s => s.auth)
  const router = useRouter();

  const onFinish = (data) => {
    if (Object.values(data).length > 1) {

      dispatch(doLogin(data))
        .then((result) => {
          if (doLogin.fulfilled.match(result)) {
            const token = result?.payload?.token;
            Cookies.set(process.env.NEXT_PUBLIC_ECOMM_USER, token);
            notificationFunc('success', message)
            if (setIsOpen) {
              setIsOpen(false)
            }
            //load user
            dispatch(verifyUser());

            setTimeout(() => {
              router.push("/profile");
            }, 1000);
          } else if (doLogin.rejected.match(result)) {
            notificationFunc('error', message)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (

    <Form
      name="control-hooks"
      className="form"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >

      <h3 className='section_title'>Login</h3>
      <p className='section_subtitle'>To stay connected with us, please Login</p>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Email is required",
          },
        ]}
        className="default_form_item"
      >
        <Input
          className='default_input'
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
        className="default_form_item"
      >
        <Input.Password
          className='default_input'
          placeholder="Enter your password"
          prefix={<BiLock size={20} />}
        />
      </Form.Item>

      <p>Forgot Password? <Link onClick={() => setIsOpen && setIsOpen(false)} href={'/auth/forgot-password'}>Reset Now</Link></p>

      <Form.Item>
        <div className="d-flex justify-content-center">
          <Button
            size="lg"
            type="primary"
            htmlType="submit"
            className="submit_button"
          >
            {isLoading ? (
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

      <Divider className='fs-6 text_gray'>Or Login With</Divider>

      <button type="button" htmlType="button" className='default_input' onClick={() => setIsOpen && setIsOpen(false)}>
        <div className='d-flex align-items-center justify-content-center gap-2' onClick={() => handleGoogleSignIn()}>
          <FcGoogle size={20} />
          Continue with Google
        </div>
      </button>

      <p className='text-center fs-6 text_gray fw-semibold pt-3'>Don't have an account? <Link onClick={() => setIsOpen && setIsOpen(false)} href={'/auth/register'}>Register</Link></p>
    </Form>
  );
};

export default LoginForm;
