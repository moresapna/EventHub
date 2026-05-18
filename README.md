# MERN Event Booking System

A full-stack Event Booking Platform built using the MERN stack with 
- QR-based ticket verification 
- Razorpay payment integration
- role-based authentication.

----------------------------------------------------------------------------------------------------------

# Features

## User Features

- User Registration & Login
- JWT Authentication
- Browse Events
- Book Event Tickets
- Razorpay Payment Integration
- QR Code Ticket Generation
- View Booking History
- Cancel Bookings

----------------------------------------------------------------------------------------------------------

## Admin Features

- Create Events
- Update/Delete Events
- View All Bookings
- QR Ticket Scanner
- Ticket Verification System
- Entry Limit Validation
- Block Cancelled Tickets
- Future/Past QR Validation

----------------------------------------------------------------------------------------------------------

# QR Ticket Verification

The system includes a QR-based ticket verification module.

Features:
- One-time entry validation
- Entry limit control
- Cancelled ticket detection
- Expired QR blocking
- Future event QR blocking

----------------------------------------------------------------------------------------------------------

# Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- React Router
- React QR Reader

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Payment
- Razorpay

----------------------------------------------------------------------------------------------------------

# Folder Structure

event-booking-system/
├── backend/
│   ├── config/
│   │   ├── db.js
|   |   ├── razorpay.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   ├── bookingController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validate.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── userRoutes.js
|   |   └── paymentRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│    ├── src/
│    │   ├── components/
│    │   │   ├── EventCard.jsx
│    │   │   ├── Navbar.jsx
│    │   │   └── ProtectedRoute.jsx
│    │   ├── context/
│    │   │   └── AuthContext.jsx
│    │   ├── layouts/
│    │   │   └── MainLayout.jsx     
│    │   ├── pages/
│    │   │   ├── admin/
│    │   │   │   ├── AdminBookings.jsx
│    │   │   │   ├── AdminDashboard.jsx
│    │   │   │   ├── AdminEvents.jsx
│    │   │   │   ├── AdminUsers.jsx
│    │   │   │   └── ScanTicket.jsx
│    │   │   ├── EventDetails.jsx
│    │   │   ├── Home.jsx
│    │   │   ├── Login.jsx
│    │   │   ├── MyBookings.jsx
│    │   │   ├── Signup.jsx
│    │   ├── services/
│    │   │   └── api.js
│    │   ├── App.jsx
│    │   ├── main.jsx
│    │   └── index.css
│    ├── .env   
│    ├── tailwind.config.js
│    ├── postcss.config.js
│    ├── vite.config.js
│    ├── index.html
│    └── package.json
└──  README.md


----------------------------------------------------------------------------------------------------------

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/mern-event-booking-system.git
```

----------------------------------------------------------------------------------------------------------

## Backend Setup

```bash
cd Backend
npm install
npm run dev
```

----------------------------------------------------------------------------------------------------------

## Frontend Setup

```bash
cd Frontend
npm install
npm start
```

----------------------------------------------------------------------------------------------------------

# Environment Variables

Create `.env` file in backend:

.env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret


----------------------------------------------------------------------------------------------------------

# Future Improvements

- Stadium-style seat selection
- Analytics dashboard
- Email ticket system
- Real-time seat updates
- Download ticket PDF
- Admin reports
- Dark mode

----------------------------------------------------------------------------------------------------------

# Author

Sapna Govind More