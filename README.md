
# Martwall



This project serves as a comprehensive solution for online AR store, seamlessly integrating real-time store management with an elegant and efficient e-commerce platform.


## Features

- admin dashboard featuring extensive functionalities for modifying size, color, main billboard, and category options
- creating products with many possible variants
- managing orders for future empolyees
- client store site with product page, quickview, filtered categories, search bar, cart and summary checkout


## Tech Stack

**Client:** React, Next.js, TailwindCSS, shadcn/ui

**Server:** Prisma (Planetscale)

**Other:** Stripe, Clerk

## Demo

Admin Dashboard: https://ecommerce-project-admin-five.vercel.app

Store: https://ecommerce-project-store-phi.vercel.app


## Installation

To install this project you have to run both instances (Admin Dashboard and Store) in separate servers. Download whole repository and follow instructions:

1. **Admin Dashboard**
```bash
  cd ecommerce-admin 
  npm i
```


Configure your **.env** file with your own keys from Clerk, PlanetScale, Cloudinary and Stripe.

```bash
# Environment Variables
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# PlanetScale
DATABASE_URL=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

# Stripe
STRIPE_API_KEY=
FRONTEND_STORE_URL=

STRIPE_WEBHOOK_SECRET=
```
Frontend store should be set on *localhost:3001* for local usage.
```bash
npx prisma generate
npx prisma db push
npm run dev
```
Your errors from Prisma should be solved, and database connected.

*Server should run on localhost:3000*

2. **Store configuration**
```bash
  cd ecommerce-store
  npm i
```
Create a store, and than copy NEXT_PUBLIC_API_URL from Settings page.
Now create **.env** file located in ecommerce-store folder with proper data.
```bash
NEXT_PUBLIC_API_URL=https://localhost:3000/api/[your_store]

```bash
npm run dev
```
Now the both - server and store should be connected properly.

*(!) If you are using Stripe webhook with local environment use local client for proper results.*



## Credits

Special thanks to [CodeWithAntonio](https://github.com/AntonioErdeljac) for this project base template :star: 
