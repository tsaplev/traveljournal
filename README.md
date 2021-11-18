# Travel Journal — keep all your travel memories

[![GitHub Actions](https://github.com/tsaplev/TravelJournal/workflows/CI/badge.svg)](https://github.com/tsaplev/TravelJournal/actions)

> App for tracking visited cities and flights

![TravelJournal](./preview.jpg)

## Features

- View visited cities on map
- View flight paths on map
- View list of travels sorted by countries and years
- Switch between Cities Map and Flights Map
- Keep all your data self-hosted

## Demo Mode

Demo of latest version is available at [https://tsaplev.github.io/TravelJournal](https://tsaplev.github.io/TravelJournal).

You can also try app locally without making any effort.

1. Create build.

   ```sh
   yarn build:demo
   ```

2. Open `dist/index.html` in browser.

## Getting Started

### Fill Database With Personal Travels

> **NOTE**: _You are required to have basic understanding of relational databases._

Use any software you like to fill in SQLite database [db.sqlite3](./db.sqlite3) with the following table sequence: `continent`, `country`, `city`, `trip`.

![TravelJournal](./dbschema.png)

### Complete Flightradar Profile

App uses [my.flightradar24.com](https://my.flightradar24.com) as the main source for flights data so sign up and complete your profile if you don't have one.

### Set Up Configuration File

Update [config.js](src/view/config.js) with your own credentials.

| Key                 | Description                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------- |
| siteTitle           | The title that appears in browser tab                                                         |
| title               | Write your name there                                                                         |
| googleMapApiKey     | [Google Map API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) |
| flightradarUsername | Username on [my.flightradar24.com ](https://my.flightradar24.com/)                            |

### Install Dependencies

```sh
yarn install
```

### Build App

```sh
yarn build
```

### Usage

Open `index.html` in `dist` folder after build is done.

## Technologies

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) is the main development language.
- [Node.js](https://nodejs.org/en/) is for running scripts.
- [SQLite](https://www.sqlite.org/index.html) is for storing data.
- [Webpack](http://webpack.js.org) is for bundling frontend code.
- [Yarn](https://yarnpkg.com) is for dependency management.
- [ESLint](https://eslint.org) is for checking code style.
- [Jest](https://jestjs.io) is for testing.

## License

[MIT](./LICENSE)
