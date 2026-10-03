const TIME_ZONE = "Asia/Dhaka";

/**
 * Bangla date in Dhaka time, e.g. "রবিবার, ৪ অক্টোবর, ২০২৬".
 * Defaults to today; also accepts article timestamps (Date, ISO string, or ms).
 */
export const formatBanglaDate = (
  date: Date | string | number = new Date(),
  dateStyle: Intl.DateTimeFormatOptions["dateStyle"] = "full",
): string =>
  new Date(date).toLocaleDateString("bn-BD", {
    dateStyle,
    timeZone: TIME_ZONE,
  });

/**
 * "YYYY-MM-DD" for the Dhaka calendar day, for <time dateTime={...}>.
 * Defaults to today.
 */
export const toIsoDate = (date: Date | string | number = new Date()): string =>
  new Date(date).toLocaleDateString("en-CA", { timeZone: TIME_ZONE });

/* 
const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
});
  
*/
