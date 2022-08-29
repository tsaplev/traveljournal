function getCurrentLanguage() {
  return window.location.hostname.includes("ru") ? "ru" : "en";
}

const getSwitcherOptions = (lang) => {
  switch (lang) {
    case "ru":
      return {
        title: "Show in English",
        icon: "🇬🇧",
        nextHostname: "tsaplev.me",
        nextLang: "en",
      };
    case "en":
      return {
        title: "Показать на русском",
        icon: "🇷🇺",
        nextHostname: "tsaplev.ru",
        nextLang: "ru",
      };
  }
};

module.exports = {
  getCurrentLanguage,
  getSwitcherOptions,
};
