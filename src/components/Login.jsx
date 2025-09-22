import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

export function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [childName, setChildName] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser } = useAuth()
  
  const from = location.state?.from?.pathname || '/dashboard'

  // Check if user is already signed in
  useEffect(() => {
    console.log('Auth state check - currentUser:', currentUser)
    if (currentUser) {
      console.log('User is already signed in:', currentUser)
      const childNameFromStorage = localStorage.getItem('childName')
      console.log('Child name from storage:', childNameFromStorage)
      if (childNameFromStorage) {
        console.log('Redirecting to dashboard from auth state check...')
        console.log('Target route:', from)
        navigate(from, { replace: true })
      }
    }
  }, [currentUser, navigate, from])

  // No redirect result handling needed for popup method

  // Function to save user details (simplified for now)
  const saveUserDetails = async (user, childName) => {
    try {
      console.log("User data would be saved:", {
        parentEmail: user.email,
        childName: childName,
        displayName: user.displayName,
        createdAt: new Date().toISOString()
      })
      return true
    } catch (error) {
      console.error("Error saving user data:", error)
      return false
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      setError('')
      
      console.log('Starting Google sign-in process...')
      
      // Validate child name
      if (!childName.trim()) {
        setError('Please enter your child\'s name')
        return
      }
      
      console.log('Child name validated:', childName.trim())
      
      const provider = new GoogleAuthProvider()
      console.log('Google provider created')
      
      console.log('Calling signInWithPopup...')
      
      // Try popup method first
      const result = await signInWithPopup(auth, provider)
      console.log('Google sign-in successful:', result.user)
      
      // Save user details
      console.log('Saving user details...')
      const saveSuccess = await saveUserDetails(result.user, childName.trim())
      
      if (saveSuccess) {
        console.log('User details saved successfully')
        // Store child name in localStorage for dashboard
        localStorage.setItem('childName', childName.trim())
        
        console.log('Redirecting to dashboard...')
        console.log('Target route:', from)
        // Wait a moment for auth state to update, then redirect
        setTimeout(() => {
          console.log('Executing navigation to:', from)
          navigate(from, { replace: true })
        }, 1000)
      } else {
        setError('Failed to save user data. Please try again.')
      }
    } catch (error) {
      console.error('Google sign-in error:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      
      let errorMessage = 'Failed to sign in with Google. Please try again.'
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in was cancelled. Please try again.'
      } else if (error.code === 'auth/unauthorized-domain') {
        errorMessage = 'This domain is not authorized. Please contact support.'
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Google sign-in is not enabled. Please contact support.'
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to EduCatch
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back! Please sign in to continue.
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          
          {/* Child Name Input */}
          <div>
            <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-2">
              Child's Name
            </label>
            <input
              id="childName"
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Enter your child's name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              required
            />
          </div>
          
          <button
            onClick={handleGoogleSignIn}
            disabled={loading || !childName.trim()}
            className="btn-165 group relative w-full flex justify-center items-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                Signing in...
              </div>
            ) : (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 262">
                  <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                  <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                  <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                  <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                </svg>
                <span>Login with Google</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
