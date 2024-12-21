import React from 'react';

function Contact() {
return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-teal-600 mb-8">Contact Us</h1>
    <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
        <form className="space-y-4">
            <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
            <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                placeholder="Enter your name"
            />
            </div>
            <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
            <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                placeholder="Enter your email"
            />
            </div>
            <div>
            <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
            <textarea
                id="message"
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                placeholder="Your message"
            ></textarea>
            </div>
            <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
            Send Message
            </button>
        </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="space-y-4">
            <div>
            <h3 className="font-semibold">Address</h3>
            <p className="text-gray-600">123 Medical Center Dr, Healthcare City, HC 12345</p>
            </div>
            <div>
            <h3 className="font-semibold">Phone</h3>
            <p className="text-gray-600">(555) 123-4567</p>
            </div>
            <div>
            <h3 className="font-semibold">Email</h3>
            <p className="text-gray-600">info@medicalcenter.com</p>
            </div>
            <div>
            <h3 className="font-semibold">Working Hours</h3>
            <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
            <p className="text-gray-600">Saturday: 8:00 AM - 2:00 PM</p>
            </div>
        </div>
        </div>
    </div>
    </div>
);
}

export default Contact;

