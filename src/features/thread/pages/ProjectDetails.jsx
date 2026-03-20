import React, { useState } from 'react'
import CreateThread from './CreateThread'

const ProjectDetails = ({ projectId }) => {
  const [showCreateThread, setShowCreateThread] = useState(false)
  const [threads, setThreads] = useState([])

  const handleThreadCreated = (newThread) => {
    setThreads([...threads, newThread])
  }

  // Priority badge colors
  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 1: return 'bg-green-100 text-green-800'
      case 2: return 'bg-yellow-100 text-yellow-800'
      case 3: return 'bg-orange-100 text-orange-800'
      case 4: return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      {/* Project header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#002d74]">Project Details</h1>
        <button
          onClick={() => setShowCreateThread(true)}
          className="px-4 py-2 bg-[#002d74] text-white rounded-lg hover:bg-[#001a4d] transition flex items-center gap-2"
        >
          <span>+</span>
          Create New Thread
        </button>
      </div>

      {/* Threads List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Threads</h2>
        
        {threads.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No threads created yet</p>
        ) : (
          threads.map((thread) => (
            <div key={thread.id} className="bg-white p-5 rounded-lg shadow border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-[#002d74]">{thread.topic}</h3>
                  <p className="text-gray-600 mt-1">{thread.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityBadge(thread.priority)}`}>
                  Priority {thread.priority}
                </span>
              </div>
              
              <div className="mt-4 flex gap-4 text-sm text-gray-500">
                <span>Assigned to: User ID {thread.assignUserId}</span>
                <span>Due: {new Date(thread.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Thread Modal */}
      {showCreateThread && (
        <CreateThread
          projectId={projectId}
          onThreadCreated={handleThreadCreated}
          onClose={() => setShowCreateThread(false)}
        />
      )}
    </div>
  )
}

export default ProjectDetails