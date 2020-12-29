const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDate(arrival, departure, months = monthNames) {
  arrival = new Date(arrival);
  const arrivalDay = arrival.getDate();
  const arrivalMonth = arrival.getMonth();
  const arrivalYear = arrival.getFullYear();

  departure = new Date(departure);
  const departureDay = departure.getDate();
  const departureMonth = departure.getMonth();
  const departureYear = departure.getFullYear();

  let date = "";
  if (arrivalYear === departureYear) {
    if (arrivalMonth === departureMonth) {
      if (arrivalDay === departureDay) {
        date = `${months[arrivalMonth]} ${arrivalDay}`; // Feb 8
      } else {
        date = `${months[arrivalMonth]} ${arrivalDay} - ${departureDay}`; // Feb 1 - 3
      }
    } else {
      date = `${months[arrivalMonth]} ${arrivalDay} - ${months[departureMonth]} ${departureDay}`; // Jan 18 — Feb 3
    }
  } else {
    if (Math.floor((departure - arrival) / 86400000) >= 365) {
      date = `${months[arrivalMonth]} ${arrivalDay} ${arrivalYear} - ${months[departureMonth]} ${departureDay} ${departureYear}`; // Jun 14 2018 — Feb 5 2020
    } else {
      date = `${months[arrivalMonth]} ${arrivalDay} - ${months[departureMonth]} ${departureDay}`; // Dec 30 - Jan 15
    }
  }

  return date;
}

module.exports = { formatDate };
