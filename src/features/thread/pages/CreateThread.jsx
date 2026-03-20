import React, { useState, useEffect } from 'react'
import { createThread } from '../services/threadService'
import { getAllUsers } from '../services/userService'

const CreateThread = ({ projectId, onThreadCreated, onClose }) => {
  const [topic, setTopic] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(3)
  const [assignUserId, setAssignUserId] = useState('')
  const [dueDate, setDueDate] = useState('')
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers()
        console.log("Users API:", res)
        
        if (res && res.success && Array.isArray(res.data)) {
          setUsers(res.data)
        } else {
          setUsers([])
        }
      } catch (err) {
        console.log("Error fetching users", err)
        setUsers([])
      }
    }

    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!topic.trim()) {
      alert("Please enter a topic")
      return
    }
    
    if (!description.trim()) {
      alert("Please enter a description")
      return
    }
    
    if (!assignUserId) {
      alert("Please assign a user")
      return
    }
    
    if (!dueDate) {
      alert("Please select a due date")
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const threadData = {
        topic: topic.trim(),
        description: description.trim(),
        priority: parseInt(priority),
        assignUserId: parseInt(assignUserId),
        dueDate: dueDate
      }
      
      console.log("Creating thread with data:", threadData)
      
      const response = await createThread(projectId, threadData)
      console.log("Thread created:", response)
      
      alert("Thread created successfully!")
      
      // Reset form
      setTopic('')
      setDescription('')
      setPriority(3)
      setAssignUserId('')
      setDueDate('')
      
      // Callback to parent component
      if (onThreadCreated) {
        onThreadCreated(response.data)
      }
      
      // Close modal if provided
      if (onClose) {
        onClose()
      }
      
    } catch (error) {
      console.log("Error creating thread", error)
      setError(error.response?.data?.message || 'Failed to create thread')
    } finally {
      setLoading(false)
    }
  }

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0]

  // Priority colors and labels
  const priorityOptions = [
    { value: 1, label: 'Low', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    { value: 2, label: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
    { value: 3, label: 'High', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
    { value: 4, label: 'Critical', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' }
  ]

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      {/* Modal - Stop propagation to prevent closing when clicking inside */}
      <div 
        className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#002d74]">Create New Thread</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-semibold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Topic */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#002d74]">
              Topic <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Payment API bug, UI issue, Database error"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002d74] focus:border-transparent transition"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#002d74]">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002d74] focus:border-transparent transition resize-y"
              required
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#002d74]">
              Priority <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {priorityOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => setPriority(option.value)}
                  className={`
                    px-4 py-3 text-center border-2 rounded-lg cursor-pointer transition-all
                    ${priority === option.value 
                      ? `${option.bg} ${option.color} border-[#002d74] font-semibold` 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <span className={priority === option.value ? option.color : ''}>
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Assign User */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#002d74]">
              Assign To <span className="text-red-500">*</span>
            </label>
            <select
              value={assignUserId}
              onChange={(e) => setAssignUserId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002d74] focus:border-transparent transition bg-white"
              required
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName} ({user.email})
                </option>
              ))}
            </select>
            
            {/* Show message if no users */}
            {users.length === 0 && (
              <p className="text-sm text-yellow-600 mt-1">
                ⚠️ Loading users...
              </p>
            )}
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#002d74]">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={today}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002d74] focus:border-transparent transition"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <span className="font-semibold">⚠️ Error: </span>
              {error}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-3 bg-[#002d74] text-white rounded-lg font-semibold hover:bg-[#001a4d] transition disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Thread'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default CreateThread