import React, { useState, useEffect } from 'react'
import EditorPreview from '../components/RichTextEditor'
import { createProject } from '../services/projectService'
import { getAllUsers } from '../services/userService'

const CreateProject = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState("")
  const [role, setRole] = useState("")
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers()

        console.log("Users API:", res) // check this

        setUsers(res.data || res)
      } catch (err) {
        console.log("Error fetching users", err)
      }
    }

    fetchUsers()
  }, [])

  const handleCreateProject = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    if (!title || !desc || !selectedUser || !role) {
      alert("Please fill all fields")
      setLoading(false)
      return
    }
    try {
      const projectData = {
        title,
        desc,
        users: [
          {
            userId: selectedUser,
            role: role
          }
        ]
      }
      const response = await createProject(projectData)
      console.log("Project created", response)
      alert("Project created!")
      setTitle("")
      setDesc("")
      setSelectedUser("")
      setRole("")
    } catch (error) {
      console.log("Error creating project", error)
      setError(error.response?.data?.message || 'Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        .cp-root {
          min-height: 100vh;
          background: #f0f4ff;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 48px 16px;
          position: relative;
          overflow-x: hidden;
        }

        .cp-root::before {
          content: '';
          position: fixed;
          top: -120px; left: -120px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(0,45,116,0.10) 0%, transparent 70%);
          pointer-events: none;
        }

        .cp-root::after {
          content: '';
          position: fixed;
          bottom: -100px; right: -80px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(22,145,253,0.09) 0%, transparent 70%);
          pointer-events: none;
        }

        .cp-wrapper {
          width: 100%;
          max-width: 680px;
          animation: fadeUp 0.45s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,45,116,0.07);
          border: 1px solid rgba(0,45,116,0.13);
          color: #002d74;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 13px;
          border-radius: 100px;
          margin-bottom: 14px;
        }

        .cp-eyebrow-dot {
          width: 6px; height: 6px;
          background: #ebab0c;
          border-radius: 50%;
          animation: pulse 2s ease infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.5); }
        }

        .cp-title {
          font-size: 28px;
          font-weight: 800;
          color: #001a4d;
          margin: 0 0 6px;
        }

        .cp-subtitle {
          color: #6b7fa3;
          font-size: 14px;
          font-weight: 400;
          margin: 0 0 32px;
        }

        .cp-card {
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid rgba(0,45,116,0.09);
          box-shadow: 0 4px 6px rgba(0,45,116,0.04), 0 20px 60px rgba(0,45,116,0.08);
          padding: 40px;
          position: relative;
          overflow: hidden;
        }

        .cp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #002d74, #1691fd, #ebab0c);
        }

        .cp-field {
          margin-bottom: 26px;
          animation: fadeUp 0.4s ease both;
        }
        .cp-field:nth-child(1) { animation-delay: 0.05s; }
        .cp-field:nth-child(2) { animation-delay: 0.10s; }
        .cp-field:nth-child(3) { animation-delay: 0.15s; }

        .cp-label {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 12px;
          font-weight: 600;
          color: #002d74;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          margin-bottom: 9px;
        }

        .cp-step {
          width: 22px; height: 22px;
          background: #002d74;
          color: white;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cp-input {
          width: 100%;
          padding: 13px 16px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          background: #fafbff;
          font-size: 14px;
          color: #001a4d;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .cp-input::placeholder { color: #b0bcd4; }

        .cp-input:focus {
          border-color: #002d74;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(0,45,116,0.07);
        }

        .cp-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23002d74' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          cursor: pointer;
        }

        .cp-editor-wrap {
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          overflow: hidden;
          background: #fafbff;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .cp-editor-wrap:focus-within {
          border-color: #002d74;
          box-shadow: 0 0 0 4px rgba(0,45,116,0.07);
        }

        .cp-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
          margin: 28px 0;
        }

        .cp-error {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
          padding: 11px 15px;
          background: #fff5f5;
          border: 1px solid #fecaca;
          border-radius: 10px;
          color: #c0392b;
          font-size: 13px;
        }

        .cp-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          align-items: center;
        }

        .cp-btn-cancel {
          padding: 12px 22px;
          border-radius: 12px;
          border: 1.5px solid #dde3ef;
          background: transparent;
          color: #6b7fa3;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cp-btn-cancel:hover {
          background: #f0f4ff;
          border-color: #b0bcd4;
          color: #002d74;
        }

        .cp-btn-submit {
          position: relative;
          padding: 12px 30px;
          border-radius: 12px;
          border: none;
          background: #002d74;
          color: white;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.03em;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cp-btn-submit:hover:not(:disabled) {
          background: #001a4d;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,45,116,0.3);
        }

        .cp-btn-submit:active:not(:disabled) { transform: translateY(0); }

        .cp-btn-submit:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .cp-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .cp-btn-arrow {
          transition: transform 0.2s ease;
          font-size: 15px;
        }

        .cp-btn-submit:hover .cp-btn-arrow { transform: translateX(3px); }
      `}</style>

      <div className="cp-root">
        <div className="cp-wrapper">

          {/* Header */}
          <div className="cp-eyebrow">
            <span className="cp-eyebrow-dot" />
            New Project
          </div>
          <h1 className="cp-title">Create a Project</h1>
          <p className="cp-subtitle">Fill in the details below to get your project started.</p>

          {/* Card */}
          <div className="cp-card">
            <form onSubmit={handleCreateProject}>

              <div className="cp-field">
                <label className="cp-label">
                  <span className="cp-step">1</span>
                  Project Name
                </label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Customer Portal Redesign"
                  className="cp-input"
                />
              </div>

              <div className="cp-field">
                <label className="cp-label">
                  <span className="cp-step">2</span>
                  Description
                </label>
                <div className="cp-editor-wrap">
                  <EditorPreview value={desc} onChange={setDesc} />
                </div>
              </div>
              <div className="cp-field">
                <label className="cp-label">
                  <span className="cp-step">3</span>
                  Select User
                </label>

                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="cp-input cp-select"
                >
                  <option value="">Select user</option>

                  {users.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.name || u.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="cp-field">
                <label className="cp-label">
                  <span className="cp-step">4</span>
                  Assign Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="cp-input cp-select"
                >
                  <option value="">Select a role to add</option>
                  <option value="Developer">👨‍💻 Developer</option>
                  <option value="Tester">🧪 Tester</option>
                  <option value="Admin">🛡️ Admin</option>
                </select>
              </div>

              <div className="cp-divider" />

              {error && (
                <div className="cp-error">
                  <span>⚠️</span> {error}
                </div>
              )}

              <div className="cp-actions">
                <button type="button" className="cp-btn-cancel">Cancel</button>
                <button type="submit" disabled={loading} className="cp-btn-submit">
                  {loading ? (
                    <><span className="cp-spinner" /> Creating...</>
                  ) : (
                    <>Create Project <span className="cp-btn-arrow">→</span></>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default CreateProject