import React from 'react';
import Footer from '../Footer';

const Educational = () => {
  return (
    <>
    <div className="bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-black">Unlock Your Potential with Education</h1>
          <p className="text-xl text-gray-600 mt-4">
            Education is the key to opening doors to new opportunities. Whether you're looking to improve your skills or explore new fields, we provide the resources you need to succeed.
          </p>
        </div>

        {/* Image and Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="flex justify-center">
            <img 
              src="https://wpvip.edutopia.org/wp-content/uploads/2022/10/rayl-169hero-oeresource-shutterstock.jpg" // Replace with an actual image URL
              alt="Education"
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-semibold text-black">Explore Educational Opportunities</h2>
            <p className="text-lg text-gray-700">
              Education opens doors to better job opportunities, personal growth, and new skills that help you thrive in an ever-changing world. On this page, you'll find valuable resources to help you in your educational journey, whether you're a student or a lifelong learner.
            </p>
            <p className="text-lg text-gray-700">
              From online courses to certifications, books, and research papers, explore how you can expand your knowledge and stay ahead in your career.
            </p>

            {/* CTA Button */}
            <div className="mt-6 text-center">
              <a
                href="/educational-resources" // Link to educational resources page
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition duration-300 font-semibold"
              >
                Explore Educational Resources
              </a>
            </div>
          </div>
        </div>

        {/* Educational Resources Section */}
        <div className="mt-16 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">Featured Educational Resources</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're interested in self-paced learning, structured programs, or certifications, here are some resources to help you grow and enhance your skills:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {/* Educational Resource 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Online Courses</h3>
              <p className="text-gray-600">Explore a wide range of online courses that cater to various fields such as technology, business, arts, and more. Learn at your own pace and gain valuable certifications.</p>
            </div>

            {/* Educational Resource 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Books & Articles</h3>
              <p className="text-gray-600">Access books, articles, and research papers to deepen your knowledge in various subjects. Stay updated with the latest trends and developments in your area of interest.</p>
            </div>

            {/* Educational Resource 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Workshops & Webinars</h3>
              <p className="text-gray-600">Join live workshops and webinars with industry experts. Learn new skills, ask questions, and gain practical knowledge in an interactive environment.</p>
            </div>
          </div>
        </div>

        {/* Featured Courses Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-black text-center mb-6">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Course 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Introduction to Data Science</h3>
              <p className="text-gray-600 mb-4">Learn the fundamentals of data science, including data analysis, machine learning, and visualization techniques. Start your career in data science with this beginner-friendly course.</p>
              <a 
                href="/courses/data-science" 
                className="text-black font-semibold hover:text-gray-800"
              >
                Learn More
              </a>
            </div>

            {/* Featured Course 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Web Development for Beginners</h3>
              <p className="text-gray-600 mb-4">Dive into web development by learning HTML, CSS, JavaScript, and other essential web technologies. Create your own websites and applications from scratch.</p>
              <a 
                href="/courses/web-development" 
                className="text-black font-semibold hover:text-gray-800"
              >
                Learn More
              </a>
            </div>

            {/* Featured Course 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Digital Marketing Essentials</h3>
              <p className="text-gray-600 mb-4">Master digital marketing strategies such as SEO, content marketing, and social media campaigns. Take your marketing skills to the next level with hands-on lessons.</p>
              <a 
                href="/courses/digital-marketing" 
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

export default Educational;
