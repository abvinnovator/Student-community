import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import GridPattern from './../GridPattern';

const Home = () => {
  return (
    <>
    <div className="relative">
      <GridPattern className="absolute inset-0" />
      <header className="flex justify-end p-4 bg-transparent relative z-50">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/login"
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-300"
              >
                Signup
              </Link>
            </li>
          </ul>
        </nav>
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
      <Footer />
    
    </>
  );
}

export default Home;
