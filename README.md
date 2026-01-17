# Kaps Job Tracker

Job hunting can be overwhelming. Between managing dozens of applications, keeping track of interviews, offers, and rejections, it’s easy to lose track of where you stand. I built **Kaps Job Tracker** to tackle this exact struggle.  

This app helps you:

- Track multiple job applications in one place
- Monitor the status of each application (Applied, Interviewing, Offer, Rejected)
- Organize different types of jobs (Full-time, Part-time, Contract, Internship)
- Quickly view and update your application history with a clean, intuitive interface

I created this project out of personal necessity, managing a job search manually was chaotic and stressful. With **Kaps Job Tracker**, I wanted a simple, reliable tool that keeps all my applications organized and reduces the mental load, while also giving real time visibility into my progress.  

This project is a reflection of my journey, and a tool that I hope can help anyone else navigating the stressful and complex world of job searching.

## 🚀 Getting Started

Follow the steps below to run the project locally.

### 1. Install Dependencies

From the project root, run:

```bash
npm install
```


2. Set Up Clerk Authentication
Go to [Clerk](https://clerk.com/) and create an account (or log in).
Create a new application (you can name it anything) and copy the secret keys provided by Clerk.

3. Create Environment Variables
In the root of the project directory, create a .env file and add the following:

```bash
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
DATABASE_URL="file:./dev.db"
```


Make sure the keys are pasted exactly as provided.

4. Restart VS Code (Important)
Completely close VS Code and reopen it.
This helps prevent environment variable and Prisma related issues.

5. Set Up Prisma & Database
From the project root, run:

```bash
npx prisma generate
npx prisma migrate dev
```
This will generate the Prisma client and set up the local database.

6. Run the App
In one terminal, start the development server by running:
```bash
npm run dev
```
In a second terminal (optional), you can view live database updates with:

```bash
npx prisma studio
```
Everything should now work as expected.

✅ Notes
Restart the dev server if you change .env values

Prisma Studio reflects database changes in real time

SQLite is used for local development
