import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import GridPattern from './../GridPattern';

const Home = () => {
  return (
    <>
    <div className="relative">
      <GridPattern className="absolute inset-0" />
      <header className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-black">StudentCom</span>
              </Link>
            </div>

            {/* Main Navigation */}
           {/* <nav className="hidden md:flex space-x-8">
              <Link to="/features" className="text-gray-600 hover:text-black transition duration-300">
                Features
              </Link>
              <Link to="/resources" className="text-gray-600 hover:text-black transition duration-300">
                Resources
              </Link>
              <Link to="/community" className="text-gray-600 hover:text-black transition duration-300">
                Community
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-black transition duration-300">
                About Us
              </Link>
            </nav> */}

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <Link to="/login" className="hidden md:inline-block text-gray-600 hover:text-black transition duration-300">
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-black text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition duration-300 font-medium"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center h-screen relative z-10">
        <div className="main">
          <div className="gradient" />
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold text-black mb-4">Student Community</h1>
            <p className="text-center text-gray-700 max-w-md mx-auto">
              Welcome to the Student Community! A collaborative platform designed to empower students like you by fostering skill development, knowledge sharing, and networking opportunities. Join us on a journey of continuous learning and growth, where you can connect with like-minded individuals, gain valuable insights, and unlock your full potential.
            </p>
          </div>
        </div>
      </div>
      </div>
      <section className="bg-custom-gray py-16 px-4 bg-cover bg-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-black mb-4 text-center">Our Aim!</h2>
          <p className="text-gray-700 text-center max-w-2xl mx-auto">
            Our project aims to create a vibrant and inclusive community where students from diverse backgrounds can collaborate, share knowledge, and gain valuable skills. We believe that learning is a continuous process, and by fostering an environment of collaboration and mutual support, we can unlock our full potential and achieve greater heights together.
          </p>
          <p className="text-gray-700 text-center max-w-2xl mx-auto mt-4">
            Through our platform, you'll have access to a wide range of resources, including educational materials, interactive workshops, and mentorship opportunities. Whether you're looking to enhance your technical skills, improve your communication abilities, or explore new areas of interest, our community offers a supportive and engaging environment to facilitate your growth.
          </p>
          <p className="text-gray-700 text-center max-w-2xl mx-auto mt-4">
            Join us on this exciting journey, and together, we'll embark on a path of lifelong learning, personal development, and meaningful connections. Let's collaborate, inspire, and empower one another to become the best versions of ourselves.
          </p>
         
        </div>
      </section>
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black mb-4">Key Features</h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-16">
              Discover the tools and opportunities that will help you grow, learn, and connect with fellow students.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Collaborative Community</h3>
              <p className="text-gray-600">Connect with students from diverse backgrounds, share experiences, and build lasting relationships within our vibrant community.</p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Educational Resources</h3>
              <p className="text-gray-600">Access comprehensive learning materials, workshops, and tutorials to enhance your skills and knowledge.</p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Mentorship Programs</h3>
              <p className="text-gray-600">Get guidance from experienced mentors who can help you navigate your academic and professional journey.</p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Skill Development</h3>
              <p className="text-gray-600">Enhance your technical and soft skills through interactive workshops and practical learning experiences.</p>
            </div>

            {/* Feature Card 5 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Networking Opportunities</h3>
              <p className="text-gray-600">Build meaningful connections with peers and professionals through events and collaborative projects.</p>
            </div>

            {/* Feature Card 6 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Resource Library</h3>
              <p className="text-gray-600">Access a comprehensive collection of study materials, guides, and resources to support your learning journey.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    
    </>
  );
}

export default Home;
