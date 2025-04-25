import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    currentBranch: "",
    gender: "",
    yearOfStudy: "",
    areasOfInterest: [],
    skills: [],
    profileTheme: ""
  });

  const navigate = useNavigate();

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAreasOfInterestChange = (value) => {
    const updated = formData.areasOfInterest.includes(value)
      ? formData.areasOfInterest.filter(item => item !== value)
      : [...formData.areasOfInterest, value];
    updateFormData('areasOfInterest', updated);
  };

  const handleSkillsChange = (value) => {
    const updated = formData.skills.includes(value)
      ? formData.skills.filter(item => item !== value)
      : [...formData.skills, value];
    updateFormData('skills', updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/signup", formData)
      .then(response => {
        if(response.data.status) {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        {/* Progress Bar */}
        <div className="relative pt-4">
          <div className="flex justify-between mb-2">
            {['Account', 'Personal', 'Interests'].map((label, index) => (
              <span key={label} className={`text-sm ${step > index ? 'text-black' : 'text-gray-400'}`}>
                {label}
              </span>
            ))}
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white py-8 px-10 shadow rounded-xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {step === 1 && "Create your account"}
            {step === 2 && "Personal Information"}
            {step === 3 && "Your Interests"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => updateFormData('username', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                    placeholder="Choose a username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                    placeholder="Create a password"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Branch</label>
                  <input
                    type="text"
                    value={formData.currentBranch}
                    onChange={(e) => updateFormData('currentBranch', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <div className="flex space-x-4">
                    {['Male', 'Female', 'Other'].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value={option}
                          checked={formData.gender === option}
                          onChange={(e) => updateFormData('gender', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Year of Study</label>
                  <input
                    type="number"
                    value={formData.yearOfStudy}
                    onChange={(e) => updateFormData('yearOfStudy', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Interest</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Web Development', 'Data Science', 'Communication'].map((area) => (
                      <label key={area} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={formData.areasOfInterest.includes(area)}
                          onChange={() => handleAreasOfInterestChange(area)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['ReactJS', 'Node.js', 'Python', 'JavaScript'].map((skill) => (
                      <label key={skill} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={formData.skills.includes(skill)}
                          onChange={() => handleSkillsChange(skill)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Profile Theme</label>
                  <input
                    type="text"
                    value={formData.profileTheme}
                    onChange={(e) => updateFormData('profileTheme', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                    placeholder="Enter your profile theme"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Complete Signup
                </button>
              )}
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-black hover:text-gray-800">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;