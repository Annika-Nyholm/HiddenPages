# About Hidden Pages

Hidden Pages is designed to provide a seamless and engaging experience for book lovers. When users visit the app, they are greeted with a warm and inviting homepage that introduces the concept of discovering personalized book recommendations through a fun quiz.

By taking the quiz, users can share their preferences, enabling the app to suggest a curated list of books tailored to their interests. The recommendations are presented in an interactive, scrollable layout, where each book card provides a snapshot of the title, author, and key details.

If a user finds a book intriguing, they can click on the card to navigate to the book’s detail page. This page offers an in-depth view of the book, including its genre, average ratings, and a description. For users who want to share their discoveries, the app supports deep linking—sending a book detail link to a friend will open the same book for them to view directly.

To ensure a smooth experience, users accessing a shared link without prior navigation in the app are redirected to the homepage when they use the back button. This allows new visitors to explore Hidden Pages and enjoy the quiz for their personalized recommendations.

With its clean design, mobile responsiveness, and intuitive navigation, Hidden Pages makes discovering books a delightful journey for every user.

## Live Demo

Check out the live version of Hidden Pages: [Hidden Pages App](https://salmon-cliff-059181903.4.azurestaticapps.net/)

## Screen Shots

![Home Page](client/public/HiddenPages_screengrab_home.png)

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
