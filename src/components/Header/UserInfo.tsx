"use client";

import { LogOut, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

const UserInfo = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const handleSignout = async () => {
    await authClient.signOut();
  };

  return (
    <div className="mb-4 flex items-center justify-center text-sm lg:absolute lg:top-4 lg:right-4 lg:mb-0">
      {user ? (
        <div className="group flex items-center gap-3 rounded-2xl border border-neutral-200/80 bg-white/90 p-1.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-300 hover:border-neutral-300 hover:shadow-[0_12px_35px_-12px_rgba(0,0,0,0.22)]">
          {/* Profile */}
          <Link
            href="/profile"
            aria-label="View profile"
            className="flex items-center gap-2 rounded-xl px-1.5 py-1 transition-colors hover:bg-neutral-50"
          >
            <div className="relative size-9 overflow-hidden rounded-full ring-2 ring-danger/20 ring-offset-2 ring-offset-white">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile"}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-neutral-100 text-neutral-500">
                  <UserRound className="size-4" />
                </div>
              )}
            </div>

            {/* <div className="hidden max-w-32 flex-col text-left sm:flex"> */}

            <div className="hidden flex-col text-left sm:flex">
              <span className="truncate text-xs font-bold text-neutral-900">
                {user.name}
              </span>

              <span className="text-[10px] font-medium tracking-wide text-neutral-400">
                {/* PROFILE */}
                {user.email}
              </span>
            </div>
          </Link>

          {/* Sign out */}
          <button
            type="button"
            onClick={handleSignout}
            aria-label="Sign out"
            className="group/logout flex h-9 items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 text-xs font-bold text-red-600 transition-all duration-200 hover:border-red-200 hover:bg-red-600 hover:text-white hover:shadow-[0_6px_18px_-6px_rgba(220,38,38,0.45)] active:scale-95 cursor-pointer"
          >
            <LogOut className="size-3.5 transition-transform duration-200 group-hover/logout:-translate-x-0.5" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-2xl border border-neutral-200/80 bg-white/90 p-1.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] backdrop-blur-md">
          <Link href="/signin" className="btn-glass px-3 py-1.5">
            সাইন ইন
          </Link>

          <Link href="/signup" className="btn-premium px-4 py-1.5">
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;

/* <div className="flex items-center gap-2 rounded-2xl border border-neutral-200/80 bg-white/90 p-1.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] backdrop-blur-md">
          <Link
            href="/signin"
            className="rounded-xl px-3 py-2 text-xs font-bold text-neutral-600 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-950"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-xl bg-neutral-950 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-danger hover:shadow-[0_8px_20px_-8px_rgba(220,38,38,0.5)] active:scale-95"
          >
            সাইন আপ
          </Link>
        </div>
*/

// "use client";

// import { authClient } from "@/lib/auth-client";

// const UserInfo = () => {
//   /* const {
//     data: session,
//     isPending, //loading state
//     error, //error object
//     refetch, //refetch the session
//   } = authClient.useSession(); */

//   // const session = authClient.useSession();
//   // console.log(session);

//   const { data: session } = authClient.useSession();
//   const user = session?.user;

//   // console.log(user);

//   const handleSignout = async () => {
//     await authClient.signOut();
//   };

//   return (
//     <div className="mb-4 flex items-center justify-center gap-3 text-sm/[1.43] md:absolute md:top-4 md:right-4 md:mb-0 md:justify-end">
//       {user ? (
//         <div className="flex flex-col items-center gap-2">
//           <Link href={"/profile"}>
//             <div className="avatar">
//               <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
//                 <Image
//                   alt=""
//                   src={user?.image as string}
//                 />
//               </div>
//             </div>
//           </Link>

//           <h2>{user?.name}</h2>

//           <button onClick={handleSignout} className="btn btn-error btn-xs">
//             Signout
//           </button>
//         </div>
//       ) : (
//         <div>
//           <button type="button" className="btn-glass px-3 py-1.5">
//             সাইন ইন
//           </button>

//           <button type="button" className="btn-premium px-4 py-1.5">
//             সাইন আপ
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserInfo;
