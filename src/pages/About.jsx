import React from "react";
import { leadershipData } from "../data/leadershipData";
import { companyStats } from "../data/companyStats";
import AnimatedCounter from "../components/common/AnimatedCounter";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-teal-400 to-emerald-400 bg-clip-text text-transparent mb-6 drop-shadow-lg">
            About Sona Networks
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Since <span className="text-orange-400 font-bold">2001</span>, Sona
            Networks has been at the forefront of{" "}
            <span className="text-teal-400 font-semibold">
              IT infrastructure innovation
            </span>
            , providing cutting-edge solutions that empower businesses to
            achieve their digital transformation goals. With over two decades of
            experience, we've built a reputation for{" "}
            <span className="text-cyan-400 font-semibold">
              excellence, reliability, and innovation
            </span>
            .
          </p>
        </div>
        <div className="mb-20">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-teal-400 to-emerald-400 bg-clip-text text-transparent text-center mb-12 drop-shadow-lg">
            Leadership Team
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {leadershipData.map((leader, index) => (
              <div
                key={leader.id}
                className="backdrop-blur-lg bg-white/5 border border-teal-500/20 rounded-2xl shadow-2xl overflow-hidden hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] transition-all duration-500 hover:-translate-y-3 group hover:bg-white/10 hover:border-teal-400/40"
              >
                <div className="relative h-64 bg-gradient-to-br from-teal-600 to-cyan-600">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="absolute bottom-0 left-8 w-32 h-32 rounded-full border-4 border-white object-cover group-hover:border-teal-300 transition-colors duration-300"
                  />
                </div>
                <div className="p-8 pt-12">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors duration-300">
                    {leader.name}
                  </h3>
                  <p className="text-teal-400 font-semibold mb-2 group-hover:text-teal-300 transition-colors duration-300">
                    {leader.title}
                  </p>
                  <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                    {leader.experience} Experience
                  </p>
                  <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors duration-300">
                    {leader.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white group-hover:text-teal-300 transition-colors duration-300">
                      Expertise:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {leader.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-sm border border-teal-500/30 group-hover:bg-teal-400/20 group-hover:border-teal-400/40 transition-colors duration-300"
                        >
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
        <div className="backdrop-blur-lg bg-gradient-to-r from-teal-900/40 to-cyan-900/40 border border-teal-500/20 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-teal-400 to-emerald-400 bg-clip-text text-transparent text-center mb-12 drop-shadow-lg">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-full mb-4 shadow-lg group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300 group-hover:scale-110">
                  <i className={`fas ${stat.iconClass}`} />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:from-cyan-300 group-hover:to-teal-300 transition-all duration-300">
                  <AnimatedCounter
                    end={stat.number.replace(/\D/g, "")}
                    suffix={stat.number.replace(/\d/g, "")}
                  />
                </div>
                <div className="text-gray-200 font-semibold group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
