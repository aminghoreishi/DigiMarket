"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { BeatLoader } from "react-spinners";

import Swal from "sweetalert2";
import Link from "next/link";

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
};

function Page() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
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
      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      if (res.status === 201) {
        Swal.fire({
          title: "با موفقیت ایجاد شد",
          icon: "success",
          confirmButtonText: "باشه",
          customClass: {
            popup: "!text-xs font-danaMed",
          },
        }).then((res) => {
          route.push("/");
        });
      } else if (res.status === 422) {
        Swal.fire({
          title: "ایمیل وارد شده قبلا ایجاد شده است",
          icon: "error",
          confirmButtonText: "باشه",
          customClass: {
            popup: "!text-xs font-danaMed",
          },
        });
      } else if (res.status === 500) {
        Swal.fire({
          title: "خطا در سمت سرور",
          icon: "error",
          confirmButtonText: "باشه",
          customClass: {
            popup: "!text-xs font-danaMed",
          },
        });
      }
    } catch (error) {
      setIsLoading(false);
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
            <div className="flex flex-col gap-2">
              <label className="text-xs">نام و نام خانوادگی</label>
              <input
                type="text"
                placeholder="نام کامل خود را وارد کنید"
                className="border-2 border-zinc-200 outline-0 px-3 py-2 rounded-xl text-xs"
                {...register("fullName", {
                  required: "نام الزامی است",
                  pattern: {
                    value: /^[\u0600-\u06FFa-zA-Z\s]{3,30}$/,
                    message: "نام معتبر وارد کنید",
                  },
                })}
              />
              {errors.fullName && (
                <span className="text-red-500 text-xs">
                  {errors.fullName.message}
                </span>
              )}
            </div>

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

            <div className="flex flex-col gap-2">
              <label className="text-xs">تکرار رمز عبور</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="رمز عبور را دوباره وارد کنید"
                  className="border-2 border-zinc-200 w-full outline-0 px-3 py-2 rounded-xl text-xs"
                  {...register("confirmPassword", {
                    required: "تکرار رمز عبور الزامی است",
                    validate: (value) =>
                      value === watch("password") || "رمز عبور مطابقت ندارد",
                  })}
                />
                <div
                  className="absolute left-2 top-2.5"
                  onClick={() => setShowConfirmPassword((pre) => !pre)}
                >
                  <FaEye color="orange" className="cursor-pointer" />
                </div>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("agree", {
                  required: "باید با قوانین موافقت کنید",
                })}
              />
              <label className="text-xs">با قوانین و مقررات موافقم</label>
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
              className="bg-orange-500 text-white w-full rounded-xl py-2 cursor-pointer text-xs"
            >
              {isLoading ? <BeatLoader size={9} color="white" /> : "ثبت نام"}
            </button>
          </div>
        </form>

        <hr className="text-zinc-400" />
        <div className="my-3 text-xs flex justify-center">
          <p>
            قبلاً ثبت‌نام کرده‌اید؟{" "}
            <Link href="/login">
              <span className="text-orange-500 cursor-pointer">وارد شوید</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
