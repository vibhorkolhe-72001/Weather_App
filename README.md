# Weather_App
A full-stack Weather application with a Node.js &amp; Express backend and a React frontend. Fetches real-time weather data from WeatherAPI with input validation using Zod.
 # Weather App

A modern, full-stack weather application built with React (frontend) and Node.js/Express (backend). It fetches real-time weather data and displays it with a beautiful animated UI.

## Features
- Search weather by city name
- Real-time weather data (temperature, humidity, wind, etc.)
- Animated backgrounds and Lottie weather icons
- Responsive and modern UI
- Error handling and loading states

## Tech Stack
- **Frontend:** React, Tailwind CSS, Framer Motion, react-spinners, @lottiefiles/dotlottie-react
- **Backend:** Node.js, Express
- **API:** [WeatherAPI.com](https://www.weatherapi.com/)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Clone the repository
```bash
git clone https://github.com/vibhorkolhe-72001/Weather_App.git
cd Weather_App
```

### Backend Setup
1. Navigate to the backend folder:
	```bash
	cd Backend
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Create a `.env` file in `Backend/config/` with your WeatherAPI key:
	```env
	API_KEY=your_weatherapi_key
	PORT=5000
	```
4. Start the backend server:
	```bash
	npm start
	```

### Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
	```bash
	cd ../Frontend
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Start the frontend dev server:
	```bash
	npm run dev
	```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Folder Structure
```
Weather_App/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── weather.app.js
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   └── ...
│   └── index.html
└── README.md
```

## Customization
- Add your own Lottie files in the `Frontend/public/` directory for different weather conditions.
- Update styles in `App.css` or use Tailwind classes.

## License
This project is licensed under the MIT License.

---

Feel free to fork, star, and contribute!
