"use client";

import { Eye, EyeOff, Link2, LockKeyhole, Mail, UserRound } from "lucide-react";

import Link from "next/link";
import { useState } from "react";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Smoothly flips the boolean state visibility flag back and forth
  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <main className="min-h-screen bg-[#fafafa] px-4 py-10 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="w-full">
          {/* Brand */}
          <div className="mb-10 text-center">
            {/* Masthead */}
            <Link
              href="/"
              aria-label="Bangla News 24 homepage"
              className="group inline-flex flex-col items-center"
            >
              {/* Top rule */}
              <span className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-danger/40 transition-all duration-300 group-hover:w-12" />

                <span className="text-[10px] font-bold tracking-[0.3em] text-danger uppercase">
                  Bangladesh
                </span>

                <span className="h-px w-8 bg-danger/40 transition-all duration-300 group-hover:w-12" />
              </span>

              {/* Newspaper name */}
              <span className="flex items-baseline">
                <span className="font-serif text-[2rem] leading-none font-black tracking-tighter text-neutral-950 sm:text-[2.35rem]">
                  Bangla News
                </span>

                <span className="ml-2 font-serif text-[2rem] leading-none font-black tracking-tighter text-danger sm:text-[2.35rem]">
                  24
                </span>
              </span>

              {/* Bottom rule */}
              <span className="mt-3 flex w-full items-center gap-2">
                <span className="h-0.5 flex-1 bg-neutral-950" />

                <span className="size-1.5 rotate-45 bg-danger" />

                <span className="h-0.5 flex-1 bg-neutral-950" />
              </span>
            </Link>

            {/* Welcome */}
            <div className="mt-8">
              <h1 className="text-3xl font-black tracking-[-0.035em] text-neutral-950 sm:text-4xl">
                আপনার অ্যাকাউন্ট তৈরি করুন
              </h1>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                আমাদের সাথে যুক্ত হয়ে মাত্র কয়েক মুহূর্তেই শুরু করে দিন!
              </p>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.18)] sm:p-8">
            {/* Social signup */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex h-11 items-center justify-center gap-2.5 rounded-xl border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-sm"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
                  <path
                    fill="#4285F4"
                    d="M21.35 12.23c0-.78-.07-1.54-.2-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.4Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.74 9.74 0 0 0 12 21.5Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.54 13.6A5.85 5.85 0 0 1 6.23 12c0-.56.1-1.1.31-1.6V7.88H3.3A9.5 9.5 0 0 0 2.25 12c0 1.53.37 2.98 1.05 4.12l3.24-2.52Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.48 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.38l3.24 2.52C7.31 8.1 9.46 6.38 12 6.38Z"
                  />
                </svg>
                Google
              </button>

              <button
                type="button"
                className="flex h-11 items-center justify-center gap-2.5 rounded-xl border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-sm"
              >
                <svg
                  className="w-4 h-4 text-muted fill-current transition-colors duration-300 group-hover:text-primary"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-neutral-200" />

              <span className="text-xs font-medium text-neutral-400">
                OR SIGN UP WITH EMAIL
              </span>

              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            <form className="space-y-5">
              {/* Name */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full name
                </label>

                <div className="input-wrapper">
                  <UserRound className="input-left-icon" />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="form-input-icon"
                    required
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="form-group">
                <label htmlFor="imageUrl" className="form-label">
                  ImageURL
                </label>

                <div className="input-wrapper">
                  <Link2 className="input-left-icon" />

                  <input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    placeholder="https://example.com"
                    className="form-input-icon"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>

                <div className="input-wrapper">
                  <Mail className="input-left-icon" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="form-input-icon"
                    required
                  />
                </div>
              </div>
              {/* Password */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>

                <div className="input-wrapper">
                  <LockKeyhole className="input-left-icon" />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="form-input-icon"
                    required
                  />

                  {/* Right Side Clickable Visibility Controller */}
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="input-right-btn"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-4.5" />
                    ) : (
                      <Eye className="size-4.5" />
                    )}
                  </button>
                </div>
              </div>
              {/* Submit */}
              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-neutral-950 text-sm font-bold text-white shadow-lg shadow-neutral-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-xl hover:shadow-violet-600/20 active:translate-y-0 cursor-pointer"
              >
                সাইন আপ করুন
              </button>
            </form>

            {/* Sign in */}
            <p className="mt-7 text-center text-sm text-neutral-500">
              অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/signin"
                className="font-bold text-neutral-950 transition-colors hover:text-violet-600"
              >
                সাইন ইন করুন
              </Link>
            </p>
          </div>

          <p className="text-center text-xs/normal text-neutral-500 font-primary mt-4 px-4">
            অ্যাকাউন্ট তৈরি করার মাধ্যমে, আপনি আমাদের{" "}
            <a
              href="#"
              className="text-violet-600 underline underline-offset-2 decoration-violet-700 hover:decoration-danger hover:text-danger transition-colors font-medium"
            >
              ব্যবহারের শর্তাবলী
            </a>{" "}
            এবং{" "}
            <a
              href="#"
              className="text-danger underline underline-offset-2 decoration-danger hover:decoration-violet-700 hover:text-violet-600 transition-colors font-medium"
            >
              গোপনীয়তা নীতির
            </a>{" "}
            সাথে সম্মতি প্রকাশ করছেন।
          </p>

          {/* <p className="mt-6 text-center text-xs text-neutral-400">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy.
          </p> */}
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
