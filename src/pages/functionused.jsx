function convertToIST(timestamp) {
    const date = new Date(timestamp);

    // Convert to IST (UTC+5:30)
    const istOffset = 5 * 60 + 30; // IST is UTC+5:30
    const utcOffset = date.getTimezoneOffset(); // Returns minutes difference from UTC

    const istTime = new Date(date.getTime() + (istOffset + utcOffset) * 60000);
    return istTime;
  }

  // Function to check if the given timestamp is today, tomorrow, or another day
  function getDayCategory(timestamp) {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const eventDate = convertToIST(timestamp); // Convert event time to IST

    // Remove time parts for comparison
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate.getTime() === today.getTime()) {
      return "today";
    } else if (eventDate.getTime() === tomorrow.getTime()) {
      return "tomorrow";
    } else {
      return eventDate.toLocaleDateString(); // Return the actual date string for future days
    }
  }

  // Function to format time as 24-hour time (e.g., "13:00")
  function formatTime(timestamp) {
    const date = convertToIST(timestamp);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
 

  export {formatTime,getDayCategory,convertToIST}