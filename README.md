# Interview Scheduler

The Interview Scheduler is a simple single paged React app providing the ability to effortlessly schedule appointments between students and interviewers.

The Interview Scheduler uses React for the frontend and express on the backend. Additionally a suite of testing was built for this project to implement a deeper understanding of Jest and to begin working with the end-to-end testing framework, Cypress.

## Setup

Install dependencies with `npm install`.

## Running Express Backend API
Fork and clone the [scheduler-api](https://github.com/rengebre/scheduler-api). Follow the README to setup the database and get the express server running.

## Running Webpack Development Server
```sh
npm start
```

## Running Test Frameworks

  ### Jest
  Run the following command inside the root scheduler directory:
  ```sh
  npm test
  ```
  ### Cypress
  Run the following command inside the `scheduler-api` root directory to start the server in test mode:
  ```sh
  npm run test:server
  ```
  With the backend running in test mode, run the following command in the `scheduler` root directory:
  ```sh
  npm run cypress
  ```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Core Functionality
- Ability to switch between calendar days from Monday to Friday
- Ability to select a day, and then book an interview in an empty slot
- Ability to edit or cancel interviews
