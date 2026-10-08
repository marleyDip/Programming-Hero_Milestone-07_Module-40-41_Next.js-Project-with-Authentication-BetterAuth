const SignUpLoading = () => {
  return (
    <main className="min-h-screen bg-[#fafafa] px-4 py-10 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="w-full animate-pulse">
          {/* Brand */}
          <div className="mb-10 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-8 rounded-full bg-neutral-200" />
              <div className="h-3 w-24 rounded-full bg-neutral-200" />
              <div className="h-px w-8 rounded-full bg-neutral-200" />
            </div>

            <div className="mx-auto flex w-fit items-baseline gap-2">
              <div className="h-9 w-40 rounded-md bg-neutral-200 sm:h-10 sm:w-48" />
              <div className="h-9 w-8 rounded-md bg-neutral-200 sm:h-10 sm:w-9" />
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div className="h-0.5 flex-1 rounded-full bg-neutral-200" />
              <div className="size-1.5 rotate-45 rounded-sm bg-neutral-200" />
              <div className="h-0.5 flex-1 rounded-full bg-neutral-200" />
            </div>

            <div className="mx-auto mt-8 h-9 w-64 rounded-lg bg-neutral-200" />
            <div className="mx-auto mt-3 h-4 w-72 max-w-full rounded bg-neutral-100" />
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.12)] sm:p-8">
            <div className="space-y-5">
              {/* Name */}
              <div>
                <div className="mb-2 h-4 w-20 rounded bg-neutral-200" />
                <div className="h-12 w-full rounded-xl bg-neutral-100" />
              </div>

              {/* Image */}
              <div>
                <div className="mb-2 h-4 w-24 rounded bg-neutral-200" />
                <div className="h-12 w-full rounded-xl bg-neutral-100" />
              </div>

              {/* Email */}
              <div>
                <div className="mb-2 h-4 w-16 rounded bg-neutral-200" />
                <div className="h-12 w-full rounded-xl bg-neutral-100" />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 h-4 w-24 rounded bg-neutral-200" />
                <div className="h-12 w-full rounded-xl bg-neutral-100" />
              </div>

              {/* Terms */}
              <div className="flex items-center gap-2 pt-1">
                <div className="size-4 rounded bg-neutral-200" />
                <div className="h-3 w-52 max-w-[calc(100%-1.5rem)] rounded bg-neutral-100" />
              </div>

              {/* Submit */}
              <div className="h-12 w-full rounded-xl bg-neutral-200" />

              {/* Divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-neutral-100" />
                <div className="h-3 w-8 rounded bg-neutral-100" />
                <div className="h-px flex-1 bg-neutral-100" />
              </div>

              {/* Social buttons */}
              <div className="grid grid-cols-2 gap-3">
                <div className="h-11 rounded-xl bg-neutral-100" />
                <div className="h-11 rounded-xl bg-neutral-100" />
              </div>
            </div>
          </div>

          {/* Sign in */}
          <div className="mx-auto mt-6 h-4 w-48 rounded bg-neutral-100" />
        </div>
      </div>
    </main>
  );
};

export default SignUpLoading;
