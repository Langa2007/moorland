# Moorland House & SPA Backend

JavaScript-only Express API for Moorland House & SPA. It supports public website content, accommodation bookings, SPA bookings, lounge reservations, food orders, payment placeholders, lead capture, newsletter signup, image uploads, and admin CRUD.

## Quick Start

```powershell
cd backend
Copy-Item .env.example .env
npm.cmd install
npm.cmd run seed
npm.cmd run dev
```

API base URL:

```text
https://moorland.onrender.com/api
```

Default admin from `.env.example`:

```text
admin@moorlandhouse-spa.com
ChangeMe123!
```

Change these before production.

## Data Storage

The backend uses Postgres/Neon when `DATABASE_URL`, `DATABASE_URL_NEON`, or another supported Postgres URL env var is present.

Run the initial schema/data seed with:

```powershell
npm.cmd run seed
```

Create or update the admin user with:

```powershell
npm.cmd run createadmin
```

## Public Endpoints

```text
GET    /api/health
GET    /api/site
GET    /api/meta
GET    /api/rooms
GET    /api/rooms/:slug
GET    /api/spa-services
GET    /api/menu
GET    /api/menu?category=African%20Classics
GET    /api/gallery
GET    /api/testimonials
GET    /api/blog
GET    /api/blog/:slug
GET    /api/availability?type=room&resourceId=room_presidential&from=2026-07-01&to=2026-07-03
POST   /api/bookings/accommodation
POST   /api/bookings/spa
POST   /api/reservations/lounge
POST   /api/orders/food
POST   /api/contact
POST   /api/newsletter
POST   /api/payments/initiate
```

## Admin Auth

Login:

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@moorlandhouse-spa.com",
  "password": "ChangeMe123!"
}
```

Use the returned token:

```text
Authorization: Bearer YOUR_TOKEN
```

## Admin Endpoints

```text
GET    /api/auth/me
GET    /api/admin/dashboard
GET    /api/admin/meta
PATCH  /api/admin/meta

GET    /api/admin/rooms
POST   /api/admin/rooms
PATCH  /api/admin/rooms/:id
DELETE /api/admin/rooms/:id

GET    /api/admin/spaServices
POST   /api/admin/spaServices
PATCH  /api/admin/spaServices/:id
DELETE /api/admin/spaServices/:id

GET    /api/admin/menuItems
POST   /api/admin/menuItems
PATCH  /api/admin/menuItems/:id
DELETE /api/admin/menuItems/:id

GET    /api/admin/gallery
POST   /api/admin/gallery
PATCH  /api/admin/gallery/:id
DELETE /api/admin/gallery/:id

GET    /api/admin/testimonials
POST   /api/admin/testimonials
PATCH  /api/admin/testimonials/:id
DELETE /api/admin/testimonials/:id

GET    /api/admin/blogPosts
POST   /api/admin/blogPosts
PATCH  /api/admin/blogPosts/:id
DELETE /api/admin/blogPosts/:id

GET    /api/admin/availabilityBlocks
POST   /api/admin/availabilityBlocks
PATCH  /api/admin/availabilityBlocks/:id
DELETE /api/admin/availabilityBlocks/:id

GET    /api/admin/transactions/accommodationBookings
GET    /api/admin/transactions/spaBookings
GET    /api/admin/transactions/loungeReservations
GET    /api/admin/transactions/foodOrders
GET    /api/admin/transactions/contacts
GET    /api/admin/transactions/newsletterSubscribers
GET    /api/admin/transactions/payments
PATCH  /api/admin/transactions/:collection/:id/status

POST   /api/admin/uploads/image
```

## Example Booking Payloads

Accommodation:

```json
{
  "roomId": "room_presidential",
  "checkIn": "2026-07-01",
  "checkOut": "2026-07-03",
  "guests": 2,
  "name": "Client Guest",
  "email": "guest@example.com",
  "phone": "+254727623260",
  "notes": "Opening weekend",
  "paymentMethod": "mpesa"
}
```

SPA:

```json
{
  "serviceId": "spa_signature",
  "date": "2026-07-01",
  "time": "10:00",
  "guests": 1,
  "name": "Client Guest",
  "email": "guest@example.com",
  "phone": "+254727623260",
  "paymentMethod": "mpesa"
}
```

Food order:

```json
{
  "name": "Client Guest",
  "email": "guest@example.com",
  "phone": "+254727623260",
  "orderType": "pickup",
  "paymentMethod": "mpesa",
  "items": [
    { "menuItemId": "menu_nyama_choma", "quantity": 2 },
    { "menuItemId": "menu_dessert", "quantity": 1 }
  ]
}
```

## Payments

Payment records are created as placeholders for M-Pesa, card, and mobile money. The service is isolated in:

```text
src/services/paymentService.js
```

Replace that implementation when adding Safaricom Daraja, Pesapal, Flutterwave, Stripe, or another gateway.
