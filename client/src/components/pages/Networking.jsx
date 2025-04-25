import React from 'react';
import Footer from '../Footer';
const Networking = () => {
  return (
    <>
    <div className="bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-black">Networking for Success</h1>
          <p className="text-xl text-gray-600 mt-4">
            Expand your connections and leverage powerful networks to accelerate your personal and professional growth.
          </p>
        </div>

        {/* Image and Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="flex justify-center">
            <img 
              src="https://img.freepik.com/free-photo/hand-button-man-multimedia-mail_1150-1730.jpg" // Replace with an actual image URL
              alt="Networking"
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-semibold text-black">Unlock the Power of Networking</h2>
            <p className="text-lg text-gray-700">
              Networking is more than just exchanging business cards—it's about building meaningful relationships, sharing ideas, and creating opportunities. Whether you're a seasoned professional or just starting out, networking can open doors to new career paths, collaborations, and growth.
            </p>
            <p className="text-lg text-gray-700">
              On this page, we provide resources and opportunities to help you expand your network, connect with like-minded individuals, and succeed in your personal and professional endeavors.
            </p>

            {/* CTA Button */}
            <div className="mt-6 text-center">
              <a
                href="/networking-events" // Link to networking events page or group
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition duration-300 font-semibold"
              >
                Join Networking Events
              </a>
            </div>
          </div>
        </div>

        {/* Networking Opportunities Section */}
        <div className="mt-16 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">Networking Opportunities</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take part in various networking opportunities to meet people, share experiences, and collaborate on projects. Here are some ways you can get started:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {/* Networking Opportunity 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Virtual Meetups</h3>
              <p className="text-gray-600">Join virtual networking events where you can meet industry leaders, exchange ideas, and grow your connections from anywhere.</p>
            </div>

            {/* Networking Opportunity 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Industry Conferences</h3>
              <p className="text-gray-600">Attend industry-specific conferences and seminars to network with peers and learn from experts in the field.</p>
            </div>

            {/* Networking Opportunity 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Collaborative Projects</h3>
              <p className="text-gray-600">Collaborate on exciting projects with other professionals in your field. Working together opens doors for new ideas and opportunities.</p>
            </div>
          </div>
        </div>

        {/* Featured Networking Resources Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-black text-center mb-6">Featured Networking Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Resource 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mastering Networking</h3>
              <p className="text-gray-600 mb-4">Learn the art of networking through this comprehensive guide, covering everything from starting conversations to building long-term relationships.</p>
              <a 
                href="/course/networking-guide" 
                className="text-black font-semibold hover:text-gray-800"
              >
                Learn More
              </a>
            </div>

            {/* Featured Resource 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">The Networking Playbook</h3>
              <p className="text-gray-600 mb-4">A step-by-step guide to networking at events, conferences, and online platforms to maximize your connections and career potential.</p>
              <a 
                href="/course/networking-playbook" 
                className="text-black font-semibold hover:text-gray-800"
              >
                Learn More
              </a>
            </div>

            {/* Featured Resource 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Building Your Personal Brand</h3>
              <p className="text-gray-600 mb-4">Discover how to create a powerful personal brand that attracts professional opportunities and helps you stand out in any networking situation.</p>
              <a 
                href="/course/personal-branding" 
                className="text-black font-semibold hover:text-gray-800"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Networking;
