# Pokemon-Themed Card Matching Game

This is a Pokemon-themed card matching game where users can test their memory by matching pairs of Pokemon cards. The game includes user authentication, score tracking, and a leaderboard.

## Live Demo

You can check out the live version of the app [here](https://card-matching-game-psi.vercel.app/).

## Features

- **Card Matching Game**: Flip cards to match pairs, and complete the game in the fewest moves possible.
- **User Authentication**: Secure login and registration using JWT-based authentication.
- **Score Tracking**: The user's best score is tracked and displayed. Past game scores are saved for review.
- **Leaderboard**: A leaderboard shows the top players based on their best scores.
- **Responsive Design**: The app is fully responsive, with a clean, user-friendly interface.

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Recoil**: State management for handling global states like authentication.
- **Axios**: For making API requests to the backend.
- **React Router Dom**: For routing between different pages of the app.
- **React Toastify**: For showing success and error notifications.

### Backend

- **Node.js & Express**: Server-side JavaScript for handling API requests and authentication.
- **MongoDB**: NoSQL database for storing user information, scores, and game data.
- **JWT (JSON Web Token)**: Secure authentication for user login and session management.
- **Mongoose**: MongoDB object modeling for Node.js.
- **bcrypt.js**: For hashing user passwords before storing them in the database.

### Hosting

- **Frontend**: Deployed on Vercel.
- **Backend**: Deployed on Render.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your local machine.
- **MongoDB**: You’ll need a MongoDB database for storing user data and scores.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/card-matching-game.git
    ```

2. Navigate to the project folder:

    ```bash
    cd card-matching-game
    ```

3. Install dependencies for the frontend:

    ```bash
    cd Frontend
    npm install
    ```

4. Install dependencies for the backend:

    ```bash
    cd Backend
    npm install
    ```

### Running the App

#### Frontend

1. Start the frontend:

    ```bash
    cd Frontend
    npm run dev
    ```
2. Create a `.env` file in the Frontend directory and add your environment variable (see example.env file) 
    ```makefile
    VITE_BASE_URL=http://localhost:3000
    ```

   The frontend will be running on [http://localhost:5173
   ](http://localhost:5173).

#### Backend

1. Create a `config.env` file in the Backend/config directory and add your environment variables (see example.config.env):

    ```makefile
    MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret
    ```

2. Run the backend:

    ```bash
    cd backend
    npm run dev
    ```

   The backend will be running on [http://localhost:3000](http://localhost:3000).

## API Endpoints

- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Login a user.
- **GET /api/users/logout**: Login a user.
- **GET /api/users/me**: Get the user details.
- **POST /api/users/update-score**: Update the user's score after the game.
- **GET /api/users/scores**: Get the user's past scores.
- **GET /api/users/leaderboard**: Get the top players based on their best scores.

## Test Login Credentials
- **Email**: root@gmail.com
- **Password**: admin