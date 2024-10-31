# Hospital Display Video Player

A minimalist React application designed for continuous video playback in hospital environments. This application provides a clean, fullscreen interface for displaying informational or educational content on hospital displays.

## 🚀 Features

- **Fullscreen Video Display**: Automatically fills the entire screen for optimal visibility
- **Auto-play Functionality**: Starts playing immediately upon page load
- **Continuous Playback**: Videos loop seamlessly for uninterrupted display
- **Responsive Design**: Adapts to any screen size or orientation
- **Browser Compatible**: Implements standard muting for autoplay compliance
- **Clean Interface**: No distracting elements or controls

## 📋 Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd hospital-display
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## 🔧 Configuration

### Changing the Video

To change the displayed video, modify the `videoId` in `src/components/HospitalDisplay.js`:

```javascript
const videoId = "YOUR_NEW_VIDEO_ID";
```

The video ID can be found in YouTube URLs after `v=` (e.g., `youtube.com/watch?v=D8-Zus1IAvk` → `D8-Zus1IAvk`)

## 🎨 Styling

This project uses Tailwind CSS for styling. The main styling configurations can be found in:
- `src/index.css` - Main stylesheet with Tailwind directives
- `tailwind.config.js` - Tailwind configuration

## 📁 Project Structure

```
hospital-display/
├── src/
│   ├── components/
│   │   └── HospitalDisplay.js
│   ├── App.js
│   ├── index.css
│   └── index.js
├── package.json
└── tailwind.config.js
```

## 🚀 Deployment

This application is designed to be deployed on platforms like:
- Netlify
- Vercel
- GitHub Pages

For deployment, build the project using:
```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🛟 Support

For support, please contact [Your Contact Information]

## 🙏 Acknowledgments

- React.js team for the framework
- Tailwind CSS for the styling utilities
- YouTube for video hosting capabilities
