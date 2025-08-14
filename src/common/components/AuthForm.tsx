"use client";

import React, { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

type AuthEndpoint = "client/login" | "client/signup";

interface ApiResponse {
  token?: string;
  message?: string;
  [key: string]: unknown;
}

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const signupValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const AuthForm = ({
  closeModal,
  forCart,
}: {
  forCart?: boolean;
  closeModal?: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState<string>("");

  const sendAuthRequest = async <T extends LoginData | SignupData>(
    endpoint: AuthEndpoint,
    data: T
  ): Promise<ApiResponse | null> => {
    try {
      setError("");
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
      }
      closeModal?.();
      console.log("Success:", result);
      Cookies.set("user_token", result?.token as string);
      Cookies.set("user_name", result?.name as string);
      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-white to-red-50 min-h-[360px]">
      <div
        className={`flex transition-transform duration-500 ease-in-out ${
          isSignup ? "-translate-x-1/2" : "translate-x-0"
        } w-[200%]`}
      >
        {/* LOGIN FORM */}
        <div className="w-1/2 px-4">
          <Formik<LoginData>
            onSubmit={async (values) => {
              const data = await sendAuthRequest("client/login", values);
              if (data?.token) {
                localStorage.setItem("token", data.token);
              }
            }}
            validationSchema={loginValidationSchema}
            initialValues={{ email: "", password: "" }}
          >
            {(formik) => (
              <Form className="flex flex-col gap-4 pb-6 px-6 items-center justify-center w-full h-full">
                {forCart ? (
                  <div className="w-full text-[24px] mb-6 flex items-center justify-between">
                    <span> Welcome to Sportsmandu Nepal! Please login.</span>
                    <span className="text-[14px] flex items-center gap-1">
                      New Member?
                      <span
                        onClick={() => {
                          setIsSignup(true);
                          setError("");
                        }}
                        className="text-blue-400 cursor-pointer font-semibold"
                      >
                        Register
                      </span>
                      here.
                    </span>
                  </div>
                ) : (
                  <div className="w-full text-[18px] mb-6 flex items-center justify-between">
                    <span> Welcome to Sportsmandu Nepal! Please login.</span>
                  </div>
                )}
                <div
                  className={`flex flex-col justify-center items-center w-full ${
                    forCart &&
                    "px-6 lg:px-10 2xl:px-20 py-6 rounded-md bg-gradient-to-r from-green-50 to-red-50"
                  } gap-4`}
                >
                  <Input
                    onChange={(e) => {
                      formik.setFieldValue("email", e.target.value);
                      setError("");
                    }}
                    title="Email"
                    placeholder="Enter your Email"
                    errorMessage={
                      formik.touched.email ? formik.errors.email : ""
                    }
                  />
                  <Input
                    type="password"
                    onChange={(e) => {
                      formik.setFieldValue("password", e.target.value);
                      setError("");
                    }}
                    title="Password"
                    placeholder="Enter your Password"
                    errorMessage={
                      formik.touched.password ? formik.errors.password : ""
                    }
                  />

                  {error && (
                    <div className="text-red-500 text-sm font-medium">
                      {error}
                    </div>
                  )}

                  <Button
                    loading={loading}
                    type="submit"
                    variant="primary"
                    label="Login"
                  />
                  {!forCart && (
                    <div className="flex items-center gap-2 mt-2">
                      {` Don't have an account?`}
                      <span
                        onClick={() => {
                          setIsSignup(true);
                          setError("");
                        }}
                        className="text-colorPrimary font-bold underline cursor-pointer"
                      >
                        Signup
                      </span>
                    </div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* SIGNUP FORM */}
        <div className="w-1/2 px-4">
          <Formik<SignupData & { confirmPassword: string }>
            onSubmit={async (values) => {
              const { ...signupData } = values;
              const data = await sendAuthRequest("client/signup", signupData);
              if (data) {
                setIsSignup(false);
              }
            }}
            validationSchema={signupValidationSchema}
            initialValues={{
              name: "",
              email: "",
              phoneNumber: "",
              password: "",
              confirmPassword: "",
            }}
          >
            {(formik) => (
              <Form className="flex flex-col gap-4 pb-6 px-6 pt-4 items-center justify-center w-full">
                {forCart && (
                  <div className="w-full text-[24px] mb-6 flex items-center justify-between">
                    <span>Create your Daraz Account</span>
                    <span className="text-[14px] flex items-center gap-1">
                      Already Member?
                      <span
                        onClick={() => {
                          setIsSignup(false);
                          setError("");
                        }}
                        className="text-blue-400 cursor-pointer font-semibold"
                      >
                        Login
                      </span>
                      here.
                    </span>
                  </div>
                )}
                <div
                  className={`flex flex-col justify-center items-center w-full ${
                    forCart &&
                    "px-6 lg:px-10 2xl:px-20 py-6 rounded-md bg-gradient-to-r from-green-50 to-red-50"
                  } gap-4`}
                >
                  <Input
                    onChange={(e) => {
                      formik.setFieldValue("name", e.target.value);
                      setError("");
                    }}
                    title="Name"
                    placeholder="Enter your Name"
                    errorMessage={formik.touched.name ? formik.errors.name : ""}
                  />
                  <Input
                    onChange={(e) => {
                      formik.setFieldValue("email", e.target.value);
                      setError("");
                    }}
                    title="Email"
                    placeholder="Enter your Email"
                    errorMessage={
                      formik.touched.email ? formik.errors.email : ""
                    }
                  />
                  <Input
                    onChange={(e) => {
                      formik.setFieldValue("phoneNumber", e.target.value);
                      setError("");
                    }}
                    title="phone Number"
                    placeholder="Enter your phone number"
                    errorMessage={
                      formik.touched.phoneNumber
                        ? formik.errors.phoneNumber
                        : ""
                    }
                  />
                  <Input
                    type="password"
                    onChange={(e) => {
                      formik.setFieldValue("password", e.target.value);
                      setError("");
                    }}
                    title="Password"
                    placeholder="Enter your Password"
                    errorMessage={
                      formik.touched.password ? formik.errors.password : ""
                    }
                  />
                  <Input
                    type="password"
                    onChange={(e) => {
                      formik.setFieldValue("confirmPassword", e.target.value);
                      setError("");
                    }}
                    title="Confirm Password"
                    placeholder="Re-enter your Password"
                    errorMessage={
                      formik.touched.confirmPassword
                        ? formik.errors.confirmPassword
                        : ""
                    }
                  />

                  {error && (
                    <div className="text-red-500 text-sm font-medium">
                      {error}
                    </div>
                  )}
                  <Button
                    loading={loading}
                    type="submit"
                    variant="primary"
                    label="Signup"
                  />
                  {!forCart && (
                    <div className="flex items-center gap-2 mt-2">
                      Already have an account?
                      <span
                        onClick={() => {
                          setIsSignup(false);
                          setError("");
                        }}
                        className="text-colorPrimary font-bold underline cursor-pointer"
                      >
                        Login
                      </span>
                    </div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
