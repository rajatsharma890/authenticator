# Next.js Authentication System

A complete authentication system built with Next.js (App Router), MongoDB, and Nodemailer. This project provides a secure foundation for user management, including signup, login, email verification, and password reset functionality.

---

## Features

- **User Signup:** New users can create an account.
- **User Login:** Secure login using JWT (JSON Web Tokens) stored in HTTP-Only cookies.
- **User Logout:** Invalidate the user's session.
- **Email Verification:** New users receive a verification email to activate their account.
- **Forgot / Reset Password:** Users can request a password reset link via email and securely update their password.
- **Profile Page:** A protected route that displays the logged-in user's details.
- **Modern Tech Stack:** Built with the latest features of Next.js 14 and the App Router.
- **Styled with Tailwind CSS:** Comes with a clean, responsive UI.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication:** [JWT (JSON Web Token)](https://jwt.io/), [bcryptjs](https://www.npmjs.com/package/bcryptjs) for password hashing
- **Email:** [Nodemailer](https://nodemailer.com/) with [Mailtrap](https://mailtrap.io/) for development
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **API Testing:** [Axios](https://axios-http.com/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- MongoDB (local instance or a cloud service like MongoDB Atlas)
- A Mailtrap account for email testing

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the root of your project and add the following variables. See the `.env.example` section below for details.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Environment Variables

To run this project, you will need to create a `.env` file in the root directory and add the following environment variables.

```env:.env.example
# MongoDB Connection URI
MONGO_URI="your_mongodb_connection_string"

# JWT Secret Key (a long, random string)
TOKEN_SECRET="your_jwt_secret_key"

# The domain of your application for email links
DOMAIN="http://localhost:3000"

# Mailtrap Credentials for email testing
MAILTRAP_USER="your_mailtrap_username"
MAILTRAP_PASS="your_mailtrap_password"
```
