import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import api from "../../api/axios";

export default function Register() {
  let nav = useNavigate();
  const registerSchema = z
    .object({
      name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name must be at most 30 characters"),
      email: z.string().email("Please enter a valid email"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password must be at most 50 characters"),
      confrimPassword: z.string(),
      userName: z.string().min(1, "Username is required"),

      // optional: profile image as File
      // profileImage: z
      //   .any()
      //   .refine((file) => file?.length === 1, "Profile image is required"),
    })
    .refine((data) => data.password === data.confrimPassword, {
      message: "Passwords must match",
      path: ["confrimPassword"],
    });

  let registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confrimPassword: "",

      userName: "",
      // profileImage: null,
    },
  });
  // console.log(registerForm);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = registerForm;

  function doRegister(form) {
    console.log(form);

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      confrimPassword: form.confrimPassword, // note the backend spelling
      userName: form.userName,
    };
    api
      .post("/authentication/register", payload)
      .then((res) => {
        console.log(res.data);
        nav("/login");
      })
      .catch((err) => {
        console.error("Registration error:", err.response?.data || err.message);
      });
  }

  return (
    <div className="mt-52 auth-page">
      <form
        className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg mt-12 auth-card register-card"
        onSubmit={handleSubmit(doRegister)}
      >
        <h1 className="text-center text-2xl font-semibold text-white mb-8 auth-title">
          Create Account
        </h1>
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
        <div className="relative z-0 w-full mb-5 group auth-field">
          <input
            type="password"
            name="repeat_password"
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent  border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer auth-input"
            placeholder=" "
            required
            {...register("confrimPassword")}
          />
          {errors.confrimPassword && (
            <p className="text-red-500 text-sm auth-error">
              {errors.confrimPassword.message}
            </p>
          )}
          <label
            htmlFor="floating_repeat_password"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto auth-label"
          >
            Confirm password
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6 auth-grid">
          <div className="relative z-0 w-full mb-5 group auth-field">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent  border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer auth-input"
              placeholder=" "
              required
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm auth-error">
                {errors.name.message}
              </p>
            )}
            <label
              htmlFor="floating_first_name"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto auth-label"
            >
              name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group auth-field">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent  border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer auth-input"
              placeholder=" "
              required
              {...register("userName")}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm auth-error">
                {errors.userName.message}
              </p>
            )}
            <label
              htmlFor="floating_last_name"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto auth-label"
            >
              user name
            </label>
          </div>
        </div>
        {/* <div className="relative z-0 w-full mb-5 group auth-field">
          <input
            type="text"
            name="floating_first_name"
            id="floating_first_name"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent  border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer auth-input"
            placeholder=" "
            required
            {...register("role")}
          />
          <label
            htmlFor="floating_first_name"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto auth-label"
          >
            {errors.role && (
              <p className="text-red-500 text-sm auth-error">
                {errors.role.message}
              </p>
            )}
            role
          </label>
        </div> */}
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
          Submit
        </button>
      </form>
    </div>
  );
}
