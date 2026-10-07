import { cacheLife } from "next/cache";

/** The current year in Bangla digits (২০২৬). Cached, so reading the clock is allowed. */
const CurrentYear = async () => {
  "use cache";
  cacheLife("days");

  return (
    <>
      {new Date().toLocaleDateString("bn-BD", {
        year: "numeric",
        timeZone: "Asia/Dhaka",
      })}
    </>
  );
};

export default CurrentYear;
