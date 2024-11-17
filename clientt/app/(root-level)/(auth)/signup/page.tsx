"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [eyeToggle, eyeOffToggle] = useState(true);
  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const email = e.target[0].value;
    const username = e.target[1].value.trim();
    const password = e.target[2].value.toLowerCase().trim();
    if (!isValidEmail(email)) {
      setError("Email is invalid");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        "https://creation-web.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, username, password }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Something went wrong");
        toast.error(error);
      } else {
        toast.success("Registered Successfully Done");
        router.push("/signin");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex justify-center flex-col items-center">
        <h2 className="mt-6 text-center text-2xl leading-9 tracking-tight text-gray-900">
          Sign up on our website
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <Input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
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
                  required
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
                  Accept our terms and privacy policy
                </label>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="flex w-full border border-blue-800 justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-white transition-colors hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                disabled={loading}
              >
                {loading ? "Loading.." : "Sign up"}
              </Button>
              <p className="text-red-600 text-center text-[16px] my-4">
                {error && error}
              </p>
            </div>
            <div className="text-center text-sm text-gray-400">
              <p>
                Already Have an Account ?{" "}
                <Link className="text-blue-700 " href={"signin"}>
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
