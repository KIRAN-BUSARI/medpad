import React from 'react';

function Services() {
return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-teal-600 mb-8">Our Services</h1>
    <div className="grid md:grid-cols-3 gap-6">
        {[
        {
            title: 'General Checkup',
            description: 'Comprehensive health examination and consultation.',
            icon: '🏥'
        },
        {
            title: 'Specialized Care',
            description: 'Expert care in various medical specialties.',
            icon: '👨‍⚕️'
        },
        {
            title: 'Emergency Services',
            description: '24/7 emergency medical care and support.',
            icon: '🚑'
        },
        {
            title: 'Laboratory Tests',
            description: 'Full range of clinical laboratory services.',
            icon: '🔬'
        },
        {
            title: 'Preventive Care',
            description: 'Preventive healthcare and wellness programs.',
            icon: '💪'
        },
        {
            title: 'Telemedicine',
            description: 'Virtual consultations and follow-ups.',
            icon: '💻'
        }
        ].map((service, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-600">{service.description}</p>
        </div>
        ))}
    </div>
    </div>
);
}

export default Services;

