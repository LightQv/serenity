## Introduction

We present to you our project carried out at the Wild Code School in Lyon by Jawad, Lilian, Vivian and Aurélie. We developed a dynamic application with front and back end for our latest project during our training at the Wild Code School,Lyon in July 2023.


## Concept

This app aims to support patients prior to their surgery using protocols and checklists that they can consult on a dedicated interface. This allows the patient to see the date of his intervention, the various protocols attached to him, and to send a pm notification to the secretariat if he wishes to be contacted. A second interface allows the secretariat to see, add, modify, delete patients, surgeons, interventions, operations, and protocols.

## Setup

- Clone this repo, enter it
- If you are using `yarn` or `pnpm`, adapt the `config/cli` in `package.json`
- Run command `npm install`
- Run command `npm run migrate`
- _NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in `backend/.env.sample`_

## Configuration

Create `.env` files in /frontend and /backend following `.env.sample` examples.

## Use
- Run frontend and backend server together : `npm run dev`
- Express and Socket back servers will be accessible at the address set in the .env of the frontend
- React frontend will be accessible at the address set in the .env of the backend

- 👉  To try Admin Role, you can log with : marine.dutronc@gmail.com || serenity 👈
- 👉  To try Patient Role, you can log with : marianne55@gmail.com || serenity 👈

### Available Commands

- `migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)
- `fix` : Fixes linter errors (run it if `lint` growls on your code !)


### Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS
- _Nodemon_ : Allows to restart the server everytime a .js file is udated

