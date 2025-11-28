# 🧪 API Test Page - Οδηγίες Χρήσης

## 📍 Πώς να Ανοίξετε την Σελίδα Testing

Αφού ξεκινήσετε το Frontend, πηγαίνετε στο:

```
http://localhost:3001/api-test
```

## 🎯 Τι Κάνει η Σελίδα

Η API Test Page σας επιτρέπει να:
- ✅ Δοκιμάσετε **όλα τα 24 endpoints** του backend
- ✅ Ελέγξετε αν υπάρχει σύνδεση με το backend
- ✅ Δείτε τα αποτελέσματα σε **real-time**
- ✅ Δείτε το **response time** κάθε request
- ✅ Δείτε το **response body** κάθε endpoint
- ✅ Δοκιμάσετε **όλα τα endpoints μαζί** με ένα κλικ

## 🚀 Βήματα Χρήσης

### 1. Ξεκινήστε το Backend
```bash
cd MusePath-Backend
npm start
```

Το backend θα τρέξει στο: `http://localhost:3000`

### 2. Ξεκινήστε το Frontend
```bash
cd MusePath-Frontend
npm start
```

Το frontend θα τρέξει στο: `http://localhost:3001`

### 3. Ανοίξτε την API Test Page
Πηγαίνετε στο browser:
```
http://localhost:3001/api-test
```

### 4. Ελέγξτε τη Σύνδεση
Πατήστε το κουμπί **"🔌 Check Connection"** για να δείτε αν το backend είναι online.

### 5. Δοκιμάστε Endpoints

#### Μεμονωμένα Endpoints
- Βρείτε το endpoint που θέλετε
- Πατήστε το κουμπί **"▶️ Run"**
- Δείτε το αποτέλεσμα κάτω από το endpoint

#### Όλα τα Endpoints Μαζί
- Πατήστε το κουμπί **"▶️ Test All Endpoints"**
- Περιμένετε όλα τα tests να ολοκληρωθούν
- Δείτε τα statistics στην κορυφή

## 📊 Κατανόηση των Αποτελεσμάτων

### ✅ Πράσινο Box (Success)
```json
✓ Status: 200
⏱️ 45ms

📦 Response Data
{
  "success": true,
  "data": { ... }
}
```

Το endpoint λειτουργεί σωστά!

### ❌ Κόκκινο Box (Error)
```json
✗ Status: ERROR
⏱️ 120ms

Error: Failed to fetch
```

Πιθανά προβλήματα:
- Backend δεν τρέχει
- Λάθος URL
- Network issue

## 📂 Κατηγορίες Endpoints

### 🏥 Health Check (1 endpoint)
- Έλεγχος λειτουργίας API

### 🎨 Exhibits (5 endpoints)
- Αναζήτηση εκθεμάτων
- Λεπτομέρειες εκθέματος
- Audio guide
- Αξιολόγηση
- Download

### 🗺️ Routes (5 endpoints)
- Δημιουργία διαδρομής
- Λεπτομέρειες διαδρομής
- Ενημέρωση στάσεων
- Επαναυπολογισμός
- Διαγραφή

### 👤 Users (4 endpoints)
- Ενημέρωση προτιμήσεων
- Αγαπημένα (add/remove)
- Εξατομικευμένη διαδρομή

### 🗺️ Maps (3 endpoints)
- Upload/Get/Download χάρτες

### 📍 Destinations (3 endpoints)
- Λίστα προορισμών
- Upload προορισμών
- Πληροφορίες προορισμού

### 📍 Coordinates (2 endpoints)
- Τοποθεσία χρήστη
- Ενημέρωση τοποθεσίας

### 🔔 Notifications & Sync (2 endpoints)
- Αποστολή ειδοποίησης
- Συγχρονισμός offline data

## 🎨 Χρώματα Method Badges

- 🟢 **GET** - Πράσινο (ανάγνωση)
- 🔵 **POST** - Μπλε (δημιουργία)
- 🟠 **PUT** - Πορτοκαλί (ενημέρωση)
- 🔴 **DELETE** - Κόκκινο (διαγραφή)

## 📝 Sample Request Bodies

Για POST και PUT endpoints, μπορείτε να δείτε το **sample request body** κάνοντας expand το "📝 Sample Request Body" section.

Παράδειγμα:
```json
{
  "user_id": 1,
  "destination_id": 2,
  "startLat": 40.7610,
  "startLng": -73.9780
}
```

## 📦 Response Data

Μπορείτε να δείτε το **πλήρες response** κάνοντας expand το "📦 Response Data" section.

## ⚡ Shortcuts & Tips

### 💡 Tips
1. **Test όλα πρώτα**: Πατήστε "Test All Endpoints" για να δείτε overview
2. **Check Connection**: Αν δεν δουλεύουν τα endpoints, ελέγξτε τη σύνδεση
3. **Response Time**: Κανονικά πρέπει να είναι < 100ms
4. **Expand Details**: Κάντε click στα "details" για να δείτε περισσότερα

### 🔧 Troubleshooting
1. **All endpoints fail**: Backend δεν τρέχει → ξεκινήστε το
2. **Some endpoints fail**: Πιθανό πρόβλημα με mock data
3. **Slow responses**: Restart backend

## 🖥️ Screenshots

### Header Section
```
🧪 MusePath API Test Dashboard
Δοκιμάστε όλα τα endpoints του backend με ένα κλικ

[🔌 Check Connection] [Connected ✓] [▶️ Test All Endpoints]
API URL: http://localhost:3000/v1
```

### Stats Bar
```
Total Endpoints: 24 | Tested: 24 | Successful: 22 | Failed: 2
```

### Endpoint Card
```
[GET] Search Exhibits                    [▶️ Run]
Αναζήτηση εκθεμάτων
/exhibits/search?exhibit_term=starry&mode=online

✓ Status: 200       ⏱️ 45ms
📦 Response Data { ... }
```

## 🌐 Custom API URL

Αν το backend σας τρέχει σε διαφορετικό URL, αλλάξτε το στο `.env`:

```env
REACT_APP_API_BASE_URL=http://your-backend-url:port/v1
```

## 📱 Mobile Support

Η σελίδα είναι responsive και λειτουργεί σε mobile devices.

## 🎓 Για Διδακτικούς Σκοπούς

Αυτή η σελίδα είναι ιδανική για:
- ✅ Παρουσιάσεις του project
- ✅ Debugging κατά την ανάπτυξη
- ✅ Επίδειξη των endpoints σε καθηγητές
- ✅ Quick testing χωρίς Postman

## 📞 Support

Αν αντιμετωπίζετε προβλήματα:
1. Ελέγξτε το Backend README
2. Ελέγξτε το Frontend README
3. Βεβαιωθείτε ότι τα ports είναι σωστά
4. Ελέγξτε το console για errors

---

**Καλό Testing! 🚀**
