import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../Helper/axiosInstance';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/atoms/userState';
import {
  FaFilePdf, FaFileImage, FaFileAlt, FaFileWord, FaFileExcel,
  FaTrash, FaDownload, FaSearch, FaEye, FaArrowLeft
} from 'react-icons/fa';
import FilePreviewModal from '../components/FilePreviewModal';
import { useNavigate } from 'react-router-dom';

function Materials() {
  const user = useRecoilValue(userState);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [fileLoading, setFileLoading] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const navigate = useNavigate();

  const fetchMaterials = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/materials/fetch-materials', {
        params: { userId: user?._id }
      });

      if (response.data?.data) {
        setMaterials(response.data.data);
      }
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch materials');
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchMaterials();
    }

    return () => {
      mounted = false;
    };
  }, [fetchMaterials]);

  const handleDelete = async (materialId) => {
    if (!window.confirm('Are you sure you want to delete this material?')) return;

    setDeleteLoading(prev => ({ ...prev, [materialId]: true }));
    setError('');

    try {
      const response = await axiosInstance.delete(`/materials/${materialId}`);
      if (response.data?.success) {
        setMaterials(prev => prev.filter(material => material._id !== materialId));
        setSuccess('Material deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete material');
    } finally {
      setDeleteLoading(prev => ({ ...prev, [materialId]: false }));
    }
  };

  const getFileIcon = (fileType) => {
    if (!fileType) return <FaFileAlt className="text-gray-500 text-2xl" />;

    const types = {
      'pdf': <FaFilePdf className="text-red-500 text-2xl" />,
      'image': <FaFileImage className="text-blue-500 text-2xl" />,
      'msword': <FaFileWord className="text-blue-700 text-2xl" />,
      'excel': <FaFileExcel className="text-green-600 text-2xl" />,
      'default': <FaFileAlt className="text-gray-500 text-2xl" />
    };

    const type = Object.keys(types).find(key => fileType.includes(key));
    return types[type] || types.default;
  };

  const handleFileOpen = async (file, fileType) => {
    if (!file) return;

    setFileLoading(true);
    try {
      if (fileType?.includes('pdf')) {
        const response = await fetch(file);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPreviewFile({
          url,
          type: 'pdf',
          title: file.split('/').pop()
        });
      } else if (fileType?.includes('image')) {
        setPreviewFile({
          url: file,
          type: 'image',
          title: file.split('/').pop()
        });
      } else {
        window.open(file, '_blank');
      }
    } catch (err) {
      setError('Failed to open file: ' + err.message);
    } finally {
      setFileLoading(false);
    }
  };

  const filteredMaterials = materials.filter(material =>
    material.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedMaterials = filteredMaterials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-teal-600 hover:text-teal-700 mr-4"
        >
          <FaArrowLeft className="mr-2" />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Uploaded Materials</h1>
      </div>

      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}
      <div className="flex justify-between items-center mb-8">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center">
          {error}
        </div>
      ) : (
        <>
          {paginatedMaterials.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No materials found.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedMaterials.map((material) => (
                <div key={material._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getFileIcon(material.fileType)}
                      <h3 className="text-lg font-semibold">{material.title}</h3>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleFileOpen(material.file, material.fileType)}
                        disabled={fileLoading}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        title="View File"
                      >
                        <FaEye className="text-teal-600" />
                      </button>
                      <a
                        href={material.file}
                        download
                        className="p-2 hover:bg-gray-100 rounded-full"
                        title="Download"
                      >
                        <FaDownload className="text-teal-600" />
                      </a>
                      <button
                        onClick={() => handleDelete(material._id)}
                        disabled={deleteLoading[material._id]}
                        className={`p-2 hover:bg-gray-100 rounded-full ${deleteLoading[material._id] ? 'opacity-50' : ''
                          }`}
                        title="Delete"
                      >
                        <FaTrash className="text-red-500" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Uploaded: {new Date(material.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded ${currentPage === i + 1
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {previewFile && (
        <FilePreviewModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </div>
  );
}

export default Materials;