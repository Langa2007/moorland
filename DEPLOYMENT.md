# Deployment

## Backend on Render

Set the Render service root directory to `backend`.

Build command:

```bash
npm install
```

Start command:

```bash
npm start
```

Seed database:

```bash
npm run seed
```

Create or reset the admin user:

```bash
npm run createadmin
```

Sync your local Postgres data into Neon:

```bash
npm run sync-db
```

Required Render environment variables:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DB
DATABASE_SSL=true
JWT_SECRET=change-this-to-a-long-secret
ADMIN_EMAIL=your-admin@email.com
ADMIN_PASSWORD=your-strong-password
FRONTEND_URL=https://your-frontend.vercel.app
ADMIN_URL=https://your-admin.vercel.app
CORS_ORIGINS=https://your-frontend.vercel.app,https://your-admin.vercel.app
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=moorland
RESEND_API_KEY=re_your_key
RESEND_FROM_EMAIL="Moorland House & SPA <reservations@your-domain.com>"
ADMIN_NOTIFY_EMAIL=your-admin@email.com
```

## Frontend on Vercel

Create one Vercel project with root directory `frontend`.

Environment variable:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-render-backend.onrender.com/api
```

## Admin on Vercel

Create another Vercel project with root directory `admin`.

Environment variable:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-render-backend.onrender.com/api
```
