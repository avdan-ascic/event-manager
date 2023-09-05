## Project Name

Event Manager

## Introduction

The Event Manager Applicatio is an online event menagement system that streamlines the proces of planning an event and registering attendees to the event.

## Features

- Registration page
- Login page
- Dashboard page with the listing of all events and option to filter the events.
- The system allows all users to create their own events.
- The system allows all users to request registration on the events, so that they can attend chosen events.
- The system allows all users to accept or reject received registration requests.

## Buit With

JavaScript
ReactJS
NodeJS
Express JS
Mongo DB

## Setup

Clone this repository. You will need node and npm installed globally on your machine. If you want to run database locally make sure that you have mongoDB server installed and running in background. You can also run cloud database using mongoDB Compas. Create a clutser and paste your connection string in dotenv file.

## Environment Variables

Create a .env file in the root directory of your server route. This file will contain sensitive configuration information needed for your application to function properly.

- PORT: The port number on which the server will listen for incoming requests.
- JWT_SECRET: A secret key used for signing and verifying JWT tokens for authentication.
- MONGO: The connection URL for your MongoDB database.
- SESSION_SECRET: An optional secret key used for session management.

## To get a local copy up and running, follow these simple steps:

Clone the repo git clone https://github.com/your_username/event-manager.git
Install NPM packages npm install Start the project npm start
