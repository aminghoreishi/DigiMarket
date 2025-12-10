"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BeatLoader } from "react-spinners";

import Swal from "sweetalert2";
import Link from "next/link";
import { handleSignIn } from "@/config/auth";

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
};

function Page() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const route = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });

  const onSubmit = async (data: FormValues) => {
    const obj = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    };

    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
        credentials: "include",
      });

      const response = await res.json();
      console.log("Login response:", response);

      if (res.status === 200) {
        route.push("/");
        route.refresh();
      } else {
        Swal.fire({
          title: response.message || "خطا در ورود",
          icon: "error",
          confirmButtonText: "باشه",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        title: "خطا در ارتباط با سرور",
        icon: "error",
        confirmButtonText: "باشه",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="flex min-h-screen items-center bg-gray-100 justify-center"
    >
      <div className="shadow-2xl rounded-xl bg-white font-danaMed max-sm:w-[350px] w-[400px]">
        <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-xs">ایمیل</label>
              <input
                type="text"
                placeholder="example@gmail.com"
                className="border-2 border-zinc-200 outline-0 px-3 py-2 rounded-xl text-xs"
                {...register("email", {
                  required: "ایمیل الزامی است",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "ایمیل معتبر نیست",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs">رمز عبور</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="رمز عبور خود را وارد کنید"
                  className="border-2 border-zinc-200 w-full outline-0 px-3 py-2 rounded-xl text-xs"
                  {...register("password", {
                    required: "رمز عبور الزامی است",
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "رمز باید حداقل ۸ کاراکتر و شامل حرف و عدد باشد",
                    },
                  })}
                />
                {showPassword ? (
                  <div
                    className="absolute left-2 top-2.5"
                    onClick={() => setShowPassword((pre) => !pre)}
                  >
                    <FaEye color="orange" className="cursor-pointer" />
                  </div>
                ) : (
                  <div
                    className="absolute left-2 top-2.5 cursor-pointer"
                    onClick={() => setShowPassword((pre) => !pre)}
                  >
                    <FaEyeSlash color="orange" />
                  </div>
                )}
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>

            {errors.agree && (
              <span className="text-red-500 text-xs">
                {errors.agree.message}
              </span>
            )}
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="bg-orange-500 text-white w-full rounded-xl py-2 cursor-pointer text-sm"
            >
              {isLoading ? <BeatLoader size={9} color="white" /> : "وارد شوید"}
            </button>
          </div>
        </form>

        {
          <div className="px-4 mb-3">
            <button
              onClick={() => {
                handleSignIn();
              }}
              className="flex items-center justify-center gap-2 border-2 border-zinc-300 w-full rounded-xl py-2 cursor-pointer text-xs"
            >
              <FcGoogle size={18} />
              ادامه با گوگل
            </button>
          </div>
        }

        <hr className="text-zinc-400" />
        <div className="my-3 text-xs flex justify-center">
          <p>
            حساب کاربری ندارید؟{" "}
            <Link href="/reg">
              <span className="text-orange-500 cursor-pointer">ثبت نام</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
