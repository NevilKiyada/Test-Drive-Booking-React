🚗 Car Booking System (MERN Stack)

 📋 Project Overview
The Car Booking System is a full-stack web application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to book test drives for cars at different showrooms, while administrators can manage cars, showrooms, and bookings.

 🌟 Features
- **User Authentication:** Secure login and registration with password hashing.
- **User Roles:** Regular users can book test drives, and admins can manage cars, showrooms, and bookings.
- **Car Booking:** Users can select time slots to book test drives.
- **Booking Management:** Admins can approve, cancel, and manage bookings.
- **Responsive UI:** Clean and modern design with dark mode functionality.

 🛠️ Technologies Used
- **Frontend:** React.js with React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** Tailwind CSS

📂 Project Structure
```
project-root
├── backend
│   ├── models
│   ├── routes
│   ├── server.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── contexts
│   │   ├── pages
│   │   ├── App.js
│   │   └── index.js
└── README.md
```

 💾 Installation
1. ***Clone the repository:**
```bash
git clone https://github.com/NevilKiyada/Test-Drive-Booking-React.git
```

2. **Navigate into the backend directory:**
```bash
cd backend
```

3. **Install backend dependencies:**
```bash
npm install
```

4. **Set up environment variables:**
Create a `.env` file in the backend directory and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

5. **Start the backend server:**
```bash
npm start dev
```

6. **Navigate into the frontend directory:**
```bash
cd ../frontend
```

7. **Install frontend dependencies:**
```bash
npm install
```

8. **Start the frontend server:**
```bash
npm run dev
```

9. **Access the app:** Open `http://localhost:3000` in your browser.

## 🌐 API Routes
### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/me` - Get current user profile

### Booking Routes
- `POST /api/bookings/book` - Book a test drive
- `GET /api/bookings/user/:userId` - Get user bookings
- `PATCH /api/bookings/update-status/:bookingId` - Update booking status

### Showroom Routes
- `GET /api/showrooms` - Get all showrooms
- `POST /api/showrooms` - Create a new showroom

## 📸 Screenshots
- **Homepage:** Display available cars and showrooms
- **Car Details Page:** Book a test drive with time slot selection
- **Admin Dashboard:** Manage users, cars, and bookings

## 💡 Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## 📝 License
This project is licensed under the [MIT License](LICENSE).

---
### ✅ Happy Coding!

