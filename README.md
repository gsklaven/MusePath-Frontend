# MusePath - Museum Navigation Frontend

Interactive museum maps, exhibit details, and personalized navigation. Enhances visits with real-time route suggestions, audio descriptions, exhibit ratings, crowd updates, accessibility features, language options, and step-by-step guidance.

## 🎯 Features

### Core Functionality
- **Interactive Museum Maps**: Navigate through museum spaces with dynamic maps
- **Exhibit Information**: Detailed information about exhibits with ratings and features
- **Personalized Routes**: AI-generated routes based on user preferences
- **Real-time Navigation**: Step-by-step directions to destinations
- **Search Functionality**: Find exhibits by category or keyword
- **Offline Mode**: Download content for offline access

### User Features
- **User Authentication**: Basic authentication with login/registration
- **Profile Personalization**: Customize preferences for tailored experiences
- **Favourites**: Save and manage favourite exhibits
- **Ratings**: Rate exhibits and view your rating history
- **Audio Guides**: Listen to audio descriptions of exhibits
- **Accessibility**: Wheelchair accessible and braille support indicators

### Technical Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Offline Support**: Download maps and exhibits for offline use
- **GPS Integration**: Real-time location tracking
- **Route Planning**: Create routes with multiple stops
- **State Management**: React Context for authentication and app state

## 📱 Screens (Mockups Implementation)

The application implements the following screens based on mockups:

1. **Login/Registration** (M-5, M-4) - User authentication
2. **Profile Setup** (M-6) - Initial profile setup suggestion
3. **Questionnaire** (M-7) - Preference collection
4. **Main Map** (M-8) - Interactive museum map with search
5. **Settings** (M-9) - User settings and preferences
6. **Exhibit Information** (M-16, M-10) - Exhibit details and actions
7. **Create Route** (M-12, M-15) - Route creation with stops
8. **Navigation** (M-11) - Active navigation view
9. **Personalized Route** (M-13) - AI-generated route overview
10. **Offline Content** (M-14) - Download content for offline use
11. **Error Modals** (M-1, M-2, M-3) - Various error states

## 🔌 API Integration

The frontend integrates with **10 backend endpoints**:

1. **GET /exhibits/{id}** - Fetch exhibit information
2. **GET /exhibits/search** - Search for exhibits
3. **POST /routes** - Calculate route to destination
4. **GET /routes/{id}** - Get route details and ETA
5. **PUT /users/{id}/preferences** - Update user preferences
6. **GET /users/{id}/routes** - Get personalized route
7. **POST /exhibits/{id}/ratings** - Rate an exhibit
8. **POST /users/{id}/favourites** - Add to favourites
9. **GET /destinations** - Get all destinations
10. **GET /maps/{id}** - Get map data

## 🛠️ Technology Stack

- **React 18.2.0** - UI library
- **React Router DOM 6.20.0** - Client-side routing
- **Axios 1.6.2** - HTTP client for API requests
- **Create React App** - Build tooling
- **CSS3** - Styling with CSS variables

## 📂 Project Structure

```
MusePath-Frontend/
├── public/
│   └── index.html                 # HTML template
├── src/
│   ├── api/                       # API client and methods
│   │   ├── client.js              # Axios instance with interceptors
│   │   ├── exhibits.js            # Exhibit-related endpoints
│   │   ├── routes.js              # Route calculation endpoints
│   │   ├── maps.js                # Map and destination endpoints
│   │   ├── users.js               # User preferences and favourites
│   │   └── sync.js                # Offline sync endpoints
│   ├── components/                # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Loading.jsx
│   │   ├── ErrorMessage.jsx
│   │   └── Header.jsx
│   ├── context/                   # React Context providers
│   │   └── AuthContext.jsx        # Authentication context
│   ├── hooks/                     # Custom React hooks
│   │   ├── useGeolocation.js      # GPS location hook
│   │   └── useOnlineStatus.js     # Network status hook
│   ├── pages/                     # Page components
│   │   ├── LoginPage.jsx          # Login screen (M-5)
│   │   ├── RegisterPage.jsx       # Registration screen (M-4)
│   │   ├── ProfileSetupPage.jsx   # Profile setup (M-6)
│   │   ├── QuestionnairePage.jsx  # Questionnaire (M-7)
│   │   ├── MapPage.jsx            # Main map (M-8)
│   │   ├── SettingsPage.jsx       # Settings (M-9)
│   │   ├── ExhibitPage.jsx        # Exhibit info (M-16, M-10)
│   │   ├── CreateRoutePage.jsx    # Create route (M-12, M-15)
│   │   ├── NavigationPage.jsx     # Navigation (M-11)
│   │   ├── PersonalizedRoutePage.jsx # Personalized route (M-13)
│   │   ├── OfflineContentPage.jsx # Download content (M-14)
│   │   ├── ManageOfflinePage.jsx  # Manage offline content
│   │   ├── FavouritesPage.jsx     # Favourites list
│   │   └── RatingsPage.jsx        # Ratings history
│   ├── router/                    # Route configuration
│   │   ├── AppRouter.jsx          # Main router
│   │   └── ProtectedRoute.jsx     # Auth guard
│   ├── utils/                     # Utility functions
│   │   ├── validators.js          # Input validation
│   │   ├── formatters.js          # Data formatting
│   │   ├── constants.js           # App constants
│   │   └── helpers.js             # Helper functions
│   ├── App.js                     # Root component
│   ├── index.js                   # Entry point
│   └── index.css                  # Global styles
├── .env.example                   # Environment variables template
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies
└── README.md                      # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running at the configured URL

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update:
   ```
   REACT_APP_API_BASE_URL=https://api.server.test/v1
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `build/` directory.

## 🔑 Authentication

The application uses **Basic Authentication**:

1. Register with email and password
2. Credentials are base64 encoded and sent in Authorization header
3. Token is stored in localStorage
4. Protected routes require authentication

## 🗺️ User Flows

### First-Time User Journey
1. Register → Profile Setup → Questionnaire → Main Map
2. System suggests completing preferences for personalized routes
3. User can skip and complete later from Settings

### Regular User Journey
1. Login → Main Map
2. Search for exhibits or destinations
3. View exhibit details, rate, and favourite
4. Create custom routes or generate personalized routes
5. Navigate with step-by-step directions

### Offline Mode
1. Download content from Settings
2. App automatically switches to offline mode when disconnected
3. Access downloaded maps and exhibits
4. Changes sync when back online

## 🎨 Key Components

### Map Integration
- **MapPage**: Main interactive map with search and destination selection
- **GPS Integration**: Real-time user location tracking
- **Destination Display**: Shows available exhibits, exits, and restrooms

### Route Management
- **CreateRoutePage**: Plan routes with multiple stops
- **NavigationPage**: Active turn-by-turn navigation
- **PersonalizedRoutePage**: AI-generated routes based on preferences

### Offline Support
- **OfflineContentPage**: Download maps and exhibits
- **ManageOfflinePage**: View and delete cached content
- **Sync Mechanism**: Queue offline actions for later sync

## 🔧 Configuration

### API Endpoints
Configure in `.env`:
```
REACT_APP_API_BASE_URL=https://api.server.test/v1
```

### Constants
Modify in `src/utils/constants.js`:
- Walking speed
- Map defaults
- Exhibit categories
- Storage keys

## 🧪 Testing

```bash
npm test
```

## 📝 Development Notes

### State Management
- **AuthContext**: User authentication and profile data
- **localStorage**: Offline content and pending sync operations
- **Component State**: Local UI state

### API Client
- Axios instance with request/response interceptors
- Automatic token injection
- Error handling and offline detection
- 401 redirect to login

### Styling
- CSS Variables for theming
- Mobile-first responsive design
- Reusable component styles
- Global utility classes

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is part of the MusePath museum navigation system.

## 🆘 Support

For issues or questions:
1. Check the browser console for errors
2. Verify API endpoint configuration
3. Ensure backend is running
4. Check network connectivity for online features