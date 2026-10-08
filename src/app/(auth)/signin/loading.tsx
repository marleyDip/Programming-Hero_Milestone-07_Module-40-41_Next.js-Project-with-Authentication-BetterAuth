const SignInLoading = () => {
  return (
    <main className="min-h-screen bg-[#fafafa] px-4 py-10 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="w-full animate-pulse">
          {/* Brand */}
          <div className="mb-9 text-center">
            <div className="mx-auto flex w-fit items-center gap-3">
              <div className="size-11 rounded-2xl bg-neutral-200" />

              <div className="flex items-center gap-1.5">
                <div className="h-6 w-28 rounded-md bg-neutral-200 sm:w-32" />
                <div className="h-6 w-6 rounded-md bg-neutral-200" />
              </div>
            </div>

            {/* Heading */}
            <div className="mx-auto mt-8 h-9 w-32 rounded-lg bg-neutral-200" />

            <div className="mx-auto mt-3 h-4 w-64 max-w-full rounded bg-neutral-100" />
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.12)] sm:p-8">
            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <div className="h-11 rounded-xl bg-neutral-100" />
              <div className="h-11 rounded-xl bg-neutral-100" />
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-neutral-100" />
              <div className="h-3 w-24 rounded bg-neutral-100" />
              <div className="h-px flex-1 bg-neutral-100" />
            </div>

            {/* Email */}
            <div className="mb-5">
              <div className="mb-2 h-4 w-24 rounded bg-neutral-200" />
              <div className="h-12 rounded-xl bg-neutral-100" />
            </div>

            {/* Password */}
            <div className="mb-5">
              <div className="mb-2 flex justify-between">
                <div className="h-4 w-20 rounded bg-neutral-200" />
                <div className="h-3 w-24 rounded bg-neutral-100" />
              </div>

              <div className="h-12 rounded-xl bg-neutral-100" />
            </div>

            {/* Submit */}
            <div className="h-12 rounded-xl bg-neutral-200" />

            {/* Sign up */}
            <div className="mx-auto mt-7 h-4 w-48 rounded bg-neutral-100" />
          </div>

          {/* Terms */}
          <div className="mx-auto mt-4 h-8 w-80 max-w-full rounded bg-neutral-100" />
        </div>
      </div>
    </main>
  );
};

export default SignInLoading;
