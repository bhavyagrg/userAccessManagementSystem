# User Management System

## 🚀 Introduction

The **User Management System** is a full-stack web application that streamlines user authentication and software access control within an organization.

### ✨ Key Features

- **User Registration** – Create new user accounts.
- **Secure Login & JWT Authentication** – Protect access using industry-standard JSON Web Tokens.
- **Software Access Requests** – Users can request access to available software.
- **Managerial Approvals** – Managers can approve or reject access requests.
- **Software Listing & Management** – View and manage available software options.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Frontend:** React  
- **Database:** PostgreSQL  
- **ORM:** TypeORM  
- **Authentication:** JWT (JSON Web Token)  
- **Tooling & Libraries:**  
  - `bcrypt` – For password hashing  
  - `dotenv` – For environment variable management  
  - `nodemon` – For auto-restarting the development server

# Setup Instructions
## 🧩 PostgreSQL Setup Instructions

Follow these steps to set up PostgreSQL for this project:

### 1. Install PostgreSQL

#### On Windows:
- Download the installer from the [official website](https://www.postgresql.org/download/windows/).
- Run the installer and follow the setup steps.
- Remember your **username**, **password**, and **port** (default is `5432`).

#### On macOS (using Homebrew):
```bash
brew install postgresql
brew services start postgresql
```

### 2. Create a New Database and User
Access the PostgreSQL shell:
```bash psql -U postgres ```
Then run:
```bash
CREATE DATABASE user_management;
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE user_management TO myuser;
```
### 3. Setup your credentials in codebase
In the file ```bash user-access-backend\src\config\data-source.ts``` change username, password, and database to your username, password and database.

## 🔐 Environment Variables Setup
Create a `.env` file in ```user-access-backend``` and add the following environment variables:
- JWT Secret Key
```JWT_SECRET_KEY=your_super_secret_key```

### Final Backend Setup
Run the following commands in ```user_access_backend```:
```
npm install
npm run dev
```
Backend setup is ready

## Frontend Setup Instructions
Run the following commands in ```user_access_frontend```:
```
npm install
npm run dev
```
Frontend setup is ready

# 📚 API Documentation

## 📌 Routes Overview

The application is organized into four main route files, each serving a specific purpose:

### 1. `healthRoutes.ts`
- **Purpose:** Health check endpoint to verify the server is running.
- **Example Endpoint:** `GET /api/health`

---

### 2. `authRoutes.ts`
- **Purpose:** Handles user authentication.
- **Endpoints:**
  - `POST /api/auth/signup` – Register a new user, with default role as Employee
  - `POST /api/auth/login` – Authenticate user and return JWT and role

---

### 3. `requestsRoutes.ts`
- **Purpose:** Manage software access requests.
- **Endpoints:**
  - `POST /api/requests` – Create a new request *(Employee only)*
  - `GET /api/requests/pending` – View all pending requests *(Manager only)*
  - `PUT /api/requests/:id` – Approve or reject a request *(Manager only)*

---

### 4. `softwareRoutes.ts`
- **Purpose:** Manage software entries.
- **Endpoints:**
  - `POST /api/software` – Create new software
  - `GET /api/software/list-softwares` – List all available software

---

> 🔐 **Note:** Role-based access control is enforced on the routes using middlewares (e.g., only managers can approve/reject requests).

## 🛡️ Middlewares Overview

The system uses several middlewares to ensure data integrity, authentication, and role-based access control.

### 1. `authValidator`
- **Purpose:** Validates user input during signup and login using **Zod**.
- **Checks:**
  - `username` and `password` must be present.
  - Ensures the input meets expected format and constraints.

---

### 2. `roleValidator`
- **Purpose:** Enforces **role-based access control**.
- **Example Use Case:**
  - Only users with the **Admin** role can create or list software.
  - If a user with insufficient privileges attempts access, a `401 Unauthorized` error is returned.

---

### 3. `authMiddleware`
- **Purpose:** Verifies that the user is authenticated.
- **Checks:**
  - Validates JWT token and decodes user information.
  - Confirms the user exists in the database.
  - Blocks access if the user is not registered or token is invalid.

---

> ✅ These middlewares help secure the application and ensure only valid, authorized actions are performed.

## 🧠 Controllers Overview

After passing through the middlewares and validations, requests are handled by their respective controllers. Each controller is responsible for coordinating logic by invoking the appropriate service functions and returning responses.

---

### 1. `authController`
Handles user authentication logic.

- `signup`: Handles new user registration.  
- `login`: Authenticates existing users.

Each method calls its respective service, and any errors during execution are properly caught and thrown.

---

### 2. `requestsController`
Manages software access request-related operations.

- `createRequest`:  
  - Accessible by **Employees**.  
  - Submits a new software access request.

- `getAllPendingRequests`:  
  - Accessible by **Managers**.  
  - Retrieves a list of all pending access requests.

- `updateRequestStatus`:  
  - Accessible by **Managers**.  
  - Approves or rejects a request based on the status update.

---

### 3. `softwareController`
Responsible for software management.

- `createSoftware`:  
  - Accessible by **Admins** only.  
  - Adds a new software entry to the system.

- `getAllSoftware`:  
  - Accessible by **Admins** only.  
  - Retrieves a list of all available software.

---

> ⚙️ Each controller is designed to be lean, delegating core business logic to dedicated service functions for maintainability and separation of concerns.

## 🧠 Services Overview

Service classes encapsulate the core business logic of the application. They interact with the database (via DAO functions) and handle processing, validation, and response preparation.

---

### 1. `authService`

Handles user registration and login logic.

- `signup`:  
  - Hashes the password using `bcrypt`.  
  - Calls `userDao` to save the user in the database.

- `login`:  
  - Fetches the user using `findUserByUsername` from `userDao`.  
  - If the user is not found, throws a **User Not Found** error.  
  - Compares passwords using `bcrypt.compare()`.  
  - Retrieves `JWT_SECRET_KEY` from environment variables.  
  - If the secret key is missing, throws an error.  
  - If everything is valid, generates a JWT token using `jwt.sign()` and returns the token along with the user's role.

---

### 2. `requestsService`

Manages logic related to software access requests.

- `createAccessRequest`: Submits a new access request (Employee role).
- `getAllPendingRequests`: Fetches all pending requests (Manager role).
- `updateRequestStatus`: Updates request status to approved/rejected (Manager role).

---

### 3. `softwareService`

Handles operations related to software records.

- `createSoftware`: Adds a new software entry (Admin role).
- `getAllSoftware`: Retrieves the list of all available software (Admin role).

---

> 🧩 Services promote modularity, making business logic reusable and testable across the application.

## 🗂️ DAO (Data Access Object) Overview

DAO modules abstract and encapsulate all interactions with the database. They provide clean interfaces for querying, inserting, updating, or deleting data, keeping database logic separate from business logic.

Each DAO function is typically used by a corresponding service class to perform operations such as fetching users, saving requests, or updating statuses.

---

### 1. `userDao`

Handles all database operations related to users.

- `saveUser(userData)`  
  Inserts a new user into the database using the provided data.

- `findUserByUsername(username)`  
  Fetches a user by their username. Used during login and to prevent duplicate registrations.

---

### 2. `requestsDao`

Handles operations related to access requests.

- `saveAccessRequest(requestData)`  
  Inserts a new access request into the database.

- `getAllPendingRequests()`  
  Retrieves all access requests with a status of `"PENDING"`.

- `updateRequestStatus(requestId, status)`  
  Updates the status of a specific request to either `"APPROVED"` or `"REJECTED"`.

---

### 3. `softwareDao`

Manages software-related database tasks.

- `saveSoftware(softwareData)`  
  Inserts a new software record into the database.

- `getAllSoftware()`  
  Retrieves all software entries from the database.

---

> 🧱 DAOs enforce a separation of concerns, enabling services to focus on business logic while keeping database operations consistent and maintainable.

