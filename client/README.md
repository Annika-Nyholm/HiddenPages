## Technologies Used

-   **React** - A JavaScript library for building user interfaces.
-   **TypeScript** - A statically typed superset of JavaScript that provides type safety.
-   **Vite** - A next-generation build tool for faster and optimized development.
-   **SCSS** - A CSS preprocessor to enhance the styling.
-   **React Router** - For handling routing and navigation between pages.
-   **DOMPurify** - For sanitizing HTML content.
-   **Azure Static Web Apps** - For hosting the app.

## Features

-   **Book Recommendations**: Explore up to 10 of book recommendations based on your preferencences.
-   **Quiz**: Take fun and interactive quiz to discover books that match your interests.
-   **Book Details**: View detailed information about each book, including ratings, descriptions, and more.
-   **Responsive Design**: Fully responsive layout that works seamlessly across all devices.
-   **404 Page**: Custom 404 error page to guide users when they land on a non-existing page.
-   **Clean and Modern UI**: A simple, user-friendly design for easy navigation.

## Installation and Usage

### Prerequisites

To run the project locally, make sure you have the following installed:

-   **Node.js** (version 16 or higher)
-   **npm** (Node package manager, comes with Node.js)

### Steps to Set Up Locally

1. **Clone the repository:**

  ```bash
  git clone <repository-url>
  ```

2. **Navigate to the project folder:**

  ```bash
  cd <project-folder>
  ```

3. **Install dependencies:**

  ```bash
  npm install
  ```

4. **Start the development server:**

  ```bash
  npm run dev
  This will start the project on http://localhost:3000 by default.
  ```

5. **Build for Production: To create an optimized build for production, run:**

  ```bash
  npm run build
  ```

6. **Preview the Build Locally: To preview the build, run:**

  ```bash
  npx serve dist
  ```

## Deployment

This project is deployed on **Azure Static Web Apps**.

### Deployment Process

- The project is connected to **GitHub**, and every commit triggers an automatic build and deployment.
- The **build** script generates the optimized production files, which are served from the `dist` folder.
- The `index.html` file in the `dist` folder is used to serve all routes, ensuring that **React Router** handles client-side navigation correctly.
