### Instructions for Setting Up the Project Locally

#### Backend Setup

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
        - Sample `.env` file

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
