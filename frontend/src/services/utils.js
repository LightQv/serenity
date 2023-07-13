export default function countdown(meet) {
  // Setting time variables
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;

  // Now's date
  const now = new Date();

  // Gap between Appointment and Today's date
  const distance = new Date(meet) - now;

  if (distance <= 0) return 0;
  return Math.ceil(distance / day);
}

// Calculate Progression Bar Width based on how many content are completed
export function getProgressionPercentage(actual, total) {
  return `${parseInt((actual * 100) / total, 10)}%`;
}

// Render lighter version of background-color
export function getProgressionBackground(theme) {
  if (theme === "#d9b520") return "#f5d23f";
  if (theme === "#079fa5") return "#4fd5b8";
  if (theme === "#c1486c") return "#f85585";
  return null;
}
