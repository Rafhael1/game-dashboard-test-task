# Game Dashboard

![App Screenshot](https://i.imgur.com/z4S7Jn9.png)

This the dashboard for the test assignment.

## How to run

### Prerequisites
Node.js version 18.14.2 (lts as of 20-04-2023)

1. Clone the repository

2. Install dependencies

```bash
  // For the front end
  cd client
  npm install
```

```bash
  // For the back end
  cd server
  npm install
```

3. Run the server

```bash
  cd server
  npm run start:dev
```

4. Run the client

```bash
  cd client
  npm run dev
```

## Tech Stack

**Client:** React, TailwindCSS

**Server:** Nestjs, SQLite

## Features
Filtering by game category ( on the game page ).

Filtering by customer/game creation date.

## Points to improve 
Since time wasn't on my side, I had to make some compromises.

- [] Since it's a test for a frontend role I didn't implement the filter on the backend, which would have been easier.

- [ ] Error messages are generic, they should be more detailed and also come from the api.
- [ ] Form validation is not implemented and could be on either frontend or backend (if on backend it would possibly solve the generic messages issue).

## Observations

Context and request code might no be the cleanest, I mostly work with
redux and so I'm not used to the context way of doing things.

The server is running on port 8080, and
the client is running on port 3000.

## Author
Rafhael Marques de Lima Freitas