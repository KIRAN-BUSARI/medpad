import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Helper/axiosInstance';

function UploadBrouchers() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // File validation
  const validateFile = (file) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Only JPEG, PNG and PDF files are allowed');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!title.trim()) {
        throw new Error('Title is required');
      }

      if (!file) {
        throw new Error('Please select a file');
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);

      const response = await axiosInstance.post('/materials/upload-material', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('File uploaded successfully!');
      setTitle('');
      setFile(null);
      // Reset file input
      e.target.reset();

      // Optional: Redirect after success
      setTimeout(() => navigate('/materials'), 2000);

    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error uploading file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Upload Marketing Materials</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter material title"
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File Upload
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Accepted formats: PDF, PNG, JPEG (max 5MB)
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 text-green-500 p-3 rounded">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded font-medium text-white ${loading
              ? 'bg-teal-400 cursor-not-allowed'
              : 'bg-teal-600 hover:bg-teal-700'
              }`}
          >
            {loading ? 'Uploading...' : 'Upload Material'}
          </button>
        </form>
      </div>

      {/* Instructions Card */}
      <div className="mt-8 bg-teal-50 p-4 rounded-lg">
        <h3 className="font-medium text-teal-800 mb-2">Instructions:</h3>
        <ul className="list-disc list-inside text-sm text-teal-700 space-y-1">
          <li>Provide a clear and descriptive title for the material</li>
          <li>Files must be in PDF, PNG, or JPEG format</li>
          <li>Maximum file size is 5MB</li>
          <li>Ensure the material is relevant and appropriate</li>
        </ul>
      </div>
    </div>
  );
}

export default UploadBrouchers;