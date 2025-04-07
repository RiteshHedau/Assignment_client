import React from 'react';

const features = [
  { icon: '🕓', title: 'Flexible Learning' },
  { icon: '👨‍🏫', title: 'Expert Instructors' },
  { icon: '📜', title: 'Certificates' },
  { icon: '🌐', title: '24/7 Access' }
];

const FeaturesSection = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;