"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "./AuthContext";

export type AuthFormsProps = {
  defaultTab?: "login" | "register";
  showTabs?: boolean;
};

type LoginValues = {
  email: string;
  password: string;
};

type RegisterValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  })
  .required();

const registerSchema = yup
  .object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
  })
  .required();

export default function AuthForms({ defaultTab = "login", showTabs = true }: AuthFormsProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  const router = useRouter();
  const { login, register, authError, isAuthenticating } = useAuth();

  const loginForm = useForm<LoginValues>({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const registerForm = useForm<RegisterValues>({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  const helperText = useMemo(
    () =>
      activeTab === "login"
        ? "Welcome back! Log in to manage your SDK keys."
        : "Create an account to start generating SDK keys.",
    [activeTab]
  );

  const handleLogin = async (values: LoginValues) => {
    const success = await login(values);
    if (success) {
      router.push("/home");
    }
  };

  const handleRegister = async (values: RegisterValues) => {
    const success = await register(values);
    if (success) {
      router.push("/home");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {showTabs && (
        <div className="flex gap-2 rounded-full bg-zinc-100 p-1 text-sm font-medium dark:bg-zinc-900">
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className={`flex-1 rounded-full px-4 py-2 transition ${
              activeTab === "login"
                ? "bg-white text-zinc-900 shadow dark:bg-zinc-800 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={`flex-1 rounded-full px-4 py-2 transition ${
              activeTab === "register"
                ? "bg-white text-zinc-900 shadow dark:bg-zinc-800 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            }`}
          >
            Register
          </button>
        </div>
      )}

  <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{helperText}</p>

        {authError && (
          <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
            {authError}
          </p>
        )}

        {activeTab === "login" ? (
          <form className="mt-6 space-y-4" onSubmit={loginForm.handleSubmit(handleLogin)}>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="login-email">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                className="w-full rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-800 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
                {...loginForm.register("email")}
              />
              {loginForm.formState.errors.email && (
                <p className="text-xs text-rose-500">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-800 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
                {...loginForm.register("password")}
              />
              {loginForm.formState.errors.password && (
                <p className="text-xs text-rose-500">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-400"
            >
              {isAuthenticating ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <form
            className="mt-6 space-y-4"
            autoComplete="off"
            onSubmit={registerForm.handleSubmit(handleRegister)}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="register-email">
                Email
              </label>
              <input
                id="register-email"
                type="email"
                autoComplete="off"
                className="w-full rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-800 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
                {...registerForm.register("email")}
              />
              {registerForm.formState.errors.email && (
                <p className="text-xs text-rose-500">
                  {registerForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="register-password">
                Password
              </label>
              <input
                id="register-password"
                type="password"
                autoComplete="new-password"
                className="w-full rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-800 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
                {...registerForm.register("password")}
              />
              {registerForm.formState.errors.password && (
                <p className="text-xs text-rose-500">
                  {registerForm.formState.errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="register-confirm-password">
                Confirm password
              </label>
              <input
                id="register-confirm-password"
                type="password"
                autoComplete="new-password"
                className="w-full rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-800 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
                {...registerForm.register("confirmPassword")}
              />
              {registerForm.formState.errors.confirmPassword && (
                <p className="text-xs text-rose-500">
                  {registerForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-400"
            >
              {isAuthenticating ? "Registering..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
