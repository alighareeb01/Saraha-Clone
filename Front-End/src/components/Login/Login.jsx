import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be at most 50 characters"),
});

export default function Login() {
  let registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = registerForm;

  function doLogin(form) {
    console.log(form);

    const payload = {
      email: form.email,
      password: form.password,
    };
    axios
      .post("/api/authentication/login", payload)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
      })
      .catch((err) => {
        console.error("login error:", err.response?.data || err.message);
      });
  }

  return (
    <div className="mt-52 auth-page">
      <form
        className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg mt-12 auth-card login-card"
        onSubmit={handleSubmit(doLogin)}
      >
        <div>
          <h1 className="text-center text-2xl font-semibold text-white mb-8 auth-title">
            Login
          </h1>
        </div>
        <div className="relative z-0 w-full mb-5 group auth-field">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent  border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer auth-input"
            placeholder=" "
            required
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm auth-error">
              {errors.email.message}
            </p>
          )}
          <label
            htmlFor="floating_email"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto auth-label"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group auth-field">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer auth-input"
            placeholder=" "
            required
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm auth-error">
              {errors.password.message}
            </p>
          )}
          <label
            htmlFor="floating_password"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto auth-label"
          >
            Password
          </label>
        </div>

        {/* <div className="grid  md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="file"
              name="floating_phone"
              id="floating_phone"
              accept="image/*"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent  border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" upload photo"
              required
            />
            {errors.profileImage && (
              <p className="text-red-500 text-sm">
                {errors.profileImage.message}
              </p>
            )}
            <label
              htmlFor="floating_phone"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              upload a photo
            </label>
          </div>
        </div> */}

        <button
          type="submit"
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none auth-button"
        >
          login
        </button>
      </form>
    </div>
  );
}
