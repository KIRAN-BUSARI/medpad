import React from 'react';

function Appointments() {
return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-teal-600 mb-8">Book an Appointment</h1>
    <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Schedule Your Visit</h2>
        <form className="space-y-4">
            <div>
            <label htmlFor="doctor" className="block text-gray-700 mb-2">Select Doctor</label>
            <select
                id="doctor"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
            >
                <option>Choose a doctor</option>
                <option>Dr. Smith - Cardiologist</option>
                <option>Dr. Johnson - Pediatrician</option>
            </select>
            </div>
            <div>
            <label htmlFor="date" className="block text-gray-700 mb-2">Preferred Date</label>
            <input
                type="date"
                id="date"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
            />
            </div>
            <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
            Book Appointment
            </button>
        </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Your Upcoming Appointments</h2>
        <div className="space-y-4">
            <p className="text-gray-600">No upcoming appointments</p>
        </div>
        </div>
    </div>
    </div>
);
}

export default Appointments;

