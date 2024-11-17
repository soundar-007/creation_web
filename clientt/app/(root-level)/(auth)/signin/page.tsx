"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Cookies from "@/node_modules/@types/js-cookie";
import { useAuth } from "@/app/contexts/AuthContext";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function page() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [eyeToggle, eyeOffToggle] = useState(true);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const email = e.target[0]?.value.trim();
    const password = e.target[1]?.value.toLowerCase().trim();
    setLoading(true);
    setError(null);
    if (!isValidEmail(email)) {
      setError("Email is invalid");
      toast.error("Email is invalid");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Password is invalid");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        "https://creation-web.onrender.com/api/auth/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Something went wrong");
        toast.error(errorData.message);
      } else {
        router.push("/dashboard");
        toast.success("Successfully Logged In !!");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex justify-center flex-col items-center">
        <h2 className=" mt-6 text-center text-2xl leading-9 tracking-tight text-gray-900">
          Welcome Back ! <br />
          <span className="text-slate-500 text-sm">
            Please enter your email and password to login
          </span>
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <Input
                  type="text"
                  name="email"
                  autoComplete="email"
                  placeholder="Email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <Input
                  id="password"
                  name="password"
                  type={eyeToggle ? "password" : "text"}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {!eyeToggle ? (
                  <span
                    onClick={() => eyeOffToggle((prev) => !prev)}
                    className="absolute right-2 top-2 cursor-pointer "
                  >
                    <EyeIcon size={18} />
                  </span>
                ) : (
                  <span
                    onClick={() => eyeOffToggle((prev) => !prev)}
                    className="absolute right-2 top-2 cursor-pointer "
                  >
                    <EyeOffIcon size={18} />
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />

                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm leading-6 text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm leading-6">
                <Link href="#" className="text-black hover:text-gray-900">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="flex w-full border border-blue-800 justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-white transition-colors hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {loading ? "Loading.." : "Sign in"}
              </Button>
            </div>
            <div className="text-center text-sm text-gray-400">
              <p>
                {" "}
                Not registered yet ?{" "}
                <Link className="text-blue-700 " href={"signup"}>
                  Create an Account
                </Link>
              </p>
            </div>
          </form>

          <div>
            <p className="text-red-600 text-center text-[16px] my-4">
              {error && error}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
