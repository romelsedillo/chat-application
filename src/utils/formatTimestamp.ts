export const formatTimestamp = (isoTimestamp: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short", // Shortens the month to "Jan"
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // Ensures 12-hour format with AM/PM
  };

  const date = new Date(isoTimestamp);
  return date.toLocaleDateString("en-US", options);
};

// +
//     ", " +
//     date.toLocaleTimeString("en-US", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     })
