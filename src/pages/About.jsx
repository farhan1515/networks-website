import React from 'react';
import { leadershipData } from '../data/leadershipData';
import { companyStats } from '../data/companyStats';
import AnimatedCounter from '../components/common/AnimatedCounter';

const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Sona Networks</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Since 2001, Sona Networks has been at the forefront of IT infrastructure innovation, 
            providing cutting-edge solutions that empower businesses to achieve their digital transformation goals. 
            With over two decades of experience, we've built a reputation for excellence, reliability, and innovation.
          </p>
        </div>
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {leadershipData.map((leader, index) => (
              <div key={leader.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 bg-gradient-to-br from-blue-600 to-purple-600">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="absolute bottom-0 left-8 w-32 h-32 rounded-full border-4 border-white object-cover"
                  />
                </div>
                <div className="p-8 pt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{leader.title}</p>
                  <p className="text-gray-500 mb-4">{leader.experience} Experience</p>
                  <p className="text-gray-600 mb-6">{leader.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {leader.expertise.map((skill, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">
                  <AnimatedCounter end={stat.number.replace(/\D/g, '')} suffix={stat.number.replace(/\d/g, '')} />
                </div>
                <div className="opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;