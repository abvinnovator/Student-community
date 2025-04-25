import React from 'react';
import Footer from '../Footer';

const CommunityPage = () => {
  return (
    <>
    <div className="bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-black">Welcome to the Collaborative Community</h1>
          <p className="text-xl text-gray-600 mt-4">A space where students from all backgrounds come together to share knowledge, experiences, and grow together.</p>
        </div>

        {/* Image and Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="flex justify-center">
            <img 
              src="https://miro.medium.com/v2/resize:fit:663/1*OPinZiZo3uaL03MMAPA9YQ.png" // Replace with an actual image URL
              alt="Community Collaboration"
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-semibold text-black">Why Join Our Community?</h2>
            <p className="text-lg text-gray-700">
              Our community is a place for students to connect, collaborate, and inspire each other. Whether you're looking to improve your skills, get support in your learning journey, or make lasting friendships, our community is here to support you.
            </p>
            <p className="text-lg text-gray-700">
              You can participate in group discussions, share ideas, attend workshops, or even join mentorship programs. It's an inclusive space where everyone’s voice matters, and your growth is our priority.
            </p>

            {/* CTA Button */}
            <div className="mt-6 text-center">
              <a
                href="/signup" // Link to the signup or community registration page
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition duration-300 font-semibold"
              >
                Join the Community
              </a>
            </div>
          </div>
        </div>

        {/* Key Benefits Section */}
        <div className="mt-16 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">Key Benefits</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            By being part of this community, you gain access to a wealth of opportunities:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {/* Benefit 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Collaborate with Peers</h3>
              <p className="text-gray-600">Engage with other students, learn from their experiences, and share your own insights in discussions.</p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Gain Knowledge</h3>
              <p className="text-gray-600">Access resources, workshops, and tutorials to help you expand your knowledge in various subjects.</p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mentorship Opportunities</h3>
              <p className="text-gray-600">Get guidance and advice from experienced mentors to help you navigate your academic and professional journey.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
     <Footer />
    </>
  );
};

export default CommunityPage;
