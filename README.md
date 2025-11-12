 MERN Blog ApplicationProject Overview
 
 This is a full-stack blog application built using the MERN (MongoDB, Express, React, Node.js) stack. It provides complete user authentication and is structured to allow for scalable blog post and category management.The application uses an API-centric approach, with the frontend running on React (Vite) and the backend running on Express, connected to a MongoDB database.AspectTechnologyFrontendReact (Vite), React Router DOM, AxiosBackendNode.js, Express, express-async-handlerDatabaseMongoDB, MongooseAuthenticationJWT (JSON Web Tokens), bcryptjs for password hashingFeatures ImplementedThe current version includes a fully functional and debugged authentication system:
 🔐 User Authentication: Secure registration, login, and session management.
 👤 Registration: New users can create an account with unique usernames and emails. Passwords are securely hashed using bcryptjs.
 🔑 Login: Registered users can authenticate and receive a secure JWT for session persistence.🚪 Logout: Users can securely terminate their session, clearing the token from local storage.
 🧭 Protected Routing: The Navbar dynamically renders links based on the user's logged-in status.Setup InstructionsFollow these steps to get the application running locally on your machine.PrerequisitesNode.js (LTS version recommended)MongoDB instance (local or hosted via MongoDB Atlas)
 1. Clone the RepositoryBashgit clone <YOUR_REPOSITORY_URL>
cd mern-blog-application
2. Set up the Backend (Server)Navigate to the server directory and install dependencies:Bashcd server
npm install
Create .env File:Create a file named .env in the server directory and add your environment variables:Ini, TOML# server/.env

# Replace <your_cluster_uri> with your MongoDB connection string
MONGODB_URI = "mongodb+srv://<username>:<password>@<your_cluster_uri>/blogdb?retryWrites=true&w=majority"
PORT = 5000
JWT_SECRET = "your_secret_key_for_jwt_signing"
Start the Server:Bashnpm run dev
The server should start on port 5000.3. Set up the Frontend (Client)Open a new terminal tab/window, navigate to the client directory, and install dependencies:Bashcd ../client
npm install
Start the Client:Bashnpm run dev

The React application will start, typically on port 5173. The application is configured to communicate with the backend running on port 5000.API Documentation (Authentication)
The API endpoints are defined under the /api/auth base path.EndpointMethodDescriptionRequest BodySuccess Response/api/auth/registerPOST
Registers a new user and returns a JWT.{ username, email, password }{ _id, username, email, token } (Status 201)/api/auth/loginPOSTAuthenticates a user and returns a JWT.{ email, password }{ _id, username, email, token }

Registration page& login page <img width="1920" height="1080" alt="Screenshot 2025-11-12 121344" src="https://github.com/user-attachments/assets/f0433f7b-ded8-4e78-b65b-ef9324c57375" />

Logout&home page <img width="1920" height="1080" alt="Screenshot 2025-11-12 121618" src="https://github.com/user-attachments/assets/f0433f7b-ded8-4e78-b65b-ef9324c57375" />








































































































# MERN Stack Integration Assignment

This assignment focuses on building a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that demonstrates seamless integration between front-end and back-end components.

## Assignment Overview

You will build a blog application with the following features:
1. RESTful API with Express.js and MongoDB
2. React front-end with component architecture
3. Full CRUD functionality for blog posts
4. User authentication and authorization
5. Advanced features like image uploads and comments

## Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week4-Assignment.md` file
4. Complete the tasks outlined in the assignment

## Files Included

- `Week4-Assignment.md`: Detailed assignment instructions
- Starter code for both client and server:
  - Basic project structure
  - Configuration files
  - Sample models and components

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement all required API endpoints
3. Create the necessary React components and hooks
4. Document your API and setup process in the README.md
5. Include screenshots of your working application

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/) 
