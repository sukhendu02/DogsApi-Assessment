# Dogs API

A full-stack web application for managing a list of dog breeds and sub-breeds — built as a CRUD interface exposed over HTTP, with persistent storage.

The client's original dataset (`dogs.json`) is used as seed data, imported into a relational Postgres database. Users can create, read, update, and delete both breeds and sub-breeds through either a web-based GUI.

---

## Live Links

| | URL |
|---|---|
| **Live App** | `https://dogs-api-assessment.vercel.app/` |
| **Live API** | `https://dogsapi-assessment.onrender.com` 
| **GitHub Repo** | `https://github.com/sukhendu02/DogsApi-Assessment` |

---

## Tech Stack

**Backend**
- Node.js (ESM) + Express
- Sequelize (ORM)
- PostgreSQL

**Frontend**
- React + Vite
- Axios (API calls with optimistic UI updates)

**Hosting** 
- Database: Supabase 
- Backend: Render
- Frontend: Vercel

---

## Architecture

### Data Model

The original `dogs.json` structure (`breed -> [subBreeds]`) is normalized into two related Postgres tables:

```
Breed
 ├── id (PK)
 └── name (unique, not null)

SubBreed
 ├── id (PK)
 ├── name (not null)
 └── breedId (FK -> Breed.id, ON DELETE CASCADE)
```

**Why relational instead of a single JSON blob:** the breed → sub-breed relationship is a natural one-to-many. Modeling it as two tables allows independent CRUD on sub-breeds (add/rename/delete a single sub-breed without rewriting the whole breed record), enforces uniqueness at the database level, and cascades deletes automatically when a parent breed is removed.

### Project Structure

```
dogs-api/
├── server/                    # Backend (Express + Sequelize)
│   ├── src/
|   │   ├── config/
|   │   │   └── database.js        # Sequelize connection 
|   │   ├── middleware/
|   │   │   └── ErrorHandler.js        # Global Error Handler
|   │   ├── models/
|   │   │   ├── Breed.js
|   │   │   ├── SubBreed.js
|   │   │   └── index.js           # Associations + sync
|   │   │ 
|   │   ├── modules/
|   │   │   ├── breed/
|   │   │   |   ├── controller
|   │   │   |   ├── route
|   │   │   |   └── service  
|   │   │   |   
|   │   │   ├── subBreed/
|   │   │       ├── controller
|   │   │       ├── route
|   │   │       └── service  
│   │  
│   ├── test/
|   |   └── DogsApi.postman.json            # Postman test json
│   ├── seed.js                # One-time script to load dogs.json into DB
│   ├── dogs.json               # Original client dataset (seed source)
│   ├── app.js                 # Express app + middleware + routes
│   ├── server.js              # Entry point (connects DB, starts server)
│   ├── .env.example
│   └── package.json
│
└── client/                    # Frontend (React + Vite)
    ├── src/
    │   ├── App.jsx
    │   ├── api.js              # All API calls (axios)
    │   └── main.jsx
    ├── Components/             # List of all components
    |   
    ├── .env.example
    └── package.json
```


### Features

- CRUD for Breeds
- CRUD for Sub-breeds
- Search breeds
- Persistent PostgreSQL storage
- Responsive UI

### Validation

- Breed names cannot be empty.
- Breed names are case-insensitively unique.
- Sub-breed names cannot be empty.
- Different Breed can have same name of the sub-breeds.
- Every Breed will have unique name of sub-breeds.
- Invalid requests return appropriate HTTP status codes.

---

## API Endpoints

### Base URL = "http://domain.com/api/v1"

| Method | Endpoint | Description |
|---|---|---|
| GET | `/breed` | List all breeds with their sub-breeds |
| GET | `/breed/:id` | Get a single breed |
| POST | `/breed` | Create a breed — body: `{ "name": "string" }` |
| PATCH | `/breed/:id` | Update a breed — body: `{ "name": "string" }` |
| DELETE | `/breed/:id` | Delete a breed (cascades to its sub-breeds) |
| GET | `/breed/:breedId/subbreed` | List sub-breeds for a breed |
| POST | `/breed/:breedId/subbreed` | Create a sub-breed — body: `{ "name": "string" }` |
| GET | `/subbreed/:id` | Get a single sub-breed |
| PATCH | `/subbreed/:id` | Update a sub-breed — body: `{ "name": "string" }` |
| DELETE | `/subbreed/:id` | Delete a sub-breed |
| GET | `/breed?search="<Breed Name>` | Search a breed |

<!-- Full interactive documentation (with a "Try it out" tester for every endpoint) is available at `/docs` once the server is running — see [Swagger Docs](#swagger-docs) below. -->

---

## Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/download/) installed and running locally
- npm

### 1. Clone the repo

```bash
git clone https://github.com/sukhendu02/DogsApi-Assessment.git
cd dogs-api
```

### 2. Create the local database

Using `psql`:

```bash
psql postgres
```
```sql
CREATE DATABASE dogs_api;
\q
```

Or use a GUI tool (pgAdmin, DBeaver, TablePlus) — create a database named `dogs_api`.

### 3. Backend setup

```bash
cd server
npm install
```

Create a `.env` file in `server/` (copy from `.env.example`):

```
DATABASE_URL=postgres://<username>:<password>@127.0.0.1:5432/dogs_api
PORT=3000
NODE_ENV=development
```

Seed the database with the original dog breed data:

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
```

The API will be running at `http://localhost:3000`.

### 4. Frontend setup

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file in `client/` (copy from `.env.example`):

```
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

The app will be running at `http://localhost:5173` (Vite's default port).

### 5. Verify everything works

- Open `http://localhost:5173` — you should see the list of dog breeds
<!-- - Open `http://localhost:8000/docs` — you should see the interactive Swagger API documentation -->
- Try creating, editing, and deleting a breed or sub-breed from the UI
- **Persistence check:** create/delete something, stop the backend (`Ctrl+C`), restart it (`npm run dev`), refresh the frontend — your change should still be there

---
<!-- 
## Swagger Docs

Interactive API documentation is available at:

```
http://localhost:8000/docs   (local)
<DEPLOYED_URL>/docs           (production)
```

This lets you view every endpoint's expected request/response shape and execute real requests directly from the browser — useful for testing the API independently of the frontend.

--- -->

## Resetting / Re-seeding the Database

To wipe all data and reload the original `dogs.json` dataset:

```bash
cd server
npm run seed
```

**Warning:** this drops and recreates all tables. Use only in development.

---

## Available Scripts

**Backend (`/server`)**

| Command | Description |
|---|---|
| `npm run dev` | Start the backend with auto-reload (nodemon) |
| `npm run seed` | Reset DB and load `dogs.json` seed data |
| `npm start` | Start the backend in production mode |

**Frontend (`/client`)**

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |

---

## Design Decisions & Notes

- **Postgres over SQLite:** free hosting platforms typically use ephemeral filesystems that get wiped on restart/redeploy. A SQLite file living inside the app's own container would risk silently failing the persistence requirement. A separately-hosted Postgres instance persists independently of the app's lifecycle.
- **Optimistic UI updates:** the frontend updates the UI immediately on create/update/delete actions, then rolls back if the API call fails — this keeps the interface feeling fast while still reflecting real server state accurately.
- **Cascade deletes:** deleting a breed automatically deletes its associated sub-breeds at the database level (`ON DELETE CASCADE`), keeping the two tables consistent without extra application logic.





<!-- ## Reflection

*(Add your own notes here before submission — e.g. what you'd do differently with more time, what you learned, any tradeoffs you're not fully happy with.)* -->

---

## Author

*(Sukhendu Mandal)*