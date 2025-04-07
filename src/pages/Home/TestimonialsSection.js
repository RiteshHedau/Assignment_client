import React from 'react';

const testimonials = [
  { quote: 'Great platform!', author: 'Rohan' },
  { quote: 'Very flexible & clear.', author: 'Priya' },
  { quote: 'Got a job through this!', author: 'Amit' }
];

const TestimonialsSection = () => {
  return (
    <div className="bg-gray-100 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">Testimonials</h2>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <p className="italic text-lg text-gray-700 mb-4">"{testimonial.quote}"</p>
            <p className="font-semibold text-blue-700">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;