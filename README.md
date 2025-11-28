# 📱 MusePath Frontend

> Interactive museum navigation application - React Web App

## 📋 Περιεχόμενα

- [Περιγραφή](#περιγραφή)
- [Χαρακτηριστικά](#χαρακτηριστικά)
- [Τεχνολογίες](#τεχνολογίες)
- [Εγκατάσταση](#εγκατάσταση)
- [Εκτέλεση](#εκτέλεση)
- [Δομή Project](#δομή-project)
- [Οθόνες Εφαρμογής](#οθόνες-εφαρμογής)
- [API Integration](#api-integration)

## 📖 Περιγραφή

Το MusePath Frontend είναι μια διαδραστική εφαρμογή React που επιτρέπει στους επισκέπτες μουσείων να:
- Πλοηγούνται στο χάρτη του μουσείου
- Αναζητούν και βλέπουν πληροφορίες για εκθέματα
- Δημιουργούν εξατομικευμένες διαδρομές
- Χρησιμοποιούν την εφαρμογή offline
- Αξιολογούν εκθέματα και προσθέτουν αγαπημένα

## ✨ Χαρακτηριστικά

### 🗺️ Χάρτης & Πλοήγηση
- ✅ Διαδραστικός χάρτης μουσείου
- ✅ Markers για εκθέματα
- ✅ Δημιουργία διαδρομών με πολλαπλές στάσεις
- ✅ Εξατομικευμένες διαδρομές βάσει προτιμήσεων
- ✅ Οδηγίες πλοήγησης βήμα-βήμα
- ✅ GPS tracking (με permission)

### 🎨 Εκθέματα
- ✅ Αναζήτηση εκθεμάτων
- ✅ Προβολή πληροφοριών
- ✅ Audio guides
- ✅ Αξιολογήσεις
- ✅ Αγαπημένα

### 👤 Προφίλ Χρήστη
- ✅ Δημιουργία προφίλ
- ✅ Ερωτηματολόγιο προτιμήσεων
- ✅ Ενημέρωση προτιμήσεων
- ✅ Διαχείριση αγαπημένων

### 📴 Offline Mode
- ✅ Download χαρτών
- ✅ Download πληροφοριών εκθεμάτων
- ✅ Βασική πλοήγηση χωρίς σύνδεση
- ✅ Συγχρονισμός όταν επανέλθει η σύνδεση

## 🛠️ Τεχνολογίες

- **React** (v18.2.0)
- **React Router DOM** (v6.20.0)
- **Axios** (v1.6.2) - HTTP client
- **React Zoom Pan Pinch** (v3.7.0) - Map interactions
- **React Scripts** (v5.0.1)

## 📦 Εγκατάσταση

### Προαπαιτούμενα

- Node.js 16+ ([Κατέβασμα](https://nodejs.org/))
- npm ή yarn
- MusePath Backend running (http://localhost:3000)

### Βήματα Εγκατάστασης

1. **Clone το repository**
   ```bash
   git clone <repository-url>
   cd MusePath-Frontend
   ```

2. **Εγκατάσταση dependencies**
   ```bash
   npm install
   ```

3. **Δημιουργία .env αρχείου**
   ```bash
   # Αντιγραφή του .env.example
   cp .env.example .env
   ```

4. **Ρύθμιση Backend URL**
   ```env
   # .env
   REACT_APP_API_BASE_URL=http://localhost:3000/v1
   ```

## 🚀 Εκτέλεση

### Development Mode

```bash
# Εκκίνηση development server
npm start
```

Η εφαρμογή θα ανοίξει αυτόματα στο: `http://localhost:3001`

### Production Build

```bash
# Build για production
npm run build

# Preview του production build
npx serve -s build
```

### Επιβεβαίωση λειτουργίας

1. Βεβαιωθείτε ότι το Backend τρέχει: `http://localhost:3000/v1/health`
2. Ανοίξτε το Frontend: `http://localhost:3001`
3. Θα δείτε την WelcomePage

## 📁 Δομή Project

```
MusePath-Frontend/
├── public/                   # Static files
│   ├── index.html
│   └── assets/
│       └── icons/            # App icons
│
├── src/
│   ├── index.js              # Entry point
│   ├── index.css             # Global styles
│   ├── App.js                # Main app component
│   │
│   ├── api/                  # API client layer (6 files)
│   │   ├── client.js         # Axios instance
│   │   ├── exhibits.js       # Exhibit endpoints
│   │   ├── routes.js         # Route endpoints
│   │   ├── users.js          # User endpoints
│   │   ├── maps.js           # Map endpoints
│   │   └── sync.js           # Sync endpoints
│   │
│   ├── components/           # Reusable components (8 files)
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── ExhibitBottomSheet.jsx
│   │   ├── Header.jsx
│   │   ├── Loading.jsx
│   │   ├── Modal.jsx
│   │   └── SearchBar.jsx
│   │
│   ├── pages/                # Page components (15 files)
│   │   ├── WelcomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── MapPage.jsx
│   │   ├── NavigationPage.jsx
│   │   ├── CreateRoutePage.jsx
│   │   ├── PersonalizedRoutePage.jsx
│   │   ├── QuestionnairePage.jsx
│   │   ├── QuestionnaireIntroPage.jsx
│   │   ├── SettingsPage.jsx
│   │   ├── FavouritesPage.jsx
│   │   ├── RatingsPage.jsx
│   │   ├── OfflineContentPage.jsx
│   │   ├── ManageOfflinePage.jsx
│   │   └── ProfileSetupPage.jsx
│   │
│   ├── context/              # React Context (1 file)
│   │   └── AuthContext.jsx   # Authentication state
│   │
│   ├── hooks/                # Custom React hooks (2 files)
│   │   ├── useGeolocation.js # GPS tracking
│   │   └── useOnlineStatus.js# Online/offline detection
│   │
│   ├── router/               # Routing (2 files)
│   │   ├── AppRouter.jsx     # Main router
│   │   └── ProtectedRoute.jsx# Auth guard
│   │
│   └── utils/                # Helper functions (4 files)
│       ├── constants.js      # App constants
│       ├── formatters.js     # Data formatters
│       ├── helpers.js        # General helpers
│       └── validators.js     # Input validators
│
├── .env.example              # Environment template
├── .gitignore
└── package.json              # Dependencies
```

## 🖥️ Οθόνες Εφαρμογής

### 1. **WelcomePage** `/`
- Αρχική οθόνη υποδοχής
- Κουμπιά Login/Register

### 2. **LoginPage** `/login`
- Σύνδεση χρήστη
- Email & Password

### 3. **RegisterPage** `/register`
- Εγγραφή νέου χρήστη
- Validation

### 4. **MapPage** `/map` 🔒
- Διαδραστικός χάρτης μουσείου
- Markers για εκθέματα
- Search bar
- Generate Personalized Route button
- Settings button

### 5. **CreateRoutePage** `/create-route` 🔒
- Επιλογή προορισμού
- Προσθήκη στάσεων
- Δημιουργία διαδρομής

### 6. **NavigationPage** `/navigation` 🔒
- Οδηγίες πλοήγησης
- Step-by-step directions
- ETA & distance
- Cancel navigation

### 7. **PersonalizedRoutePage** `/personalized-route` 🔒
- Εξατομικευμένη διαδρομή
- Βάσει προτιμήσεων χρήστη
- Λίστα εκθεμάτων

### 8. **QuestionnaireIntroPage** `/questionnaire-intro`
- Εισαγωγή στο ερωτηματολόγιο
- Επιλογή συμμετοχής

### 9. **QuestionnairePage** `/questionnaire` 🔒
- Ερωτηματολόγιο προτιμήσεων
- Δημιουργία προφίλ

### 10. **SettingsPage** `/settings` 🔒
- Ρυθμίσεις εφαρμογής
- Προβολή προφίλ
- Favourites
- Ratings
- Offline content
- Logout

### 11. **FavouritesPage** `/favourites` 🔒
- Λίστα αγαπημένων εκθεμάτων
- Προβολή & διαχείριση

### 12. **RatingsPage** `/ratings` 🔒
- Αξιολογήσεις χρήστη
- Ιστορικό ratings

### 13. **OfflineContentPage** `/offline-content` 🔒
- Προβολή downloaded content
- Διαθέσιμα offline

### 14. **ManageOfflinePage** `/manage-offline` 🔒
- Download χαρτών
- Download εκθεμάτων
- Διαχείριση αποθηκευμένου περιεχομένου

### 15. **ProfileSetupPage** `/profile-setup` 🔒
- Ρύθμιση προφίλ χρήστη
- Προτιμήσεις

### 16. **ApiTestPage** `/api-test` 🌐
- Testing dashboard για όλα τα backend endpoints
- Real-time response display
- Connection status check
- **Δημόσια σελίδα** - δεν χρειάζεται authentication

🔒 = Protected Route (χρειάζεται authentication)
🌐 = Public Route (για testing)

## 🔌 API Integration

### API Client Setup

```javascript
// src/api/client.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
```

### Χρησιμοποιούμενα Endpoints

#### Exhibits API
```javascript
import { getExhibitById, searchExhibits, rateExhibit } from './api/exhibits';

// Λήψη εκθέματος
const exhibit = await getExhibitById(1);

// Αναζήτηση
const results = await searchExhibits('starry');

// Αξιολόγηση
await rateExhibit(1, 5);
```

#### Routes API
```javascript
import { calculateRoute, getRouteDetails, deleteRoute } from './api/routes';

// Δημιουργία διαδρομής
const route = await calculateRoute(userId, destinationId, lat, lng);

// Λεπτομέρειες
const details = await getRouteDetails(routeId);

// Διαγραφή
await deleteRoute(routeId);
```

#### Users API
```javascript
import { updateUserPreferences, addToFavourites } from './api/users';

// Ενημέρωση προτιμήσεων
await updateUserPreferences(userId, interests);

// Προσθήκη αγαπημένου
await addToFavourites(userId, exhibitId);
```

#### Maps API
```javascript
import { getMapById, getDestinations } from './api/maps';

// Λήψη χάρτη
const map = await getMapById(mapId);

// Λίστα προορισμών
const destinations = await getDestinations();
```

## 🎨 Styling

- **CSS Modules** - Component-scoped styles
- **Global Styles** - `index.css`
- **Font** - Montserrat (Google Fonts)
- **Colors**: 
  - Primary: `#BBD689` (Green)
  - Background: `#e3ecd6` (Light cream)
  - Text: `#222` (Dark gray)

## 📱 Responsive Design

- Optimized for mobile devices
- Desktop support
- Flexbox & Grid layouts
- Media queries

## 🔐 Authentication

```javascript
// AuthContext usage
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, login, logout, register } = useAuth();
  
  // Login
  await login({ email, password });
  
  // Register
  await register({ name, email, password });
  
  // Logout
  logout();
}
```

## 📴 Offline Support

### useOnlineStatus Hook
```javascript
import { useOnlineStatus } from './hooks/useOnlineStatus';

function MyComponent() {
  const isOnline = useOnlineStatus();
  
  return (
    <div>
      {isOnline ? 'Online' : 'Offline'}
    </div>
  );
}
```

### Local Storage
- User data
- Offline sync queue
- Downloaded content

## 🌍 Geolocation

### useGeolocation Hook
```javascript
import { useGeolocation } from './hooks/useGeolocation';

function MyComponent() {
  const { position, error, loading } = useGeolocation();
  
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div>
      Lat: {position.latitude}, Lng: {position.longitude}
    </div>
  );
}
```

## 📝 Scripts

```json
{
  "start": "react-scripts start",     // Development server
  "build": "react-scripts build",     // Production build
  "test": "react-scripts test",       // Run tests
  "eject": "react-scripts eject"      // Eject from CRA
}
```

## 🔧 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_BASE_URL` | http://localhost:3000/v1 | Backend API URL |
| `PORT` | 3001 | Development server port |

## 🐛 Troubleshooting

### Το Frontend δεν ξεκινάει

**Πρόβλημα:** Port 3001 already in use

**Λύση:** Αλλάξτε το port στο `.env`:
```env
PORT=3002
```

### API calls fail

**Πρόβλημα:** Network Error

**Λύση:**
1. Ελέγξτε αν το Backend τρέχει: `http://localhost:3000/v1/health`
2. Ελέγξτε το `REACT_APP_API_BASE_URL` στο `.env`
3. Ελέγξτε CORS settings στο Backend

### Module not found

**Πρόβλημα:** Cannot find module 'react'

**Λύση:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build fails

**Πρόβλημα:** Build optimization failed

**Λύση:**
```bash
# Increase Node memory
set NODE_OPTIONS=--max-old-space-size=4096
npm run build
```

## 🚀 Deployment

### Build Production
```bash
npm run build
```

### Deploy to Static Hosting
```bash
# The build/ folder can be deployed to:
# - Netlify
# - Vercel
# - GitHub Pages
# - AWS S3
# - Firebase Hosting
```

### Environment για Production
```env
REACT_APP_API_BASE_URL=https://your-api-domain.com/v1
```

## 🧪 API Testing

Για να δοκιμάσετε το backend API:

1. Βεβαιωθείτε ότι το Backend τρέχει
2. Πηγαίνετε στο: `http://localhost:3001/api-test`
3. Πατήστε "Test All Endpoints"

Δείτε το [API Test Guide](./API-TEST-GUIDE.md) για λεπτομέρειες.

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 👥 Authors

- Software Engineering Team 2
- Aristotle University of Thessaloniki

## 📄 License

ISC License

## 🔗 Links

- [Backend Repository](../MusePath-Backend)
- [API Documentation](../MusePath-Backend/docs/swagger.json)
- [User Stories](./docs/stories-musepath-se2-2025-11-20.json)
- [Mockups](./docs/mockups/)
- [Activity Diagrams](./docs/activity-diagrams/)

---

**💡 Tips:**
- Κρατήστε το Backend running όταν αναπτύσσετε
- Χρησιμοποιήστε React DevTools για debugging
- Ελέγχετε το Network tab για API calls
- Δοκιμάστε την εφαρμογή σε offline mode
