// import { formatBanglaDate } from "@/lib/date";
import Image from "next/image";
import TodayDate from "../Common/TodayDate";
import NavLinks from "./NavLinks";

const Header = () => {
  // const date = formatBanglaDate();

  return (
    <header className="relative mx-auto max-w-7xl px-4 py-4">
      {/* Buttons: in flow above the logo on mobile, pinned top-right on md+ */}
      <div className="mb-4 flex items-center justify-center gap-3 text-sm/[1.43] md:absolute md:top-4 md:right-4 md:mb-0 md:justify-end">
        <button type="button" className="btn-glass px-3 py-1.5 ">
          সাইন ইন
        </button>

        <button type="button" className="btn-premium px-4 py-1.5">
          সাইন আপ
        </button>
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
        <Image
          src="/logo.webp"
          alt="Bangla News 24"
          width={50}
          height={50}
          priority
        />

        <div className="flex flex-col items-center sm:items-start">
          <span className="text-2xl/[1.33] font-bold text-danger">
            Bangla News 24
          </span>

          <TodayDate className="text-xs/[1.33] text-[#737373]" />

          {/* <span className="text-xs/[1.33] text-neutral-500">{date}</span> */}
        </div>
      </div>

      {/* Navbar */}
      <NavLinks />
    </header>
  );
};

export default Header;

// import Image from "next/image";
// import NavLinks from "./NavLinks";

// const Header = () => {
//   const date = new Date().toLocaleDateString("bn-BD", {
//     dateStyle: "full",
//   });

//   // console.log(date);

//   return (
//     <header className="relative max-w-7xl mx-auto px-4 py-4">
//       <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
//         <Image
//           src={"/logo.webp"}
//           alt="Bangla News 24"
//           width={50}
//           height={50}
//           priority
//         />

//         <div className="flex flex-col items-center sm:items-start">
//           <span className="text-2xl/[1.33] text-danger font-bold">
//             Bangle News 24
//           </span>

//           <span className="text-[#737373] text-xs/[1.33]">{date}</span>
//         </div>
//       </div>

//       {/* Button */}
//       <div className="absolute right-4 top-4 flex items-center gap-3 text-sm/[1.43]">
//         <button
//           type="button"
//           className="cursor-pointer rounded-lg border border-transparent px-3 py-1.5 text-[#404040] transition-all duration-300 hover:border-danger/20 hover:bg-danger/10 hover:text-danger hover:shadow-[0_4px_16px_rgba(196,0,4,0.15),inset_0_1px_0_rgba(255,255,255,0.7)] hover:backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger"
//         >
//           সাইন ইন
//         </button>

//         <button
//           type="button"
//           className="relative cursor-pointer overflow-hidden rounded-lg bg-linear-to-b from-danger to-danger-foreground px-4 py-1.5 font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.2),0_4px_12px_rgba(196,0,4,0.3),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-300 after:pointer-events-none after:absolute after:inset-0 after:-translate-x-full after:bg-linear-to-r after:from-transparent after:via-white/25 after:to-transparent after:transition-transform after:duration-700 hover:-translate-y-px hover:shadow-[0_2px_4px_rgba(0,0,0,0.2),0_8px_20px_rgba(196,0,4,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] hover:after:translate-x-full active:translate-y-0 active:shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(0,0,0,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger motion-reduce:transition-none motion-reduce:after:hidden"
//         >
//           সাইন আপ
//         </button>
//       </div>

//       {/* Navbar */}
//       <NavLinks />
//     </header>
//   );
// };

// export default Header;
