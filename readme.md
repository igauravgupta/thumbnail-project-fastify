# Thumbnail Management API

A RESTful API built with Fastify for managing video thumbnails with user authentication.

## Features

- User authentication (register, login, password reset)
- Thumbnail management (upload, retrieve, update, delete)
- File upload handling
- JWT-based authentication
- MongoDB integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```plaintext
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forget-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

### Thumbnail Management

All thumbnail endpoints require authentication (JWT token in header)

- `POST /api/thumbnail/create` - Upload new thumbnail
- `GET /api/thumbnail` - Get all thumbnails for authenticated user
- `GET /api/thumbnail/:id` - Get specific thumbnail
- `PUT /api/thumbnail/:id` - Update thumbnail details
- `DELETE /api/thumbnail/:id` - Delete specific thumbnail
- `DELETE /api/thumbnail` - Delete all thumbnails for authenticated user

## Project Structure

├── controllers/
│ ├── authController.js
│ └── thumbnailController.js
├── models/
│ ├── thumbnail.js
│ └── user.js
├── plugins/
│ ├── jwt.js
│ └── mongodb.js
├── routes/
│ ├── auth.js
│ └── thumbnail.js
├── uploads/
├── server.js
└── package.json

## Running the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run start
```

## Technologies Used

- [Fastify](https://www.fastify.io/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [@fastify/jwt](https://github.com/fastify/fastify-jwt) - JWT authentication
- [@fastify/multipart](https://github.com/fastify/fastify-multipart) - File upload handling
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Password hashing

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- File upload validation
- User-specific data access

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
