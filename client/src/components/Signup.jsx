import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentBranch, setCurrentBranch] = useState("");
  const [gender, setGender] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [areasOfInterest, setAreasOfInterest] = useState([]);
  const [skills, setSkills] = useState([]);
  const[profileTheme,setProfileTheme] = useState("");
  const handleAreasOfInterestChange = (value) => {
    if (areasOfInterest.includes(value)) {
      setAreasOfInterest(areasOfInterest.filter(item => item !== value));
    } else {
      setAreasOfInterest([...areasOfInterest, value]);
    }
  };
  
  const handleSkillsChange = (value) => {
    if (skills.includes(value)) {
      setSkills(skills.filter(item => item !== value));
    } else {
      setSkills([...skills, value]);
    }
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/signup", {
      username,
      email,
      password,
      currentBranch,
      gender,
      yearOfStudy,
      areasOfInterest,
      skills,
      profileTheme
    }).then(response => {
        if(response.data.status) {
            navigate('/login');
        }
    }).catch(err => {
        console.log(err);
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="******"
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="currentBranch" className="block text-gray-700">Current Branch:</label>
          <input
            type="text"
            id="currentBranch"
            placeholder="Current Branch"
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
            onChange={(e) => setCurrentBranch(e.target.value)}
          />
        </div>
        <div className="mb-4">
  <label htmlFor="gender" className="block text-gray-700">Gender:</label>
  <div className="flex items-center mt-1">
    <input
      type="radio"
      id="male"
      name="gender"
      value="Male"
      className="mr-2"
      onChange={(e) => setGender(e.target.value)}
    />
    <label htmlFor="male" className="mr-4">Male</label>
    <input
      type="radio"
      id="female"
      name="gender"
      value="Female"
      className="mr-2"
      onChange={(e) => setGender(e.target.value)}
    />
    <label htmlFor="female" className="mr-4">Female</label>
    <input
      type="radio"
      id="other"
      name="gender"
      value="Other"
      className="mr-2"
      onChange={(e) => setGender(e.target.value)}
    />
    <label htmlFor="other">Other</label>
  </div>
</div>

        <div className="mb-4">
          <label htmlFor="yearOfStudy" className="block text-gray-700">Year of Study:</label>
          <input
            type="number"
            id="yearOfStudy"
            placeholder="Year of Study"
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
            onChange={(e) => setYearOfStudy(e.target.value)}
          />
        </div>
        <div className="mb-4">
  <label htmlFor="areasOfInterest" className="block text-gray-700">Areas of Interest:</label>
  <div className="flex items-center mt-1">
    <input
      type="checkbox"
      id="webdev"
      value="Web Development"
      className="mr-2"
      onChange={(e) => handleAreasOfInterestChange(e.target.value)}
    />
    <label htmlFor="webdev" className="mr-4">Web Development</label>
    <input
      type="checkbox"
      id="datascience"
      value="Data Science"
      className="mr-2"
      onChange={(e) => handleAreasOfInterestChange(e.target.value)}
    />
    <label htmlFor="datascience" className="mr-4">Data Science</label>
    <input
      type="checkbox"
      id="communication"
      value="Communication"
      className="mr-2"
      onChange={(e) => handleAreasOfInterestChange(e.target.value)}
    />
    <label htmlFor="communication">Communication</label>
  </div>
</div>

<div className="mb-4">
  <label htmlFor="skills" className="block text-gray-700">Skills:</label>
  <div className="flex items-center mt-1">
    <input
      type="checkbox"
      id="reactjs"
      value="ReactJS"
      className="mr-2"
      onChange={(e) => handleSkillsChange(e.target.value)}
    />
    <label htmlFor="reactjs" className="mr-4">ReactJS</label>
    <input
      type="checkbox"
      id="nodejs"
      value="Node.js"
      className="mr-2"
      onChange={(e) => handleSkillsChange(e.target.value)}
    />
    <label htmlFor="nodejs" className="mr-4">Node.js</label>
    <input
      type="checkbox"
      id="python"
      value="Python"
      className="mr-2"
      onChange={(e) => handleSkillsChange(e.target.value)}
    />
    <label htmlFor="python" className="mr-4">Python</label>
    <input
      type="checkbox"
      id="js"
      value="JavaScript"
      className="mr-2"
      onChange={(e) => handleSkillsChange(e.target.value)}
    />
    <label htmlFor="js">JavaScript</label>
  </div>
</div>
<div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Profile Theme:</label>
          <input
            type="text"
            id="profileTheme"
            placeholder="enter profile label or theme u want"
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
            onChange={(e) => setProfileTheme(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Sign Up</button>
        <div className="flex justify-between items-center mt-4">
          <p>Have an Account? <Link to="/login" className="text-blue-500">Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
