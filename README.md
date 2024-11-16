# Joex - Journal extension app

Joex is a Progressive Web Application (PWA) designed to help users quickly capture and manage their thoughts and notes. It features a simple, intuitive interface built with Ionic React and provides seamless functionality across different platforms.

## 🌟 Features

- Quick log capture with a floating action button
- Swipe gestures for log management
- Two-state system: Captured & Migrated notes
- Platform-specific UI adaptations (iOS/Material Design)
- Offline-first with IndexedDB storage
- Native app badge notifications
- Full PWA support with installability
- Dark mode support

## 🔧 Technology Stack

- React 18
- Ionic Framework 8
- TypeScript
- Vite
- Capacitor 6
- Dexie.js (IndexedDB wrapper)
- PWA (Progressive Web App)

## 🏗️ Project Structure

The project follows a modular architecture with:

- Components: Reusable UI elements
- Services: Singleton pattern for business logic
- Hooks: Custom React hooks for state management
- Utils: Helper functions
- Types: TypeScript type definitions

## 💡 Inspiration

This PWA version was inspired by my previous [iOS-native implementation](https://github.com/sampittko/joex-ios-swift) built with SwiftUI. While the iOS version served as a great foundation, this PWA version aims to provide a cross-platform solution that's accessible to all users, regardless of their device.

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/sampittko/joex-pwa-ionic.git
cd joex-pwa-ionic
```
2. Install dependencies:

```bash
npm install
```

3. Run the app:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## 📱 Platform Support

- iOS (Safari)
- Android (Chrome)
- Desktop (Chrome, Firefox, Safari, Edge)

## 🔒 Privacy

Joex respects your privacy by storing all data locally on your device using IndexedDB. No data is sent to external servers.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 Author

Samuel Pitonak - [@sampittko](https://github.com/sampittko)

## 🙏 Acknowledgments

- [Ionic Framework](https://ionicframework.com/)
- [Capacitor](https://capacitorjs.com/)
- [Dexie.js](https://dexie.org/)