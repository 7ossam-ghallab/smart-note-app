# Smart Note App API

A robust REST and GraphQL API for managing notes with user authentication and AI-powered summarization, built with Node.js and Express.

## 🚀 Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd Smart-Note-App
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**Create a `.env` file in the project root with the following variables:

   ```env
   PORT=5000
   DB_URI="mongodb://localhost:27017/smart-note-app"
   SALT=10
   JWT_PRIVATE_KEY="your-private-key"
   JWT_PUBLIC_KEY="your-public-key"
   JWT_EXPIRATION="12h"
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-app-password"
   OPENAI_API_KEY="your-openai-api-key"
   # or GEMINI_API_KEY="your-gemini-api-key" if using Gemini
   RATE_LIMIT_WINDOW=15
   RATE_LIMIT_MAX=100
   ```

4. **Start the Server**

   ```bash
   npm start
   # or
   pnpm start
   ```

## 📚 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /register
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "123456"
}
```

- **Description**: Registers a new user with email and password.
- **Security**: Password is hashed using bcrypt with a pre-save Mongoose hook.

#### Login

```http
POST /login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "123456"
}
```

- **Description**: Authenticates a user and returns a JWT token.
- **Security**: Validates credentials and uses asymmetric JWT signing.

#### Upload Profile Picture

```http
PATCH /upload-profile-pic
Authorization: Bearer <token>
Content-Type: multipart/form-data

[file field named "profilePicture"]
```

- **Description**: Uploads a profile picture for the authenticated user.
- **Details**: Stores images in the `/uploads` folder with unique filenames to prevent overwriting.

#### Logout

```http
POST /logout
Authorization: Bearer <token>
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "123456"
}
```

- **Description**: Revokes the user's JWT token.
- **Security**: Token revocation is checked in the authentication middleware.

#### Forgot Password

```http
POST /forget-password
Content-Type: application/json

{
    "email": "user@example.com"
}
```

- **Description**: Sends a one-time password (OTP) to the user's email for password reset.
- **Security**: Verifies email existence and uses nodemailer for secure email delivery.

#### Reset Password

```http
POST /reset-password
Content-Type: application/json

{
    "email": "user@example.com",
    "otp": "123456",
    "newPassword": "newpassword123"
}
```

- **Description**: Resets the user's password after OTP verification.
- **Security**: OTP is one-time use and validated before password update.

### Notes Management Endpoints

#### GraphQL API for Notes

```
GET /notes

# Example Query:
query {
  notes(userId: "id", title: "search", startDate: "2023-01-01", endDate: "2023-12-31", page: 1, limit: 10) {
    notes {
      _id
      title
      content
      ownerId {
        name
        email
        profilePicture
      }
    }
    totalCount
    currentPage
    totalPages
  }
}
```

- **Description**: Retrieves notes with filtering (userId, title, date range) and pagination.
- **Details**: Pagination is handled at the database level for performance.

#### Create Note

```http
POST /notes
Authorization: Bearer <token>
Content-Type: application/json

{
    "title": "Meeting Notes",
    "content": "Today we discussed project timelines...",
    "ownerId": "user-id-here"
}
```

- **Description**: Creates a new note for the authenticated user.
- **Validation**: Uses Joi for input validation.

#### Delete Note

```http
DELETE /notes/:id
Authorization: Bearer <token>
```

- **Description**: Deletes a note if it belongs to the authenticated user.

#### Summarize Note

```http
POST /notes/:id/summarize
Authorization: Bearer <token>
```

- **Description**: Summarizes the content of a note using an AI model (OpenAI or Gemini).
- **Response**: Returns a short summary of the note content.

## 🔐 Authentication

All routes except `/register`, `/login`, and `/forget-password` require a JWT token in the Authorization header:

```http
Authorization: Bearer <your-token>
```

- Tokens are signed and verified using asymmetric keys.
- Revoked tokens are checked in the authentication middleware.

## 🔒 Security Features

- **Asymmetric JWT**: Uses private/public key pair for signing and verification.
- **Password Hashing**: Implements bcrypt with a configurable salt factor.
- **Rate Limiting**: Limits to 100 requests per 15-minute window.
- **Security Headers**: Uses helmet for HTTP header security.
- **CORS Protection**: Configurable CORS for secure cross-origin requests.
- **Token Revocation**: Supports token revocation on logout.
- **OTP Security**: One-time use OTP for password reset.
- **Input Validation**: Uses Joi for robust input validation.

## 📝 Features

- User authentication with asymmetric JWT
- Profile picture upload with unique filename handling using Multer
- CRUD operations for notes with MongoDB and Mongoose
- GraphQL API with filtering and database-level pagination
- AI-powered note summarization using OpenAI or Gemini
- Email notifications for password reset using nodemailer
- Comprehensive error handling with custom middleware
- Modular project structure adhering to clean code principles
- 404 handling for invalid routes with clear error messages

## 🛠️ Technology Stack

- **Node.js & Express.js**: Core framework for the API
- **GraphQL**: For flexible note querying
- **MongoDB & Mongoose**: Database and ORM
- **OpenAI/Gemini**: AI-powered summarization
- **JWT**: Asymmetric authentication
- **bcrypt**: Password hashing
- **Multer**: File uploads
- **nodemailer**: Email notifications
- **Joi**: Input validation
- **helmet, cors, rate-limiter**: Security enhancements

## 📜 Postman Collection

A Postman collection (`Smart-Note-App.postman_collection.json`) is included in the repository root for testing all endpoints.

## 📝 Notes

- JSDoc comments are included for all APIs and functions to improve code readability.
- Logging is limited to essential messages (e.g., server startup, database connection, errors).
- Error-handling middleware is applied after all routes in `index.js`.
- The project is optimized for performance with database-level pagination and efficient queries.


## 👨 Author

**Hosssam Motea Said**

- GitHub: [@7ossam-ghallab](https://github.com/7ossam-ghallab)
- Email: hossam.m.ghallab@gmail.com