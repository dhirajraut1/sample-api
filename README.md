# Sample API for Testing

Express.js API for testing and demo purposes with JWT auth, products, orders, and users. MongoDB (Mongoose) for persistence. OpenAPI spec and Swagger UI included.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **DB**: MongoDB via Mongoose
- **Auth**: JWT (Bearer)
- **Docs**: OpenAPI (JSON) + Swagger UI

## Getting Started

- **Prerequisites**

  - Node.js 18+
  - MongoDB running locally or in the cloud

- **Install**

```bash
pnpm install
```

- **Environment**
  Create a `.env` from `.env.example` and update values as needed:

```env
MONGO_URI=mongodb://localhost:27017/api_testing_db
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h
NODE_ENV=development
# Optional for seeding
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

- **Run**

```bash
# Development (auto-reload)
pnpm run dev
# Production
pnpm start
```

## API Documentation

- OpenAPI JSON: `GET /openapi.json`
- Swagger UI: `GET /api-docs`

## Authentication

- JWT Bearer tokens
- Obtain by `POST /api/auth/login`
- Use in header: `Authorization: Bearer <TOKEN>`

## Endpoints Overview

- `GET /health` – health check

- Auth (`/api/auth`)

  - `POST /register`
  - `POST /login`
  - `GET /profile` (auth)
  - `PUT /profile` (auth)

- Users (`/api/users`) [admin]

  - `GET /` (admin)
  - `GET /:id` (admin)
  - `PUT /:id` (admin)
  - `DELETE /:id` (admin)

- Products (`/api/products`)

  - `GET /` (public)
  - `GET /:id` (public)
  - `POST /` (admin)
  - `PUT /:id` (admin)
  - `DELETE /:id` (admin)

- Orders (`/api/orders`)
  - `POST /` (auth)
  - `GET /` (admin)
  - `GET /my-orders` (auth)
  - `GET /:id` (auth owner or admin)
  - `PATCH /:id/status` (admin)

## Seeding a Super Admin

A seed script creates a super admin (or can reset password for an existing admin if you extend it).

- Script: `scripts/seedSuperAdmin.js`
- Required env:

  - `MONGO_URI` – your MongoDB connection string
  - `ADMIN_EMAIL` – email for the admin
  - `ADMIN_PASSWORD` – password for the admin

- Run:

```bash
pnpm run seed:admin
# or inline env vars
MONGO_URI="mongodb://localhost:27017/api_testing_db" \
ADMIN_EMAIL="admin@example.com" \
ADMIN_PASSWORD="admin123" \
pnpm node scripts/seedSuperAdmin.js
```

## Sample Requests

- Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email":"admin@example.com","password":"admin123"}'
```

- Create Product (admin)

```bash
curl -X POST http://localhost:3000/api/products/ \
 -H "Authorization: Bearer YOUR_ADMIN_JWT" \
 -H "Content-Type: application/json" \
 -d '{
   "name":"Wireless Ergonomic Mouse",
   "description":"2.4GHz wireless ergonomic mouse with silent clicks and 1600 DPI.",
   "price":29.99,
   "stock":150,
   "category":"Accessories"
 }'
```

- Create Order (auth)

```bash
curl -X POST http://localhost:3000/api/orders/ \
 -H "Authorization: Bearer YOUR_JWT" \
 -H "Content-Type: application/json" \
 -d '{
   "items": [
     { "productId": "64f0c2a5d7b1a2e9f1a23456", "quantity": 2 },
     { "productId": "64f0c2a5d7b1a2e9f1a23457", "quantity": 1 }
   ]
 }'
```

## Project Structure

```
src/
  app.js
  config/
    config.js
    database.js
  controllers/
    authController.js
    orderController.js
    productController.js
    userController.js
  middleware/
    authMiddleware.js
    errorMiddleware.js
    validationMiddleware.js
  models/
    User.js
    Product.js
    Order.js
  routes/
    authRoutes.js
    orderRoutes.js
    productRoutes.js
    userRoutes.js
  docs/
    openapi.json
scripts/
  seedSuperAdmin.js
server.js
```

## Troubleshooting

- **Invalid or expired token**: ensure `Authorization: Bearer <JWT>` and `JWT_SECRET` matches between sign and verify.
- **MongoDB connection errors**: confirm `MONGO_URI` and server is running.
- **Order transaction error**: transactions removed; compatible with standalone MongoDB.

## License

MIT (for demo/testing purposes)
