# 🏨 StayEase API — Hotel Management System

A RESTful backend API built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)** to manage hotel operations including Hotels, Rooms, Guests, and Bookings.

> No frontend required — all endpoints tested via **Postman**

---

## ⚙️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| MongoDB | NoSQL database |
| Mongoose | ODM for schema management |
| dotenv | Environment variable management |
| nodemon | Dev auto-restart utility |

---

## 📁 Folder Structure

```
stayease-api/
├── config/db.js              → MongoDB connection
├── models/
│   ├── Hotel.js              → Hotel schema (embeds Manager)
│   ├── Room.js               → Room schema (ref: Hotel)
│   ├── Guest.js              → Guest schema
│   └── Booking.js            → Booking schema (ref: Guest, Room)
├── controllers/
│   ├── hotelController.js
│   ├── roomController.js
│   ├── guestController.js
│   └── bookingController.js
├── routes/
│   ├── hotelRoutes.js
│   ├── roomRoutes.js
│   ├── guestRoutes.js
│   └── bookingRoutes.js
├── .env.example
├── .gitignore
├── package.json
└── server.js
```



## 🔗 Entity Relationships

| Type | Entities |
|---|---|
| One-to-One | Hotel ↔ Manager (embedded) |
| One-to-Many | Hotel → Rooms |
| Many-to-One | Room → Hotel |
| Many-to-Many | Guests ↔ Rooms (via Bookings) |

---


## 📡 API Endpoints

### Hotels — `/api/hotels`
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/hotels | Create a hotel |
| GET | /api/hotels | Get all hotels |
| GET | /api/hotels/:id | Get hotel by ID |
| PUT | /api/hotels/:id | Update hotel |
| DELETE | /api/hotels/:id | Delete hotel |
| DELETE | /api/hotels/drop | Drop all hotels |

### Rooms — `/api/rooms`
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/rooms | Create a room |
| GET | /api/rooms | Get all rooms |
| GET | /api/rooms/available | Get available rooms |
| GET | /api/rooms/:id | Get room by ID |
| PUT | /api/rooms/:id | Update room |
| DELETE | /api/rooms/:id | Delete room |
| DELETE | /api/rooms/drop | Drop all rooms |

### Guests — `/api/guests`
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/guests | Register a guest |
| GET | /api/guests | Get all guests |
| GET | /api/guests/:id | Get guest by ID |
| PUT | /api/guests/:id | Update guest |
| DELETE | /api/guests/:id | Delete guest |
| DELETE | /api/guests/drop | Drop all guests |

### Bookings — `/api/bookings`
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/bookings | Create a booking |
| GET | /api/bookings | Get all bookings (populated) |
| GET | /api/bookings/:id | Get booking by ID |
| PUT | /api/bookings/:id | Update booking |
| PUT | /api/bookings/:id/cancel | Cancel booking |
| DELETE | /api/bookings/:id | Delete booking |
| DELETE | /api/bookings/drop | Drop all bookings |

---

## 🧠 Business Logic

- ✅ Room availability is **automatically set to false** when booked
- ✅ Room availability is **automatically reset to true** when booking is cancelled or deleted
- ✅ Total booking amount is **auto-calculated** based on price × nights
- ✅ Booking responses include **fully populated** guest, room, and hotel data
- ✅ Duplicate guest emails are rejected with a clear error message

---

## 🧪 Sample Request Bodies

### Create Hotel
```json
{
  "name": "The Grand Palace",
  "location": "Mumbai, India",
  "phone": "9876543210",
  "email": "grand@palace.com",
  "starRating": 5,
  "manager": {
    "name": "Rahul Sharma",
    "email": "rahul@palace.com",
    "phone": "9123456789"
  }
}
```

### Create Room
```json
{
  "roomNumber": "101",
  "type": "Deluxe",
  "price": 3500,
  "floor": 1,
  "maxOccupancy": 2,
  "amenities": ["AC", "WiFi", "TV", "Mini Bar"],
  "hotel": "<hotel_id>"
}
```

### Register Guest
```json
{
  "name": "Vasvi Singh",
  "email": "vasvi@example.com",
  "phone": "9876543210",
  "nationality": "Indian",
  "address": "Lucknow, UP"
}
```

### Create Booking
```json
{
  "guest": "<guest_id>",
  "room": "<room_id>",
  "checkIn": "2025-07-01",
  "checkOut": "2025-07-03",
  "specialRequests": "Non-smoking room",
  "paymentStatus": "Paid"
}
```

---

## 📄 License

MIT — Free to use and modify.
