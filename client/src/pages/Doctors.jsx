import React from 'react';

function Doctors() {
return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-teal-600 mb-8">Our Medical Team</h1>
    <div className="grid md:grid-cols-3 gap-6">
        {[
        {
            name: 'Dr. Sarah Smith',
            specialty: 'Cardiologist',
            experience: '15 years experience'
        },
        {
            name: 'Dr. John Johnson',
            specialty: 'Pediatrician',
            experience: '12 years experience'
        },
        {
            name: 'Dr. Mary Williams',
            specialty: 'Neurologist',
            experience: '10 years experience'
        }
        ].map((doctor, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-center mb-2">{doctor.name}</h2>
            <p className="text-teal-600 text-center mb-1">{doctor.specialty}</p>
            <p className="text-gray-600 text-center">{doctor.experience}</p>
            <button className="w-full mt-4 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
            Book Appointment
            </button>
        </div>
        ))}
    </div>
    </div>
);
}

export default Doctors;

