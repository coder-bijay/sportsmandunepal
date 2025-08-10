"use client";

import React, { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { Form, Formik } from "formik";
import * as Yup from "yup";

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
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const AuthForm = () => {
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="relative w-full overflow-hidden min-h-[320px]">
      {/* Forms container with sliding animation */}
      <div
        className={`flex transition-transform duration-500 ease-in-out ${
          isSignup ? "-translate-x-1/2" : "translate-x-0"
        } w-[200%]`}
      >
        {/* LOGIN FORM */}
        <div className="w-1/2 px-4">
          <Formik
            onSubmit={(values) => {
              setLoading(true);
              console.log("Login:", values);
              setTimeout(() => setLoading(false), 1000);
            }}
            validationSchema={loginValidationSchema}
            initialValues={{ email: "", password: "" }}
          >
            {(formik) => (
              <Form className="w-full h-full items-center justify-center">
                <div className="flex flex-col gap-4 pb-6 px-6 items-center justify-center w-full h-full">
                  <Input
                    onChange={(e) =>
                      formik.setFieldValue("email", e.target.value)
                    }
                    title="Email"
                    placeholder="Enter your Email"
                    errorMessage={
                      formik.touched.email ? formik.errors.email : ""
                    }
                  />
                  <Input
                    type="password"
                    onChange={(e) =>
                      formik.setFieldValue("password", e.target.value)
                    }
                    title="Password"
                    placeholder="Enter your Password"
                    errorMessage={
                      formik.touched.password ? formik.errors.password : ""
                    }
                  />

                  <Button
                    loading={loading}
                    type="submit"
                    variant="primary"
                    label="Login"
                  />

                  <div className="flex items-center gap-2 mt-2">
                    Don't have an account?
                    <span
                      onClick={() => setIsSignup(true)}
                      className="text-colorPrimary font-bold underline cursor-pointer"
                    >
                      Signup
                    </span>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* SIGNUP FORM */}
        <div className="w-1/2 px-4">
          <Formik
            onSubmit={(values) => {
              setLoading(true);
              console.log("Signup:", values);
              setTimeout(() => setLoading(false), 1000);
            }}
            validationSchema={signupValidationSchema}
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
          >
            {(formik) => (
              <Form>
                <div className="flex flex-col gap-4 pb-6 px-6 pt-4 items-center justify-center w-full">
                  <Input
                    onChange={(e) =>
                      formik.setFieldValue("name", e.target.value)
                    }
                    title="Name"
                    placeholder="Enter your Name"
                    errorMessage={formik.touched.name ? formik.errors.name : ""}
                  />
                  <Input
                    onChange={(e) =>
                      formik.setFieldValue("email", e.target.value)
                    }
                    title="Email"
                    placeholder="Enter your Email"
                    errorMessage={
                      formik.touched.email ? formik.errors.email : ""
                    }
                  />
                  <Input
                    type="password"
                    onChange={(e) =>
                      formik.setFieldValue("password", e.target.value)
                    }
                    title="Password"
                    placeholder="Enter your Password"
                    errorMessage={
                      formik.touched.password ? formik.errors.password : ""
                    }
                  />
                  <Input
                    type="password"
                    onChange={(e) =>
                      formik.setFieldValue("confirmPassword", e.target.value)
                    }
                    title="Confirm Password"
                    placeholder="Re-enter your Password"
                    errorMessage={
                      formik.touched.confirmPassword
                        ? formik.errors.confirmPassword
                        : ""
                    }
                  />

                  <Button
                    loading={loading}
                    type="submit"
                    variant="primary"
                    label="Signup"
                  />

                  <div className="flex items-center gap-2 mt-2">
                    Already have an account?
                    <span
                      onClick={() => setIsSignup(false)}
                      className="text-colorPrimary font-bold underline cursor-pointer"
                    >
                      Login
                    </span>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
