const axios = require("axios");

async function getFlights(username) {
  const { data: html } = await axios.get(
    `https://my.flightradar24.com/${username}`
  );

  return ["points", "paths"].reduce((result, key) => {
    const regExp = new RegExp(`data-${key}="(.*?)"`, "g");
    const htmlObject = [...html.matchAll(regExp)][0][1];
    result[key] = JSON.parse(htmlObject.replace(/&quot;/g, '"'));
    return result;
  }, {});
}

module.exports = { getFlights };
