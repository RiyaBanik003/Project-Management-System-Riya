import React, {useState} from 'react'
import EditorPreview from '../components/RichTextEditor'
import { createProject } from '../services/projectService' 
const CreateProject = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc]= useState('')
  const [user, setUser]= useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const handleCreateProject = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    if (!title || !desc || !user) {
      alert("Please fill all fields");
      return;
    }
    try {
      const projectData = {
        title: title,
        desc: desc,
        users: [user],
      };
      const response = await createProject(projectData); 
      console.log("Project created", response);
      alert("project created");
      setTitle("");
      setDesc("");
      setUser("");
    } catch (error) {
      console.log("Error creating project", error)
      setError(error.response?.data?.message || 'Failed to create project')
      alert("Failed to create project")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 p-3 ">
      <div className="max-w-4xl mx-auto ">

        <h1 className="text-2xl font-bold text-[#002d74] ">
          Project Details
        </h1>
        <p className="mb-8 text-[#002d74]">
          Fill in the project information below
        </p>


        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleCreateProject}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#002d74] mb-2">
                  Project Name
                </label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter project name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-100 focus:border-[#002d74] outline-none transition-all"
                />
              </div>

          {/* Rich Text Editor */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#002d74] mb-2">
                  Description
                </label>
                <EditorPreview value={desc} onChange={setDesc} />
              </div>

         
          <div className="mb-8">
            <label className="block text-sm font-semibold text-[#002d74] mb-2">
              Select Users to add
            </label>
            <select
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-100 focus:border-[#002d74] outline-none transition-all bg-white"
            >
              <option value="">Select a user</option>
              <option value="Developer">Developer</option>
              <option value="Tester">Tester</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
          {/* Buttons */}
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-lg bg-[#002d74] text-white font-medium hover:bg-[#002359] transition-all shadow-sm hover:shadow cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProject