
function Home() {
    return (
        <div className="flex flex-col gap-16 pb-16">
            {/* Hero Section */}
            <section className="bg-teal-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Your Health, Our Priority
                        </h1>
                        <p className="text-xl mb-8">
                            Experience world-class healthcare services with our team of expert doctors and modern facilities.
                        </p>
                        <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors">
                            Book Appointment
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 border rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">Expert Doctors</h3>
                        <p className="text-gray-600">Access to highly qualified medical professionals across all specialties.</p>
                    </div>
                    <div className="p-6 border rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">24/7 Care</h3>
                        <p className="text-gray-600">Round-the-clock medical support for emergencies and consultations.</p>
                    </div>
                    <div className="p-6 border rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">Modern Facilities</h3>
                        <p className="text-gray-600">State-of-the-art medical equipment and comfortable facilities.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">What Our Patients Say</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <p className="text-gray-600 mb-4">"Outstanding service and care. The staff was incredibly professional and caring throughout my treatment."</p>
                            <p className="font-semibold">- Sarah Johnson</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <p className="text-gray-600 mb-4">"Excellent medical facility with state-of-the-art equipment. The doctors are very knowledgeable and attentive."</p>
                            <p className="font-semibold">- Michael Chen</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4">
                <div className="bg-teal-50 rounded-2xl p-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-gray-600 mb-6">Schedule your appointment today and take the first step towards better health.</p>
                    <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                        Schedule Now
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Home;

