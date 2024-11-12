# Gym-Ping

> **Find! Fit! Thrive!** 

 **Gym-Ping** is a web application designed to help users locate gyms, track their fitness progress, and enhance their workout journey. With features like a gym locator, a fitness tracker dashboard (coming soon), and a modern responsive design, Gym-Ping aims to be the ultimate companion for fitness enthusiasts.

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Usage](#usage)
* [Folder Structure](#folder-structure)
* [License](#license)

## Features

* **Gym Locator** : Easily find nearby gyms with filters for ratings, price, and available equipment.
* **Fitness Tracker Dashboard (Coming Soon)** : Track your fitness journey with a dedicated dashboard providing insights and visual data on your progress.
* **Responsive Design** : Optimized for both desktop and mobile devices for seamless access across all platforms.

## Tech Stack

* **Frontend** : React, TypeScript, Tailwind CSS
* **Backend** : Strapi CMS for content management
* **Authentication** : Clerk for secure user authentication

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository** :
   

```bash
   git clone https://github.com/your-username/Gym-Ping.git
   cd Gym-Ping

2. **Install Dependencies** :

```bash
   npm install
   ```

3. **Create environment variables** :
   Make a .env file in the root directory and add your environment variable

```bash
   REACT_APP_CLERK_FRONTEND_API=<your-clerk-frontend-api>

4. **Start the development server** :
```bash
   npm run dev
   ```

5. **Build for production** :

```bash
   npm run build
   ```

## Usage

* Once the app is up and running, you can explore the following features:

    - **Gym Locator** :
        Access the gym locator to find gyms near your location.
        Sort by name, rating, and price to find the best fit.
        Check available equipment and contact details for each gym.

    - **Dashboard** :
        -The "Coming Soon!" Dashboard will soon feature fitness tracking capabilities, allowing you to monitor your progress.

    - **Authentication** :
        -Sign in securely with Clerk to access personalized features and save preferences.

## Folder Structure

  ```bash
    Gym-Ping 
    ├── public
    ├── src 
    │ ├── assets
    │ ├── components
    │ ├── pages
    │ ├── App.tsx
    │ └── index.tsx
    ├── .env
    ├── package.json
    └── README.md
  ```

## License

This project is licensed under the MIT License.
