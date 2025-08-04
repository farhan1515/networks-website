import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-teal-400 to-emerald-400 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300">
            Get in touch with our{" "}
            <span className="text-teal-400 font-semibold">
              IT infrastructure experts
            </span>
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="backdrop-blur-lg bg-white/5 border border-teal-500/20 rounded-2xl shadow-2xl p-8 hover:bg-white/10 hover:border-teal-400/40 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6">
                Get In Touch
              </h3>
              <div className="space-y-6">
                <div className="flex items-center group hover:scale-105 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-teal-500/20 to-cyan-600/20 p-3 rounded-lg mr-4 group-hover:from-teal-400/30 group-hover:to-cyan-500/30 transition-colors duration-300">
                    <i className="fas fa-phone text-teal-400 group-hover:text-teal-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-white group-hover:text-teal-300 transition-colors duration-300">
                      Phone
                    </p>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      +91 9618 983 030
                    </p>
                  </div>
                </div>
                <div className="flex items-center group hover:scale-105 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-teal-500/20 to-cyan-600/20 p-3 rounded-lg mr-4 group-hover:from-teal-400/30 group-hover:to-cyan-500/30 transition-colors duration-300">
                    <i className="fas fa-envelope text-teal-400 group-hover:text-teal-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-white group-hover:text-teal-300 transition-colors duration-300">
                      Email
                    </p>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      info@sona-networks.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start group hover:scale-105 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-teal-500/20 to-cyan-600/20 p-3 rounded-lg mr-4 group-hover:from-teal-400/30 group-hover:to-cyan-500/30 transition-colors duration-300">
                    <i className="fas fa-map-pin text-teal-400 group-hover:text-teal-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-white group-hover:text-teal-300 transition-colors duration-300">
                      Address
                    </p>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      5-5-263 & 264, Floor No 04
                      <br />
                      AQRA HOMES, Patel Nagar
                      <br />
                      Nampally, Hyderabad-01
                    </p>
                  </div>
                </div>
                <div className="flex items-center group hover:scale-105 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-teal-500/20 to-cyan-600/20 p-3 rounded-lg mr-4 group-hover:from-teal-400/30 group-hover:to-cyan-500/30 transition-colors duration-300">
                    <i className="fas fa-clock text-teal-400 group-hover:text-teal-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-white group-hover:text-teal-300 transition-colors duration-300">
                      Business Hours
                    </p>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      Mon-Sat: 9:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-lg bg-gradient-to-r from-teal-900/40 to-cyan-900/40 border border-teal-500/20 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Why Choose <span className="text-teal-400">Sona Networks</span>?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                  <i className="fas fa-check-circle mr-3 text-emerald-400 group-hover:text-emerald-300" />
                  <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                    <span className="text-orange-400 font-bold">21+</span> years
                    of industry experience
                  </span>
                </li>
                <li className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                  <i className="fas fa-check-circle mr-3 text-emerald-400 group-hover:text-emerald-300" />
                  <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                    <span className="text-teal-400 font-bold">1000+</span>{" "}
                    satisfied customers
                  </span>
                </li>
                <li className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                  <i className="fas fa-check-circle mr-3 text-emerald-400 group-hover:text-emerald-300" />
                  <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                    <span className="text-cyan-400 font-bold">24/7</span>{" "}
                    technical support
                  </span>
                </li>
                <li className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                  <i className="fas fa-check-circle mr-3 text-emerald-400 group-hover:text-emerald-300" />
                  <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                    <span className="text-purple-400 font-bold">
                      Enterprise-grade
                    </span>{" "}
                    solutions
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="backdrop-blur-lg bg-white/5 border border-teal-500/20 rounded-2xl shadow-2xl p-8 hover:bg-white/10 hover:border-teal-400/40 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6">
              Request Consultation
            </h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 backdrop-blur-sm bg-white/10 border border-teal-500/30 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-400 text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 backdrop-blur-sm bg-white/10 border border-teal-500/30 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-400 text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 backdrop-blur-sm bg-white/10 border border-teal-500/30 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-400 text-white placeholder-gray-400 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 backdrop-blur-sm bg-white/10 border border-teal-500/30 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-400 text-white placeholder-gray-400 transition-all duration-300"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Service Interest
                </label>
                <select className="w-full px-4 py-3 backdrop-blur-sm bg-white/10 border border-teal-500/30 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-400 text-white transition-all duration-300">
                  <option className="bg-gray-800 text-white">
                    Select a service
                  </option>
                  <option className="bg-gray-800 text-white">
                    Network Switches
                  </option>
                  <option className="bg-gray-800 text-white">
                    Server Solutions
                  </option>
                  <option className="bg-gray-800 text-white">
                    Security Appliances
                  </option>
                  <option className="bg-gray-800 text-white">
                    IT Infrastructure Design
                  </option>
                  <option className="bg-gray-800 text-white">
                    Cloud Migration
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 backdrop-blur-sm bg-white/10 border border-teal-500/30 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-400 text-white placeholder-gray-400 transition-all duration-300 resize-none"
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>
              <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white py-3 px-6 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] relative overflow-hidden group">
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
