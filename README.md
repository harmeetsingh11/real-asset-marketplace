# Real World Asset Marketplace (MVP)

Welcome to the repository for the Minimum Viable Product (MVP) of the Real World Asset Marketplace. This platform enables users to connect blockchain wallets, list assets for sale, browse categorized assets, add them to a cart, and complete purchases.

## Project Overview

This project was developed during the **Timechain Summer of Code 2024 Sprint/Upskilling Phase**. The entire project outline can be accessed [here](https://drive.google.com/file/d/18JRwLiICyrvQhhDxngVKHinSzo8EqSMj/view?usp=sharing).

## Table of Contents
- [Project Overview](#project-overview)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Contributors](#contributors)

## Frontend Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/harmeetsingh11/real-asset-marketplace.git
   ```

2. **Navigate to the Frontend Directory:**
   ```bash
   cd real-asset-marketplace/frontend
   ```

3. **Install Dependencies:**
   ```bash
   pnpm install
   ```

4. **Run the Development Server:**
   ```bash
   pnpm run dev --open
   ```

   This will start the frontend development server and open the application in your default web browser.


## Backend Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [PostgreSQL](https://www.postgresql.org/)

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/harmeetsingh11/real-asset-marketplace.git
   ```

2. **Navigate to the Backend Directory:**
   ```bash
   cd real-asset-marketplace/backend
   ```

3. **Install Dependencies:**
   ```bash
   pnpm install
   ```

4. **Set Up Environment Variables:**
   - Create a `.env` file in the `backend` directory.
   - Paste the following environment variables into the `.env` file. Replace `<YOUR PGADMIN PASSWORD>` with your local pgAdmin password and `<YOUR DATABASE NAME>` with your desired database name. You can use any string for the JWT secret.

     ```
     DATABASE_URL="postgresql://postgres:<YOUR PGADMIN PASSWORD>@localhost:5432/<YOUR DATABASE NAME>?schema=public"
     JWT_SECRET="<YOUR JWT SECRET>"
     ```

     **Sample `.env` file:**

     ```
     DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/mydatabase?schema=public"
     JWT_SECRET="mysecretjwt"
     ```

5. **Run Prisma Migrations:**
   - This will create the database and all the tables as per the Prisma schema.
   ```bash
   pnpx prisma migrate dev --name init
   ```

6. **Start the Development Server:**
   ```bash
   pnpm run start:dev
   ```

7. **Make API Calls:**
   - With the server running, you can now make API calls to the available endpoints.


## Contributors:
<tr>
  <td align="center"><a href="https://github.com/harmeetsingh1)"><kbd><img src="https://avatars3.githubusercontent.com/harmeetsingh11?size=100" width="100px;" alt=""/>
  <td align="center"><a href="https://github.com/Praneesh-Sharma"><kbd><img src="https://avatars3.githubusercontent.com/Praneesh-Sharma?size=100" width="100px;" alt=""/>
  <td align="center"><a href="https://github.com/sudip2217"><kbd><img src="https://avatars3.githubusercontent.com/sudip2217?size=100" width="100px;" alt=""/>
</tr>
