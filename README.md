# Todo App with Drag and Drop Feature

## Features

- **Drag and Drop**: Intuitive drag and drop functionality for moving tasks between different categories.
- **CRUD Operations**: Users can create, read, update, delete and download tasks in PDF format.
- **Category Management**: Ability to create and manage categories to organize tasks effectively.
- **Responsive Design**: The application is designed to be responsive, providing a seamless experience across various devices.

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for designing responsive and custom UIs.
- **React DnD**: React wrapper for the HTML5 drag and drop API.

### Backend

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web application framework for Node.js, providing a robust set of features for web and mobile applications.
- **MongoDB**: NoSQL database for storing application data.
- **PDFkit**: User can download all tasks in PDF format.
## Installation

To run this application locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Abhishek-Bharti1/kryzen.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd kryzen
    ```

3. **Install dependencies for both frontend and backend:**

    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

4. **Set up MongoDB:**

    - Ensure you have MongoDB installed and running on your system.
    - Create a new MongoDB database for this application.

5. **Configure backend:**

    - Create a `.env` file in the `backend` directory.
    - Define the MongoDB connection URI and other necessary environment variables in the `.env` file.

6. **Start the backend server:**

    ```bash
    cd backend
    npm start
    ```

7. **Start the frontend server:**

    ```bash
    cd frontend
    npm run dev
    ```

8. **Open your browser to access the application.**

   ![image](https://github.com/Abhishek-Bharti1/kryzen-frontend/assets/97494868/7a43664d-9ac0-4141-82f1-3dd497c839bf)

