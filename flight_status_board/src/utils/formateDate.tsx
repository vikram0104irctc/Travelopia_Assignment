export function getFormatedTime(departureTime: string): string {
  const date = new Date(departureTime);
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedTime = `${hours}:${formattedMinutes} ${amPm}`;
  return formattedTime;
}

export function getFormatedTimeRandom(formattedTime: string): string {
  const [time, amPm] = formattedTime.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (amPm === "PM" && hours !== 12) {
    hours += 12;
  } else if (amPm === "AM" && hours === 12) {
    hours = 0;
  }
  const randomHours = Math.floor(Math.random() * 24) + 1;
  let newHours = (hours + randomHours) % 24;
  const newAmPm = newHours >= 12 ? "PM" : "AM";
  newHours = newHours % 12 || 12;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const newFormattedTime = `${newHours}:${formattedMinutes} ${newAmPm}`;
  return newFormattedTime;
}

