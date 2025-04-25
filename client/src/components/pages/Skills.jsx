import React from 'react';
import Footer from '../Footer';

const Skills = () => {
  return (
    <>
    <div className="bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-black">Skills Development</h1>
          <p className="text-xl text-gray-600 mt-4">Enhance your abilities with curated resources and courses for every skill level.</p>
        </div>

        {/* Image and Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="flex justify-center">
            <img 
              src="https://img.freepik.com/premium-photo/skills-development-internet-technology-business_220873-3999.jpg" // Replace with an actual image URL
              alt="Skill Development"
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-semibold text-black">Unlock Your Potential by Developing Key Skills</h2>
            <p className="text-lg text-gray-700">
              In today’s fast-paced world, continuous skill development is key to personal and professional growth. Whether you're looking to improve your technical abilities, master soft skills, or learn new subjects, we have the resources and guidance to help you succeed.
            </p>
            <p className="text-lg text-gray-700">
              Our platform offers an array of skill-building tools, courses, and resources to ensure you're always ahead in your field. Explore our carefully curated categories and start developing new skills today.
            </p>

            {/* CTA Button */}
            <div className="mt-6 text-center">
              <a
                href="/skills" // Link to skill resources or collection page
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition duration-300 font-semibold"
              >
                Explore Skill Categories
              </a>
            </div>
          </div>
        </div>

        {/* Key Skill Categories */}
        <div className="mt-16 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">Key Skill Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our carefully curated skill categories and start mastering the skills that will help you succeed:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {/* Skill Category 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Technical Skills</h3>
              <p className="text-gray-600">From programming languages to cloud computing, explore tutorials and challenges to build your tech expertise.</p>
            </div>

            {/* Skill Category 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Soft Skills</h3>
              <p className="text-gray-600">Improve your leadership, communication, and time management skills with targeted guides and exercises.</p>
            </div>

            {/* Skill Category 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Creative Skills</h3>
              <p className="text-gray-600">Develop your artistic and creative abilities with resources on design, writing, and content creation.</p>
            </div>
          </div>
        </div>

        {/* Featured Skill Resources Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-black text-center mb-6">Featured Skill Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Resource 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mastering Web Development</h3>
              <p className="text-gray-600 mb-4">This course teaches you HTML, CSS, JavaScript, and web development best practices.</p>
              <a 
                href="/course/web-development" 
                className="text-black font-semibold hover:text-gray-800"
              >
                Learn More
              </a>
            </div>

            {/* Featured Resource 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Effective Communication Skills</h3>
              <p className="text-gray-600 mb-4">Develop clear and confident communication skills for both professional and personal settings.</p>
              <a 
                href="/course/communication" 
                className="text-black font-semibold hover:text-gray-800"
              >
                Learn More
              </a>
            </div>

            {/* Featured Resource 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Creative Writing Techniques</h3>
              <p className="text-gray-600 mb-4">Hone your writing abilities and create compelling content for blogs, stories, and more.</p>
              <a 
                href="/course/creative-writing" 
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

export default Skills;
