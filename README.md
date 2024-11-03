# Hospital Display Management System

This is a comprehensive React application for managing hospital information displays, featuring real-time content management, emergency alerts, announcements, and scheduling capabilities. Built with React, Firebase, and Tailwind CSS.

## 🚀 Features

### **Multi-Mode Display System**
- **Default Video Display**: Continuous playback of informational content
- **Emergency Alerts**: Immediate broadcast of critical messages
- **Announcements Board**: Multiple announcement management
- **Schedule Display**: Daily events and timing management

### **Secure Admin Panel**
- **Protected Routes** with Authentication
- **Real-time Content Management**
- **User-friendly Interface**

### **Firebase Integration**
- **Real-time Database Updates**
- **Secure Authentication**
- **Production and Development Environment Support**

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Firebase Account
- Git

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd hospital-display-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with your Firebase configuration:
```env
REACT_APP_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_auth_domain
REACT_APP_DATABASE_URL=your_database_url
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_storage_bucket
REACT_APP_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_APP_ID=your_app_id
REACT_APP_USE_FIREBASE_EMULATOR=false
```

4. Start the development server:
```bash
npm start
```

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project
2. Enable Authentication and Realtime Database
3. Add your web app to get configuration details
4. Update environment variables with your Firebase config

### Development Environment
For local development with Firebase emulators:
```bash
# Start Firebase emulators
firebase emulators:start

# Set environment variable
REACT_APP_USE_FIREBASE_EMULATOR=true
```

## 📁 Project Structure
```
hospital-display-system/
├── src/
│   ├── components/
│   │   ├── AdminPanel.js
│   │   ├── AuthContext.js
│   │   ├── HospitalDisplay.js
│   │   ├── LoginPage.js
│   │   ├── NavigationHeader.js
│   │   └── ProtectedRoute.js
│   ├── firebase.js
│   ├── App.js
│   ├── index.css
│   └── index.js
├── firebase.json
├── .env
├── package.json
└── tailwind.config.js
```

## 💻 Usage

### Admin Panel Features
1. **Default View Management**
   - Set YouTube video IDs for informational content
   - Toggle fullscreen display

2. **Emergency Alerts**
   - Broadcast immediate emergency messages
   - Override current display content

3. **Announcements**
   - Add/remove multiple announcements
   - Real-time updates to display

4. **Schedule Management**
   - Add/edit daily events
   - Set specific times and descriptions

### Authentication
- Secure admin login required for management features
- Protected routes ensure unauthorized access prevention
- Session management with Firebase Auth

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Firebase:
```bash
firebase deploy
```

The application can also be deployed to:
- Vercel
- Netlify
- Other static hosting services

## 🔒 Security

- All admin routes are protected
- Firebase Authentication ensures secure access
- Real-time Database rules should be configured for security
- Environment variables protect sensitive configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🛟 Support

For support:
1. Check the issues section
2. Contact benjaminkakai@gmail.com
3. Review Firebase documentation for backend-related queries

