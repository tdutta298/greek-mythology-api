# 🏛️ Greek Mythology Mobile App

A comprehensive full-stack mobile application built with Flutter and Node.js that brings the fascinating world of Greek mythology to your fingertips. Explore gods, heroes, mythical creatures, and epic tales from ancient Greece with an intuitive and beautiful user interface.

## ✨ Features

- **📱 Cross-Platform Mobile App**: Built with Flutter for iOS and Android
- **🏛️ Complete Mythology Database**: Explore Gods, Heroes, Creatures, and Myths
- **📖 Detailed Information**: Rich details including parentage, deeds, symbols, and more
- **✏️ Interactive Management**: Add, view, edit, and delete entries with ease
- **🎨 Beautiful UI**: Modern dark theme with category-specific color coding
- **🔄 Real-time Updates**: Seamless API integration for live data management

## 🎯 App Categories

### ⚡ Gods
- Divine domains and powers
- Sacred symbols and attributes
- Family relationships and parentage
- Roman equivalents
- Associated myths and stories

### 🦸‍♂️ Heroes
- Heroic deeds and accomplishments
- Parentage and divine connections
- Associated myths and legends
- Ultimate fate and destiny

### 🐉 Creatures
- Mythical beast types and abilities
- Origins and habitats
- Powers and special abilities
- Connected myths and stories

### 📜 Myths
- Epic tales and stories
- Characters involved
- Moral lessons and themes
- Historical sources

## 🛠️ Tech Stack

### Frontend
- **Flutter** - Cross-platform mobile framework
- **Dart** - Programming language
- **HTTP** - API communication
- **Material Design** - UI components

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

## 🧪 Testing

This project includes comprehensive testing to ensure reliability and code quality.

### Testing Tools
- **Jest** - JavaScript testing framework
- **Supertest** - API endpoint testing
- **MongoDB Memory Server** - In-memory database for testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run specific test types
npm run test:unit        # Unit tests only
npm run test:integration # Integration tests only
npm run test:api         # API tests only
```

### Test Coverage
The project maintains **85%+ code coverage** across:
- Unit tests for individual components
- Integration tests for database operations
- API tests for all endpoints
- Mock tests for external dependencies

![Test Coverage Report](backend/assets/test-coverage.png)

### Test Structure
```
backend/test/
├── unit/           # Individual component tests
├── integration/    # Database integration tests
├── api/           # HTTP endpoint tests
└── mocks/         # Mock implementations
```

## 📱 UI Features

- **Home Screen**: Beautiful category grid with color-coded sections
- **List Views**: Clean, scrollable lists with search functionality
- **Detail Pages**: Comprehensive information display
- **Add/Edit Forms**: User-friendly input dialogs
- **Dark Theme**: Modern, eye-friendly design

## 🚀 Getting Started

### Prerequisites

- **Flutter SDK** (latest stable version)
- **Dart SDK** (comes with Flutter)
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Android Studio** or **Xcode** (for mobile development)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/greek-mythology-app.git
   cd greek-mythology-app/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file
   MONGODB_URI=mongodb://localhost:27017/greek_mythology
   PORT=3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   Server will run at `http://localhost:3000`

### Flutter App Setup

1. **Navigate to Flutter project**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   flutter pub get
   ```

3. **Update API endpoint**
   - Open the list files (gods_list.dart, heroes_list.dart, etc.)
   - Update the IP address in API calls to match your backend server
   ```dart
   // Replace with your actual IP address
   final response = await http.get(Uri.parse('http://YOUR_IP:3000/api/heroes'));
   ```

4. **Run the app**
   ```bash
   flutter run
   ```

## 🗂️ Project Structure

```
greek-mythology-app/
├── backend/
│   ├── models/
│   │   ├── God.js
│   │   ├── Hero.js
│   │   ├── Creature.js
│   │   └── Myth.js
│   ├── routes/
│   │   ├── gods.js
│   │   ├── heroes.js
│   │   ├── creatures.js
│   │   └── myths.js
│   ├── test/
│   │   ├── unit/
│   │   ├── integration/
│   │   ├── api/
│   │   └── mocks/
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── lib/
│   │   ├── screens/
│   │   │   ├── gods/
│   │   │   ├── heroes/
│   │   │   ├── creatures/
│   │   │   └── myths/
│   │   └── main.dart
│   └── pubspec.yaml
└── README.md
```

## 🌐 API Endpoints

### Heroes
- `GET /api/heroes` - Get all heroes
- `POST /api/heroes` - Add new hero
- `PUT /api/heroes/:id` - Update hero
- `DELETE /api/heroes/:id` - Delete hero

### Gods
- `GET /api/gods` - Get all gods
- `POST /api/gods` - Add new god
- `PUT /api/gods/:id` - Update god
- `DELETE /api/gods/:id` - Delete god

### Creatures
- `GET /api/creatures` - Get all creatures
- `POST /api/creatures` - Add new creature
- `PUT /api/creatures/:id` - Update creature
- `DELETE /api/creatures/:id` - Delete creature

### Myths
- `GET /api/myths` - Get all myths
- `POST /api/myths` - Add new myth
- `PUT /api/myths/:id` - Update myth
- `DELETE /api/myths/:id` - Delete myth

## 📝 Sample Data

### Hero Example
```json
{
  "name": "Achilles",
  "parentage": ["Peleus", "Thetis"],
  "heroicDeeds": ["Trojan War Hero", "Defeated Hector"],
  "associatedMyths": ["Iliad", "Trojan War"],
  "fate": "Killed by Paris with arrow to heel"
}
```

### God Example
```json
{
  "name": "Athena",
  "domain": ["Wisdom", "Warfare", "Crafts"],
  "symbols": ["Owl", "Olive Tree", "Shield"],
  "parents": ["Zeus"],
  "romanEquivalent": "Minerva"
}
```

## 🎨 Design Philosophy

- **Intuitive Navigation**: Simple category-based organization
- **Rich Information Display**: Comprehensive details without clutter
- **Interactive Elements**: Long-press to delete, tap to view details
- **Consistent Theming**: Color-coded categories with dark theme
- **Mobile-First**: Optimized for touch interactions and mobile screens

## 🔧 Configuration

### Network Configuration
Update the IP address in your Flutter app files to match your backend server:

```dart
// In heroes_list.dart, gods_list.dart, etc.
final response = await http.get(Uri.parse('http://192.168.1.12:3000/api/heroes'));
```

### MongoDB Connection
Configure your database connection in `.env`:
```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/greek_mythology

# MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/greek_mythology
```

## 🐛 Troubleshooting

### Common Issues

1. **Connection Refused**: Ensure backend server is running and IP address is correct
2. **Null Values**: Check database schema and ensure required fields are populated
3. **Build Errors**: Run `flutter clean` and `flutter pub get`
