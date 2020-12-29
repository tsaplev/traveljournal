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

function formatDate(arrival, departure) {
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
        date = `${monthNames[arrivalMonth]} ${arrivalDay}`; // Feb 8
      } else {
        date = `${monthNames[arrivalMonth]} ${arrivalDay} - ${departureDay}`; // Feb 1 - 3
      }
    } else {
      date = `${monthNames[arrivalMonth]} ${arrivalDay} - ${monthNames[departureMonth]} ${departureDay}`; // Jan 18 — Feb 3
    }
  } else {
    if (Math.floor((departure - arrival) / 86400000) >= 365) {
      date = `${monthNames[arrivalMonth]} ${arrivalDay} ${arrivalYear} - ${monthNames[departureMonth]} ${departureDay} ${departureYear}`; // Jun 14 2018 — Feb 5 2020
    } else {
      date = `${monthNames[arrivalMonth]} ${arrivalDay} - ${monthNames[departureMonth]} ${departureDay}`; // Dec 30 - Jan 15
    }
  }

  return date;
}

function generateShareData(data) {
  return `<script>window.shareData = ${JSON.stringify(data)};</script>`;
}

module.exports = { formatDate, generateShareData };
