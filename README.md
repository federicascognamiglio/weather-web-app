# 🌦️ Weather Web App

**Live Demo**: [https://weather-web-app-eta-three.vercel.app/](https://weather-web-app-eta-three.vercel.app/)

## 📌 Objective

This project is a simple yet fully functional **responsive Weather Dashboard** built for an interview coding exercise.  
It displays a real-time and 4-day weather forecast for **Lodi, Italy**, using the OpenWeatherMap API.

---

## ✅ Features

- **Two pages**:
  - **Dashboard** (main): current weather & 4-day forecast
  - **Settings**: placeholder page with link back to dashboard

- **Responsive Web Design**:
  - Optimized layout for both mobile and desktop devices using Bootstrap

- **Interactive elements**:
  - Switch between Celsius and Fahrenheit units
  - Refresh weather data manually with a button

- **API Integration**:
  - Data fetched dynamically from [OpenWeatherMap](https://openweathermap.org/forecast5)

- **Hosted online**:
  - [https://weather-web-app-eta-three.vercel.app/](https://weather-web-app-eta-three.vercel.app/)

---

## 🧰 Tech Stack

- **React** (with Vite)
- **Bootstrap**
- **OpenWeatherMap API**
- **Axios**
- **Vercel** for deployment

---

## ⚙️ Getting Started

1. **Clone the repository**

    ```bash
    git clone https://github.com/federicascognamiglio/weather-web-app.git
    cd weather-web-app
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Add environment variables**

    Create a .env file in the root with the following:
    ```env
    VITE_API_URL=https://api.openweathermap.org/data/2.5/forecast
    VITE_API_KEY=your_api_key_here
    VITE_ICON_URL=https://openweathermap.org/img/wn/
    ```
    Replace your_api_key_here with your actual OpenWeatherMap API key.

4. **Start the development server**


## 🔧 Project Structure
```bash
src/
├── components/      # Reusable components
├── pages/           # Dashboard and Settings
├── assets/          # Images, icons, etc.
├── layouts/         # Layouts
└── App.jsx          # Routing
```

## ✨ Author
Built by Federica Scognamiglio.