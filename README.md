# Fullstack Todo List

A simple To-Do List application that allows users to create, edit, delete, and mark tasks as completed. The application has both frontend and backend components.

## Frontend

### Local Development

1. Navigate to the `frontend` folder.
2. Install dependencies using `npm install`.
3. Start the development server with `npm run dev`.
4. Open your browser and go to [http://localhost:5173/](http://localhost:5173/) to view the application.

#### Dependencies

- React: ^18.2.0
- React DOM: ^18.2.0
- @types/react: ^18.2.66
- @types/react-dom: ^18.2.22
- @vitejs/plugin-react: ^4.2.1
- Autoprefixer: ^10.4.19
- ESLint: ^8.57.0
- ESLint Plugin React: ^7.34.1
- ESLint Plugin React Hooks: ^4.6.0
- ESLint Plugin React Refresh: ^0.4.6
- PostCSS: ^8.4.38
- Tailwind CSS: ^3.4.3
- Vite: ^5.2.0

## Backend

### Local Development

1. Navigate to the `backend` folder.
2. Install dependencies using `npm install`.
3. Run `node seed.js` to populate the database (optional).
4. Start the server with `node server.js`.
5. The server will run at [http://localhost:3000](http://localhost:3000).

#### Dependencies

- Cors: ^2.8.5
- Express: ^4.19.2
- SQLite3: ^5.1.7

#### Database Seeding

To populate the database with initial data, run `node seed.js` in the `backend` folder.
