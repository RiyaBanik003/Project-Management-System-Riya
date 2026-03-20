import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, deleteProject, updateProject } from '../features/project/services/projectService';
import { ArrowLeft, Calendar, User, Tag, Users, Clock, Edit, Trash2, X, Save } from 'lucide-react';

const ViewProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: ''
  });
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await getProjectById(id);
      console.log("Project details:", response);
      
      if (response && response.success) {
        setProject(response.data);
        // Initialize edit form with project data
        setEditFormData({
          title: response.data.title || '',
          description: response.data.description || ''
        });
      } else {
        setError("Project not found");
      }
    } catch (err) {
      console.error("Error fetching project:", err);
      setError("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEditClick = () => {
    setIsEditing(true);
    setUpdateSuccess(false);
    setUpdateError('');
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditFormData({
      title: project.title || '',
      description: project.description || ''
    });
    setUpdateError('');
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    // Validate
    if (!editFormData.title.trim()) {
      setUpdateError('Project title is required');
      return;
    }

    try {
      setUpdating(true);
      setUpdateError('');
      
      const updateData = {
        title: editFormData.title.trim(),
        description: editFormData.description.trim()
      };
      
      const response = await updateProject(id, updateData);
      console.log("Update response:", response);
      
      if (response && response.success) {
        setUpdateSuccess(true);
        
        // Update the project state with new data
        setProject(prev => ({
          ...prev,
          title: editFormData.title,
          description: editFormData.description
        }));
        
        // Exit edit mode after 1.5 seconds
        setTimeout(() => {
          setIsEditing(false);
          setUpdateSuccess(false);
        }, 1500);
      } else {
        setUpdateError(response?.message || 'Failed to update project');
      }
    } catch (err) {
      console.error("Error updating project:", err);
      setUpdateError(err.response?.data?.message || 'Failed to update project');
    } finally {
      setUpdating(false);
    }
  };

  // Handle delete button click - open confirmation modal
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      setDeleteError('');
      
      const response = await deleteProject(id);
      console.log("Delete response:", response);
      
      if (response && response.success) {
        setDeleteSuccess(true);
        
        setTimeout(() => {
          setShowDeleteModal(false);
          navigate('/view-project');
        }, 2000);
      } else {
        setDeleteError(response?.message || 'Failed to delete project');
      }
    } catch (err) {
      console.error("Error deleting project:", err);
      setDeleteError(err.response?.data?.message || 'Failed to delete project');
    } finally {
      setDeleting(false);
    }
  };

  // Handle delete cancel
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeleteError('');
  };

  // Strip HTML tags from description
  const stripHtmlTags = (html) => {
    if (!html) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#002d74] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/view-project')}
            className="px-4 py-2 bg-[#002d74] text-white rounded-lg hover:bg-[#001a4d] transition"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Project not found</p>
          <button
            onClick={() => navigate('/view-project')}
            className="mt-4 px-4 py-2 bg-[#002d74] text-white rounded-lg hover:bg-[#001a4d] transition"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/view-project')}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleInputChange}
                    className="text-2xl font-bold text-[#002d74] border-b-2 border-[#002d74] focus:outline-none bg-transparent px-1"
                    placeholder="Project Title"
                    disabled={updating}
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-[#002d74]">{project.title}</h1>
                )}
                <p className="text-sm text-gray-500">Project ID: #{project.id}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveChanges}
                    disabled={updating}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={updating}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleEditClick}
                    className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600"
                    title="Edit Project"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleDeleteClick}
                    className="p-2 hover:bg-red-50 rounded-lg transition text-red-600"
                    title="Delete Project"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Update Success/Error Messages */}
      {updateSuccess && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            Project updated successfully!
          </div>
        </div>
      )}

      {updateError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            Error: {updateError}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Delete Project</h3>
              <button
                onClick={handleDeleteCancel}
                className="text-gray-500 hover:text-gray-700"
                disabled={deleting || deleteSuccess}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {deleteSuccess ? (
                <div className="text-center py-4">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Project Deleted!</h4>
                  <p className="text-gray-600">The project has been successfully deleted.</p>
                  <p className="text-sm text-gray-500 mt-2">Redirecting to projects list...</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-gray-600">
                      Are you sure you want to delete <span className="font-semibold text-gray-800">"{project.title}"</span>?
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      This action cannot be undone. All project data, including members and threads, will be permanently deleted.
                    </p>
                  </div>

                  {deleteError && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      <span className="font-semibold">Error:</span> {deleteError}
                    </div>
                  )}

                  {/* Modal Actions */}
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={handleDeleteCancel}
                      disabled={deleting}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteConfirm}
                      disabled={deleting}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {deleting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Deleting...
                        </>
                      ) : (
                        'Yes, Delete Project'
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase">Created</p>
                <p className="text-sm font-semibold text-gray-800">{formatDate(project.createdAt)}</p>
              </div>
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase">Created By</p>
                <p className="text-sm font-semibold text-gray-800">User #{project.createdBy || 'N/A'}</p>
              </div>
              <User className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase">Members</p>
                <p className="text-sm font-semibold text-gray-800">{project.members?.length || 0}</p>
              </div>
              <Users className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase">Updated</p>
                <p className="text-sm font-semibold text-gray-800">{formatDate(project.updatedAt)}</p>
              </div>
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-[#002d74] text-[#002d74]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('members')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'members'
                    ? 'border-b-2 border-[#002d74] text-[#002d74]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Team Members ({project.members?.length || 0})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002d74] focus:border-transparent transition resize-y"
                    placeholder="Enter project description..."
                    disabled={updating}
                  />
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {stripHtmlTags(project.description) || 'No description provided'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Members</h3>
                {project.members && project.members.length > 0 ? (
                  <div className="space-y-3">
                    {project.members.map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-[#002d74] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {member.userName?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{member.userName || `User #${member.userId}`}</p>
                            <p className="text-xs text-gray-500">ID: {member.userId}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {member.roleName || 'Member'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No team members assigned</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;