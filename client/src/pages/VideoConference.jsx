import { useState, useEffect, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../store/atoms/auth';
import axiosInstance from '../Helper/axiosInstance';

function VideoConference() {
  const user = useRecoilValue(authState);
  const [doctors, setDoctors] = useState([]);
  const [conferences, setConferences] = useState([]);
  const [mrs, setMrs] = useState([]);
  const [loading, setLoading] = useState({
    doctors: false,
    conferences: false,
    scheduling: false,
    mrs: false
  });
  const [error, setError] = useState({
    doctors: '',
    conferences: '',
    scheduling: '',
    mrs: ''
  });

  const fetchDoctors = useCallback(async () => {
    setLoading(prev => ({ ...prev, doctors: true }));
    try {
      const response = await axiosInstance.get('/users/all');
      const doctorsList = response.data.filter(user => user.role === 'DOCTOR');
      setDoctors(doctorsList);
      setError(prev => ({ ...prev, doctors: '' }));
    } catch (err) {
      setError(prev => ({
        ...prev,
        doctors: err.response?.data?.message || 'Failed to fetch doctors'
      }));
    } finally {
      setLoading(prev => ({ ...prev, doctors: false }));
    }
  }, []);

  const fetchConferences = useCallback(async () => {
    setLoading(prev => ({ ...prev, conferences: true }));
    try {
      const response = await axiosInstance.get('/videoConferences');
      setConferences(response.data);
      setError(prev => ({ ...prev, conferences: '' }));
    } catch (err) {
      setError(prev => ({
        ...prev,
        conferences: err.response?.data?.message || 'Failed to fetch conferences'
      }));
    } finally {
      setLoading(prev => ({ ...prev, conferences: false }));
    }
  }, []);

  const fetchMRs = useCallback(async () => {
    setLoading(prev => ({ ...prev, mrs: true }));
    try {
      const response = await axiosInstance.get('/users/all');
      const mrsList = response.data.filter(user => user.role === 'MR');
      setMrs(mrsList);
      setError(prev => ({ ...prev, mrs: '' }));
    } catch (err) {
      setError(prev => ({
        ...prev,
        mrs: err.response?.data?.message || 'Failed to fetch MRs'
      }));
    } finally {
      setLoading(prev => ({ ...prev, mrs: false }));
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      if (mounted) {
        await Promise.all([fetchDoctors(), fetchConferences(), fetchMRs()]);
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [fetchDoctors, fetchConferences, fetchMRs]);

  const handleSchedule = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, scheduling: true }));
    setError(prev => ({ ...prev, scheduling: '' }));

    const formData = new FormData(e.target);
    const doctorId = formData.get('doctorId');
    const mrId = formData.get('mrId');
    const scheduledAt = formData.get('scheduledAt');

    // Form validation
    if (!doctorId || !scheduledAt || !mrId) {
      setError(prev => ({
        ...prev,
        scheduling: 'Please fill all required fields'
      }));
      setLoading(prev => ({ ...prev, scheduling: false }));
      return;
    }

    try {
      const meetingUrl = `https://meet.jit.si/${Date.now()}`;
      const conferenceData = {
        mrId,
        doctorId,
        meetingUrl,
        scheduledAt
      };

      await axiosInstance.post('/videoConferences', conferenceData);
      await fetchConferences();
      e.target.reset();
    } catch (err) {
      setError(prev => ({
        ...prev,
        scheduling: err.response?.data?.message || 'Failed to schedule conference'
      }));
    } finally {
      setLoading(prev => ({ ...prev, scheduling: false }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Video Conferences</h1>

      {/* Schedule Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Schedule New Conference</h2>
        <form onSubmit={handleSchedule} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select MR</label>
            <select
              name="mrId"
              className="w-full p-2 border rounded"
              required
              disabled={loading.mrs}
            >
              <option value="">Choose an MR...</option>
              {mrs.map(mr => (
                <option key={mr._id} value={mr._id}>
                  {mr.username}
                </option>
              ))}
            </select>
            {error.mrs && <p className="text-red-500 text-sm mt-1">{error.mrs}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Select Doctor</label>
            <select
              name="doctorId"
              className="w-full p-2 border rounded"
              required
              disabled={loading.doctors}
            >
              <option value="">Choose a doctor...</option>
              {doctors.map(doctor => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.username}
                </option>
              ))}
            </select>
            {error.doctors && <p className="text-red-500 text-sm mt-1">{error.doctors}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date & Time</label>
            <input
              type="datetime-local"
              name="scheduledAt"
              className="w-full p-2 border rounded"
              required
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <button
            type="submit"
            disabled={loading.scheduling || loading.doctors}
            className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 disabled:opacity-50"
          >
            {loading.scheduling ? 'Scheduling...' : 'Schedule Conference'}
          </button>

          {error.scheduling && <p className="text-red-500 text-sm">{error.scheduling}</p>}
        </form>
      </div>

      {/* Conferences List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Conferences</h2>
        {loading.conferences ? (
          <p>Loading conferences...</p>
        ) : error.conferences ? (
          <p className="text-red-500">{error.conferences}</p>
        ) : (
          <div className="space-y-4">
            {conferences.length === 0 ? (
              <p>No conferences scheduled</p>
            ) : (
              conferences.map(conf => (
                <div key={conf._id} className="border p-4 rounded">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{conf.doctorId?.username}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(conf.scheduledAt).toLocaleString()}
                      </p>
                    </div>
                    <a
                      href={conf.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-teal-100 text-teal-700 px-4 py-2 rounded hover:bg-teal-200"
                    >
                      Join Meeting
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoConference;