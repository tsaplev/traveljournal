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

const dateToHRString = (_arrival, _departure) => {
  const arrival = new Date(_arrival);
  const arrivalDay = arrival.getDate();
  const arrivalMonth = arrival.getMonth();
  const arrivalYear = arrival.getFullYear();

  const departure = new Date(_departure);
  const departureDay = departure.getDate();
  const departureMonth = departure.getMonth();
  const departureYear = departure.getFullYear();

  let date = "";
  if (arrivalYear === departureYear) {
    if (arrivalDay === departureDay && arrivalMonth === departureMonth) {
      date = `${monthNames[arrivalMonth]} ${arrivalDay}`; // Feb 8
    } else if (arrivalMonth !== departureMonth) {
      date = `${monthNames[arrivalMonth]} ${arrivalDay} - ${monthNames[departureMonth]} ${departureDay}`; // Jan 18 — Feb 3
    } else if (arrivalDay !== departureDay && arrivalMonth === departureMonth) {
      date = `${monthNames[arrivalMonth]} ${arrivalDay} - ${departureDay}`; // Feb 1 - 3
    }
  } else {
    if (Math.floor((departure - arrival) / 86400000) > 364) {
      date = `${monthNames[arrivalMonth]} ${arrivalDay} ${arrivalYear} - ${monthNames[departureMonth]} ${departureDay} ${departureYear}`; // Jun 14 2018 — Feb 5 2020
    } else {
      date = `${monthNames[arrivalMonth]} ${arrivalDay} - ${monthNames[departureMonth]} ${departureDay}`; // Dec 30 - Jan 15
    }
  }

  return date;
};

const queryAllRows = (db, query) => {
  return new Promise((resolve, reject) => {
    db.all(query, [], (error, rows) => {
      if (error) {
        reject(error);
      } else if (!(rows && rows.length)) {
        reject("Database didn't return data!");
      }

      resolve(rows);
    });
  });
};

const generateShareData = (data) => {
  return `<script>window.shareData = ${JSON.stringify(data)};</script>`;
};

module.exports = { dateToHRString, queryAllRows, generateShareData };
