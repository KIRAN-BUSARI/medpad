import { useState, useEffect } from 'react';
import axiosInstance from '../Helper/axiosInstance';

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/users/all');
                const doctorsList = response.data.filter(user => user.role === 'DOCTOR');
                setDoctors(doctorsList);
                console.log(doctorsList);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch doctors');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">Loading doctors...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-red-500 text-center">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-teal-600 mb-8">Our Medical Team</h1>
            <div className="grid md:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                    <div key={doctor._id} className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="w-24 h-24 mx-auto mb-4">
                            <img
                                src={doctor.profileImage || '/default-avatar.png'}
                                alt={doctor.username}
                                className="w-full h-full rounded-full object-cover"
                                onError={(e) => {
                                    e.target.src = '/default-avatar.png';
                                }}
                            />
                        </div>
                        <h2 className="text-xl font-semibold text-center mb-2">
                            {doctor.username}
                        </h2>
                        <p className="text-teal-600 text-center mb-1">
                            {doctor.specialty || 'Specialist'}
                        </p>
                        <p className="text-gray-600 text-center">
                            {doctor.experience || 'Medical Professional'}
                        </p>
                        <button className="w-full mt-4 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
                            Book Appointment
                        </button>
                    </div>
                ))}
            </div>

            {doctors.length === 0 && !loading && !error && (
                <div className="text-center text-gray-500">
                    No doctors available at the moment.
                </div>
            )}
        </div>
    );
}

export default Doctors;