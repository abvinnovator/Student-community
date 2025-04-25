import React from 'react';
import Footer from '../Footer';

const Resource = () => {
  return (
    <>
    <div className="bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-black">Educational Resources</h1>
          <p className="text-xl text-gray-600 mt-4">Explore a wide range of learning materials designed to help you succeed.</p>
        </div>

        {/* Image and Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="flex justify-center">
            <img 
              src="https://media.istockphoto.com/id/1349094880/photo/marketer-using-a-computer-to-digital-online-marketing-banner-web-icon-for-business-and-social.jpg?s=612x612&w=0&k=20&c=cGy3UqLgfE3rn4lWgBxxZFX7lQivIvipE91UT5kWnhE=

" // Replace with an actual image URL
              alt="Learning Resources"
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-semibold text-black">Unlock Your Potential with Our Resources</h2>
            <p className="text-lg text-gray-700">
              Our platform offers a variety of resources, including tutorials, guides, and courses, to help you enhance your skills and knowledge. Whether you're looking to improve your technical abilities, learn new tools, or refine soft skills, we have the resources to help you succeed.
            </p>
            <p className="text-lg text-gray-700">
              From beginner guides to advanced courses, our resources are tailored to students at all levels. Start learning today and gain the skills that will set you apart!
            </p>

            {/* CTA Button */}
            <div className="mt-6 text-center">
              <a
                href="/resources" // Link to the resource collection page
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition duration-300 font-semibold"
              >
                Explore Resources
              </a>
            </div>
          </div>
        </div>

        {/* Key Resource Categories */}
        <div className="mt-16 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">Our Key Resource Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our carefully curated categories and find the resources that best suit your learning goals:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {/* Resource Category 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Technical Skills</h3>
              <p className="text-gray-600">Access tutorials, coding challenges, and hands-on projects that will enhance your technical expertise.</p>
            </div>

            {/* Resource Category 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Soft Skills</h3>
              <p className="text-gray-600">Develop key soft skills such as communication, leadership, and time management through interactive guides and exercises.</p>
            </div>

            {/* Resource Category 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Courses & Certifications</h3>
              <p className="text-gray-600">Explore our curated list of online courses and certifications that will help you gain valuable skills and credentials.</p>
            </div>
          </div>
        </div>

        {/* Featured Resources Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-black text-center mb-6">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Resource 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Web Development 101</h3>
              <p className="text-gray-600 mb-4">An introductory course to web development that covers HTML, CSS, and JavaScript fundamentals.</p>
              <a 
                href="/course/web-development" 
                className="text-black font-semibold hover:text-gray-800"
              >
                Learn More
              </a>
            </div>

            {/* Featured Resource 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Leadership Skills for Students</h3>
              <p className="text-gray-600 mb-4">This guide helps you develop leadership skills that will serve you both academically and professionally.</p>
              <a 
                href="/guide/leadership" 
                className="text-black font-semibold hover:text-gray-800"
              >
                Learn More
              </a>
            </div>

            {/* Featured Resource 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Introduction to Data Science</h3>
              <p className="text-gray-600 mb-4">A beginner's course that introduces you to the world of data science, including Python and machine learning basics.</p>
              <a 
                href="/course/data-science" 
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

export default Resource;

