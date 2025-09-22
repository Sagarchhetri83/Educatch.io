import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function Dashboard() {
  const { currentUser, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      localStorage.removeItem('childName')
      navigate('/', { replace: true })
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const childName = localStorage.getItem('childName') || currentUser?.displayName || 'User'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                EduCatch
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {childName}!</span>
              <button
                onClick={handleSignOut}
                className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your Learning Journey!</h2>
          <p className="text-xl text-gray-600">Ready to start your educational adventure?</p>
        </div>

        {/* Learning Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Reading & Writing</h3>
            <p className="text-gray-600">Learn letters, words, and stories through interactive games.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🔢</div>
            <h3 className="text-xl font-semibold mb-2">Math & Numbers</h3>
            <p className="text-gray-600">Master counting, addition, and basic math concepts.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🔬</div>
            <h3 className="text-xl font-semibold mb-2">Science & Discovery</h3>
            <p className="text-gray-600">Explore the world through fun experiments and activities.</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-gradient-to-r from-rose-400 to-pink-500 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Your Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">0</div>
              <div className="text-rose-100">Lessons Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">0</div>
              <div className="text-rose-100">Days Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">0</div>
              <div className="text-rose-100">Achievements</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
