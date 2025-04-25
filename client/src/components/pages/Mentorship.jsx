import React from 'react';
import Footer from '../Footer';

const Mentorship = () => {
  return (
    <>
    <div className="bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-black">The Power of Mentorship</h1>
          <p className="text-xl text-gray-600 mt-4">
            Mentorship is a key to unlocking personal and professional growth. Whether you're a mentor or a mentee, the exchange of knowledge and experience can lead to incredible success.
          </p>
        </div>

        {/* Image and Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="flex justify-center">
            <img 
              src="https://www.mentoringcomplete.com/wp-content/uploads/2023/11/Essential-Corporate-Mentorship-Program-Guide-and-Best-Practices-scaled.webp" // Replace with an actual image URL
              alt="Mentorship"
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-semibold text-black">Unlock Your Potential with Mentorship</h2>
            <p className="text-lg text-gray-700">
              Mentorship provides a unique opportunity to gain valuable insights from those who have walked the path before you. It allows individuals to learn from others' experiences, receive advice, and be guided through both professional and personal development.
            </p>
            <p className="text-lg text-gray-700">
              Whether you're looking for guidance in your career or wanting to give back by helping others, mentorship can make a lasting impact. In this section, we'll explore ways you can either seek mentorship or offer your expertise to someone else.
            </p>

            {/* CTA Button */}
            <div className="mt-6 text-center">
              <a
                href="/join-mentorship" // Link to mentorship signup page
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition duration-300 font-semibold"
              >
                Join a Mentorship Program
              </a>
            </div>
          </div>
        </div>

        {/* Mentorship Opportunities Section */}
        <div className="mt-16 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">Mentorship Opportunities</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're looking to be mentored or become a mentor, we provide various opportunities for growth and connection. Here are some ways you can get involved:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {/* Mentorship Opportunity 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Become a Mentor</h3>
              <p className="text-gray-600">Share your experience, knowledge, and skills with someone who is eager to learn. Help them navigate challenges and offer advice that will accelerate their personal and professional growth.</p>
            </div>

            {/* Mentorship Opportunity 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Find a Mentor</h3>
              <p className="text-gray-600">Seeking guidance in your career? Connect with a mentor who can provide valuable insights, advice, and support to help you achieve your goals and overcome obstacles.</p>
            </div>

            {/* Mentorship Opportunity 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Group Mentorship</h3>
              <p className="text-gray-600">Engage in group mentorship sessions where multiple individuals can share experiences, learn from each other, and grow together in a collaborative setting.</p>
            </div>
          </div>
        </div>

        {/* Featured Mentorship Resources Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-black text-center mb-6">Mentorship Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Resource 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mentorship Best Practices</h3>
              <p className="text-gray-600 mb-4">Learn the key principles for effective mentoring and being a great mentee. This guide will help you navigate your relationship and make the most out of the experience.</p>
              <a 
                href="/resources/mentorship-best-practices" 
                className="text-black font-semibold hover:text-gray-800"
              >
                Learn More
              </a>
            </div>

            {/* Featured Resource 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">How to Be an Effective Mentor</h3>
              <p className="text-gray-600 mb-4">This resource helps mentors guide their mentees effectively, providing tools and strategies to ensure a rewarding mentoring relationship for both parties.</p>
              <a 
                href="/resources/effective-mentor" 
                className="text-black font-semibold hover:text-gray-800"
              >
                Learn More
              </a>
            </div>

            {/* Featured Resource 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Building a Successful Mentor-Mentee Relationship</h3>
              <p className="text-gray-600 mb-4">Establish a strong and effective mentorship relationship with this guide, which covers communication, expectations, and setting goals to achieve success together.</p>
              <a 
                href="/resources/mentor-mentee-relationship" 
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

export default Mentorship;
