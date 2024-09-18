

# PDFSlycer Backend

Welcome to the **PDFSlycer Backend**, a crucial component of the PDFSlycer MERN stack application. This backend service handles PDF processing, user management, and API interactions.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Setting Up Locally](#setting-up-locally)
- [Live Demo](#live-demo)
- [License](#license)

## Project Overview

The PDFSlycer backend provides APIs for slicing, selecting, and creating new PDFs, user authentication, and other necessary functionalities for the front-end application. It is built with Node.js and Express.

## Technologies Used

- **Node.js** for server-side JavaScript.
- **Express.js** for building RESTful APIs.
- **MongoDB** for database management.
- **Mongoose** for MongoDB object modeling.
- **CORS** for handling cross-origin requests.
- **PDFKit and PDFlib** for manage pdf.

## Getting Started

To get the backend up and running locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:
- Node.js (version 14.x or higher)
- npm (Node package manager)

### Setting Up Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/muhammedshereefn/PDFSlycer-Backend.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd PDFSlycer-Backend
   ```

3. **Install dependencies**

   Use npm to install all required dependencies.

   ```bash
   npm install
   ```


4. **Start the server**

   To run the server locally:

   ```bash
   npm start
   ```

   The backend server will be available at `http://localhost:5000`.

### CORS Configuration

To allow requests from your front-end application, ensure that CORS is correctly set up in your server code. You may need to update the `FRONTEND_URL` in your `.env` file to match the URL of your front-end application.

## Live Demo

You can access the live version of the PDFSlycer backend here:

[PDFSlycer Backend Live](https://pdfslycer-backend.onrender.com/)

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

