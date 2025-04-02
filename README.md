# URL_Shorter
# URL Shortener

## Overview
The **URL Shortener** is a MERN stack-based web application that allows users to shorten long URLs into shorter, more manageable links. The backend is built with **Node.js, Express, and MongoDB**, while the frontend is developed using **React.js**.

## Features
- Shorten long URLs
- Store shortened URLs in MongoDB
- Retrieve and redirect short URLs to original links
- User authentication 

## Tech Stack
- **Frontend:** React.js, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Other Tools:** Dotenv, CORS, Body-Parser, Nodemon

## Installation
### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

### 2. Setup Backend
Navigate to the backend folder and install dependencies:
```sh
cd Server
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the **backend** directory and add:
```env
MONGO_URL="mongodb+srv://yourusername:yourpassword@cluster0.mongodb.net/?retryWrites=true&w=majority"
PORT=8808
SALT_ROUND=10
SECRET_KEY="your_secret_key"
```

### 4. Start the Backend Server
```sh
npm run server
```

### 5. Setup Frontend
Navigate to the frontend folder and install dependencies:
```sh
cd frontend
npm install
```

### 6. Start the Frontend Server
```sh
npm start
```

## API Endpoints
### **1. Shorten URL**
- **Endpoint:** `POST /api/url/shorten`
- **Body:**
  ```json
  {
    "originalUrl": "https://example.com"
  }
  ```
- **Response:**
  ```json
  {
    "shortUrl": "short.ly/abcd123"
  }
  ```

### **2. Redirect Short URL**
- **Endpoint:** `GET /:shortUrl`
- **Redirects** user to the original URL.

## Frontend Implementation
The frontend consists of:
- **Home Component:** Contains an input field for entering URLs and a button to shorten them.
  
## Troubleshooting
- If the backend doesn't start, check the `.env` file for correct **MongoDB URI**.
- If the frontend isn't working, ensure the backend server is running and **CORS** is enabled.



