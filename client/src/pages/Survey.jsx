import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../store/atoms/auth';
import axiosInstance from '../Helper/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Survey = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    review: '',
    sentiment: '',
    productId: ''
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const auth = useRecoilValue(authState);
  const [surveyList, setSurveyList] = useState([]);
  const [sentimentStats, setSentimentStats] = useState({});

  console.log(auth);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products/all');

        setProducts(response.data.data.products || []);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await axiosInstance.get('/surveys/get-surveys');
      setSurveyList(response.data.data.surveys);
      setSentimentStats(response.data.data.sentimentStats);
    } catch (err) {
      setError('Failed to fetch surveys');
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchSurveys();
    }
  }, [auth.isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.productId) {
      setError('Please select a product');
      return false;
    }
    if (!formData.review.trim()) {
      setError('Please enter a review');
      return false;
    }
    if (!formData.sentiment) {
      setError('Please select a sentiment');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      await axiosInstance.post(`/surveys/submit-survey?productId=${formData.productId}`, {
        review: formData.review,
        sentiment: formData.sentiment
      }
      );
      setSuccess('Survey submitted successfully!');
      setFormData({ review: '', sentiment: '', productId: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit survey');
    } finally {
      setLoading(false);
    }
  };

  if (productsLoading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (!auth.isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            Please sign in to access this page
          </div>
          <button
            onClick={() => navigate('/signin')}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (auth.role !== 'DOCTOR') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          This page is only accessible to doctors.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Product Survey</h1>

      {/* Sentiment Statistics */}
      {Object.keys(sentimentStats).length > 0 && (
        <div className="mb-8 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Sentiment Analysis</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">
                {sentimentStats.Positive || 0}
              </div>
              <div className="text-sm text-green-700">Positive</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded">
              <div className="text-2xl font-bold text-yellow-600">
                {sentimentStats.Neutral || 0}
              </div>
              <div className="text-sm text-yellow-700">Neutral</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded">
              <div className="text-2xl font-bold text-red-600">
                {sentimentStats.Negative || 0}
              </div>
              <div className="text-sm text-red-700">Negative</div>
            </div>
          </div>
        </div>
      )}

      {/* Survey Form */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Select Product</label>
          <select
            name="productId"
            value={formData.productId}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            disabled={productsLoading}
          >
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Your Review</label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="4"
          />
        </div>

        <div>
          <label className="block mb-2">Sentiment</label>
          <select
            name="sentiment"
            value={formData.sentiment}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select sentiment</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
            }`}
        >
          {loading ? 'Submitting...' : 'Submit Survey'}
        </button>
      </form>

      {/* Survey List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Surveys</h2>
        <div className="space-y-4">
          {surveyList.map((survey) => (
            <div key={survey._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    {survey.productReviewed?.name}
                  </h3>
                  <p className="text-gray-600 mt-1">{survey.review}</p>
                </div>
                <span className={`px-3 py-1 rounded text-sm ${survey.sentiment === 'Positive' ? 'bg-green-100 text-green-800' :
                  survey.sentiment === 'Negative' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                  {survey.sentiment}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                By {survey.doctorId?.username} • {new Date(survey.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Survey;