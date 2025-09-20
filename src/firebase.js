import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBE0avQNvYmpJx6FHSCd2BxuYLvkAxSuo",
  authDomain: "educatch-app.firebaseapp.com",
  projectId: "educatch-app",
  storageBucket: "educatch-app.firebasestorage.app",
  messagingSenderId: "36767394482",
  appId: "1:36767394482:web:0f6aaaa2d2140fa1e937ab",
  measurementId: "G-T0W1ESPZEQ"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export default app
