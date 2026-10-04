import { cacheLife } from "next/cache";

const CurrentYear = async () => {
  "use cache";
  cacheLife("days");

  return <>{new Date().getFullYear()}</>;
};

export default CurrentYear;
