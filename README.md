# TaskFlow MERN

<p align="center">
  <strong>A polished MERN task tracker for managing work, priorities, deadlines, and productivity from a modern SaaS dashboard.</strong>
</p>

<p align="center">
  <a href="https://github.com/Arbab-ofc/Taskflow-mern">
    <img alt="GitHub repo" src="https://img.shields.io/badge/GitHub-Taskflow--mern-181717?style=for-the-badge&logo=github" />
  </a>
  <img alt="MERN Stack" src="https://img.shields.io/badge/Stack-MERN-22c55e?style=for-the-badge" />
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=111827" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

<p align="center">
  <a href="#features">Features</a>
  ·
  <a href="#tech-stack">Tech Stack</a>
  ·
  <a href="#local-setup">Local Setup</a>
  ·
  <a href="#api-endpoint">API Endpoint</a>
  ·
  <a href="#api-reference">API Reference</a>
  ·
  <a href="#deployment">Deployment</a>
  ·
  <a href="#contact">Contact</a>
</p>

---

## Overview

TaskFlow is a full-stack MERN application built as a production-ready task management dashboard. It includes authentication, user-scoped task data, CRUD workflows, soft delete and restore, filtering, sorting, stats, responsive UI, dark mode, and deployment-ready configuration.

The app is designed to feel like a real SaaS workspace rather than a tutorial project. The frontend uses reusable React components and a clean dashboard layout, while the backend follows a structured API design with validation, service-layer logic, centralized errors, and consistent responses.

## Features

### Product Features

- Secure signup and login with JWT authentication
- User-scoped task data
- Create, read, update, and soft-delete tasks
- Restore deleted tasks from Trash
- Task details page with timestamps and activity history
- Dashboard stats for total, pending, in-progress, completed, and high-priority tasks
- Search tasks by title or description
- Filter by status and priority
- Sort by newest, oldest, due date, and priority
- Grid and dense table task views
- Pagination for active and deleted tasks
- Responsive SaaS-style layout
- Dark mode with localStorage persistence
- Toast notifications for success and error states
- Loading states, empty states, confirmation modal, and inline validation

### Engineering Features

- REST API with clean resource-based endpoints
- MongoDB integration through Mongoose
- Request validation using Zod
- Password hashing with bcryptjs
- JWT-based route protection
- Centralized error middleware
- Async handler utility
- Service layer for task business logic
- Soft delete using `deletedAt`
- Health check endpoint
- Structured logging with Pino
- Axios API client with auth token injection
- Lazy-loaded frontend routes
- Docker setup for full-stack local deployment
- Backend test structure for auth, tasks, validation, stats, soft delete, and health checks

## Tech Stack

### Frontend

| Technology | Purpose |
| --- | --- |
| React.js | Component-based UI |
| Vite | Frontend build tooling |
| React Router DOM | Client-side routing |
| Axios | API communication |
| Tailwind CSS | Utility-first styling |
| Lucide React | Icons |
| react-hot-toast | Toast notifications |

### Backend

| Technology | Purpose |
| --- | --- |
| Node.js | Runtime |
| Express.js | REST API server |
| MongoDB | Database |
| Mongoose | ODM and schema modeling |
| Zod | Request validation |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| CORS | Frontend/backend access control |
| dotenv | Environment configuration |
| Pino | Structured logging |

### DevOps

| Tool | Purpose |
| --- | --- |
| Docker | Containerized local deployment |
| Docker Compose | Full-stack orchestration |
| Vercel / Netlify | Frontend deployment |
| Render / Railway | Backend deployment |
| MongoDB Atlas | Production database |

## Project Structure

```text
taskflow-mern/
  backend/
    src/
      config/
        db.js
      controllers/
        authController.js
        healthController.js
        taskController.js
      logger/
        logger.js
      middleware/
        authMiddleware.js
        errorMiddleware.js
        notFoundMiddleware.js
        requestLogger.js
        validateMiddleware.js
      models/
        Task.js
        User.js
      routes/
        authRoutes.js
        taskRoutes.js
      services/
        taskService.js
      utils/
        AppError.js
        asyncHandler.js
        jwt.js
        responses.js
      validators/
        authValidators.js
        taskValidators.js
      server.js
    tests/
    Dockerfile
    package.json
    .env.example

  frontend/
    src/
      api/
        authApi.js
        axios.js
        taskApi.js
      components/
        auth/
        layout/
        task/
        ui/
      context/
        AuthContext.jsx
      hooks/
      pages/
      utils/
      App.jsx
      main.jsx
      index.css
    Dockerfile
    nginx.conf
    package.json
    .env.example

  docker-compose.yml
  README.md
  .gitignore
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Arbab-ofc/Taskflow-mern.git
cd Taskflow-mern
```

### 2. Configure backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### 3. Configure frontend

Open a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Environment Variables

### Backend

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_super_secret_jwt_key
LOG_LEVEL=debug
```

### Frontend

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## API Endpoint

TaskFlow uses one backend API base endpoint for all frontend requests. The frontend reads this value from `VITE_API_BASE_URL`, so local and production deployments can point to different backend hosts without changing source code.

| Environment | Endpoint |
| --- | --- |
| Local backend server | `http://localhost:5000` |
| Local API base URL | `http://localhost:5000/api` |
| Local health check | `http://localhost:5000/health` |
| Production API base URL | `https://your-backend-url.com/api` |

For local development, keep this in `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## API Reference

Base URL:

```text
http://localhost:5000/api
```

### Authentication

| Method | Endpoint | Protected | Description |
| --- | --- | --- | --- |
| POST | `/auth/signup` | No | Register a new user |
| POST | `/auth/login` | No | Login and receive a JWT |
| GET | `/auth/me` | Yes | Get current authenticated user |

### Tasks

| Method | Endpoint | Protected | Description |
| --- | --- | --- | --- |
| GET | `/tasks` | Yes | Get paginated active tasks |
| GET | `/tasks/stats` | Yes | Get dashboard task stats |
| GET | `/tasks/trash` | Yes | Get soft-deleted tasks |
| GET | `/tasks/:id` | Yes | Get a single task |
| POST | `/tasks` | Yes | Create a task |
| PUT | `/tasks/:id` | Yes | Update a task |
| DELETE | `/tasks/:id` | Yes | Soft-delete a task |
| POST | `/tasks/:id/restore` | Yes | Restore a soft-deleted task |

### Task Query Parameters

| Parameter | Values | Description |
| --- | --- | --- |
| `search` | string | Search by title or description |
| `status` | `pending`, `in-progress`, `completed` | Filter by status |
| `priority` | `low`, `medium`, `high` | Filter by priority |
| `sort` | `newest`, `oldest`, `dueDate`, `priority` | Sort task list |
| `page` | number | Current page |
| `limit` | number | Items per page, capped at 50 |

### Health

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/health` | API health, uptime, environment, and MongoDB status |

## API Response Format

Success response:

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {}
}
```

Error response:

```json
{
  "success": false,
  "message": "Error message here"
}
```

## Scripts

### Backend

```bash
npm run dev
npm start
npm test
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

## Docker

Run the complete stack locally:

```bash
docker compose up --build
```

Services:

| Service | URL |
| --- | --- |
| Frontend | `http://localhost:5173` |
| Backend | `http://localhost:5000` |
| MongoDB | `mongodb://localhost:27017/taskflow` |

Stop containers:

```bash
docker compose down
```

Remove containers and MongoDB volume:

```bash
docker compose down -v
```

## Testing

Run backend tests:

```bash
cd backend
npm test
```

The test suite covers:

- Authentication routes
- Task CRUD routes
- Validation errors
- Not-found handling
- Query, filtering, sorting, and pagination
- Status history
- Soft delete and restore
- Stats endpoint
- Health endpoint

Build frontend:

```bash
cd frontend
npm run build
```

## Deployment

### Frontend Deployment

Deploy the `frontend` folder to Vercel or Netlify.

Build settings:

```text
Root directory: frontend
Build command: npm run build
Output directory: dist
```

Environment:

```env
VITE_API_BASE_URL=https://your-backend-url.com/api
```

For Vercel, the project includes `frontend/vercel.json` with a single-page app rewrite. This keeps React Router routes working when users refresh or open pages like `/login`, `/signup`, `/tasks/:id`, or `/tasks/:id/edit` directly.

### Backend Deployment

Deploy the `backend` folder to Render, Railway, Cyclic, or another Node hosting platform.

Start command:

```bash
npm start
```

Environment:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.com
JWT_SECRET=your_super_secret_jwt_key
LOG_LEVEL=info
```

Set `CLIENT_URL` to the exact deployed frontend origin so CORS allows production requests.

## Roadmap

- User profile settings
- Task labels and assignees
- Due-date reminders
- Calendar view
- Drag-and-drop task board
- Export tasks to CSV
- Team workspaces

## Repository

```text
https://github.com/Arbab-ofc/Taskflow-mern.git
```

## Contact

For questions, collaboration, or project inquiries:

| Platform | Link |
| --- | --- |
| Email | [arbabprvt@gmail.com](mailto:arbabprvt@gmail.com) |
| GitHub | [github.com/Arbab-ofc](https://github.com/Arbab-ofc) |
| Portfolio | [arbabofc.me](https://www.arbabofc.me/) |
| LinkedIn | [linkedin.com/in/arbab-ofc](https://www.linkedin.com/in/arbab-ofc) |

## Author

Built by [Arbab](https://www.arbabofc.me/).

---

<p align="center">
  <strong>TaskFlow</strong> · Organize tasks, track progress, and stay productive.
</p>
