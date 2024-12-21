import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

function FilePreviewModal({ file, onClose }) {
  useEffect(() => {
    return () => {
      // Cleanup object URL when modal closes
      if (file?.url && file?.type === 'pdf') {
        URL.revokeObjectURL(file.url);
      }
    };
  }, [file]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg w-full h-[90vh] max-w-6xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{file.title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        <div className="h-[calc(90vh-4rem)]">
          {file.type === 'pdf' ? (
            <embed
              src={`${file.url}#toolbar=0&navpanes=0`}
              type="application/pdf"
              width="100%"
              height="100%"
              className="rounded-b-lg"
            />
          ) : file.type === 'image' ? (
            <img
              src={file.url}
              alt={file.title}
              className="max-w-full h-auto mx-auto"
            />
          ) : (
            <div className="text-center py-8">
              <p>File type not supported for preview</p>
              <a
                href={file.url}
                download
                className="mt-4 inline-block bg-teal-600 text-white px-4 py-2 rounded"
              >
                Download File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

FilePreviewModal.propTypes = {
  file: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FilePreviewModal;