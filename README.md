# Social Network API

A dynamic Social Network API built with Express.js, MongoDB, and Mongoose ODM, designed to handle large amounts of unstructured data efficiently. This API enables users to share thoughts, react to friends' thoughts, and manage a friend list, showcasing the power and flexibility of a NoSQL database in a social networking context.

## Table of Contents

- [Demonstration Video](#demonstration-video)
- [Installation](#installation)
- [Usage](#usage)
- [Models](#models)
- [API Routes](#api-routes)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Demonstration Video

[Click here](https://app.screencastify.com/v3/watch/XxYZmGjoGJQE5BiBD9Jn) to watch the demonstration video showcasing the API functionality and how to use it.

## Installation

To get started, ensure you have MongoDB installed on your machine. Clone this repository and install the dependencies:

```bash
git clone https://github.com/DB-Doo/social-network.git
cd social-network
npm install
```

## Usage

To start the server, run the following command:

```bash
npm run start
```

This will start the API server, syncing the Mongoose models to the MongoDB database. You can then use a platform like Insomnia to test the API routes.

## Models

The API includes three main models:

- **User**: Handles user information, including username, email, thoughts, and friends.
- **Thought**: Manages thoughts shared by users, including the text, creation date, username, and reactions.
- **Reaction**: A subdocument schema in the Thought model for handling reactions to thoughts.

## API Routes

### Users

- `GET /api/users`: Fetch all users.
- `GET /api/users/:id`: Fetch a single user by ID.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:id`: Update a user by ID.
- `DELETE /api/users/:id`: Delete a user by ID.

### Friends

- `POST /api/users/:userId/friends/:friendId`: Add a friend.
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend.

### Thoughts

- `GET /api/thoughts`: Fetch all thoughts.
- `GET /api/thoughts/:id`: Fetch a single thought by ID.
- `POST /api/thoughts`: Create a new thought.
- `PUT /api/thoughts/:id`: Update a thought by ID.
- `DELETE /api/thoughts/:id`: Delete a thought by ID.

### Reactions

- `POST /api/thoughts/:thoughtId/reactions`: Add a reaction to a thought.
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction from a thought.

## Features

- Full CRUD operations for users and thoughts.
- Ability to add and remove friends.
- Ability to add and remove reactions to thoughts.

