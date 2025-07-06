# Finance Calculator

A finance calculator application built with Express and TypeScript.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL database

## Installation

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd finance-calculator
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install

# or

yarn install
\`\`\`

3. Create a .env file in the root directory and add your environment variables:
   \`\`\`

   # Server Configuration

   PORT=3000
   NODE_ENV=development

   # Database Configuration

   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=finance_calculator
   DB_PORT=3306
   \`\`\`

4. Set up the MySQL database:
   - Create a database named `finance_calculator`
   - Run the SQL script from `db.sql` to create the required tables

## Development

To start the development server:

\`\`\`bash
npm run dev

# or

yarn dev
\`\`\`

The server will start at http://localhost:3000.

## Build

To build the project:

\`\`\`bash
npm run build

# or

yarn build
\`\`\`

## Production

To start the production server:

\`\`\`bash
npm start

# or

yarn start
\`\`\`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/users` - Get all users (admin only)

#### Example Usage:

**Register User:**

```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123",
  "email": "john@example.com"
}
```

**Login User:**

```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

### Plan Management

- `POST /api/plan/data` - Create or update plan data (upsert based on user_id)
- `GET /api/plan/data?user_id=<id>` - Get plan data by user ID

## Project Structure

```
finance-calculator/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   └── plan.controller.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   └── plan.routes.ts
│   └── services/
│       └── plan.service.ts
├── dist/
├── .env
├── .eslintrc
├── .gitignore
├── db.sql
├── package.json
├── tsconfig.json
└── README.md
```
