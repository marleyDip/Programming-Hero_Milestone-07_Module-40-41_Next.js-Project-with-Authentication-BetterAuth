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
 * "৪ অক্টোবর, ২০২৬ এ ১:২১ PM" in Dhaka time.
 * Takes the article's own timestamp, so it never reads the current time.
 * Returns "" for a missing or invalid value, so callers can simply skip it.
 */
export const formatBanglaDateTime = (
  value: Date | string | number | null | undefined,
): string => {
  if (value == null) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const day = date.toLocaleDateString("bn-BD", {
    dateStyle: "long",
    timeZone: TIME_ZONE,
  });

  const time = date.toLocaleTimeString("bn-BD", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: TIME_ZONE,
  });

  return `${day} এ ${time}`;
};

/** Bangla date pieces in Dhaka time. Returns null for a missing or invalid value. */
export const getBanglaDateParts = (
  value: Date | string | number | null | undefined,
) => {
  if (value == null) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const tz = { timeZone: TIME_ZONE };

  return {
    iso: date.toISOString(),
    day: date.toLocaleDateString("bn-BD", { day: "numeric", ...tz }), // ৪
    month: date.toLocaleDateString("bn-BD", { month: "short", ...tz }), // অক্টো
    monthLong: date.toLocaleDateString("bn-BD", { month: "long", ...tz }), // অক্টোবর
    weekday: date.toLocaleDateString("bn-BD", { weekday: "long", ...tz }), // রবিবার
    year: date.toLocaleDateString("bn-BD", { year: "numeric", ...tz }), // ২০২৬

    time: date.toLocaleTimeString("bn-BD", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      ...tz,
    }), // ৮:৩০ PM
  };
};

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
