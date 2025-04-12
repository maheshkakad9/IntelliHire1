import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">IntelliHire – AI-Powered Resume Evaluation and Job Portal</h1>
          <p className="text-xl md:text-2xl mb-8">Streamline your hiring process with our intelligent resume analysis tool</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/recruiter/register" className="bg-white text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-lg font-semibold transition duration-300">
              For Recruiters
            </Link>
            <Link to="/candidate/register" className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300">
              For Job Seekers
            </Link>
            <Link to="/login?type=admin" className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300">
              Admin Portal
            </Link>
            
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Smart Resume Uploads</h3>
            <p className="text-gray-600">Upload multiple resume formats (PDF, DOC) with intelligent parsing and organization.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">AI-Powered Analysis</h3>
            <p className="text-gray-600">Extract key skills, education, and experience using advanced NLP technology.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Smart Ranking</h3>
            <p className="text-gray-600">Automatically score and rank candidates based on job requirements and qualifications.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="text-lg font-semibold mb-2">Upload Job Requirements</h3>
              <p className="text-gray-600">Define positions and required qualifications</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="text-lg font-semibold mb-2">Import Resumes</h3>
              <p className="text-gray-600">Upload candidate CVs in bulk or individually</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">Our system extracts and evaluates candidate data</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">4</div>
              <h3 className="text-lg font-semibold mb-2">Review Results</h3>
              <p className="text-gray-600">See ranked candidates with match percentages</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Who It's For</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition border-t-4 border-blue-600">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Recruiters</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Screen candidates faster
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Find best-fit candidates
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Manage hiring pipelines
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/login?type=recruiter" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300">
                Recruiter Login
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition border-t-4 border-green-600">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Job Seekers</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Upload your resume for analysis
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Get feedback on skill matches
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Apply to job openings
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/login?type=user" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300">
                Job Seeker Login
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition border-t-4 border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Administrators</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-gray-700 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Manage system settings
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-gray-700 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Configure AI parameters
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-gray-700 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Access usage analytics
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/login?admin" className="inline-block bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold transition duration-300">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Streamline Your Hiring Process?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of companies using our AI resume screening assistant to find the best talent faster.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">
              Get Started Free
            </Link>
            <Link to="/demo" className="bg-transparent border-2 border-white hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Resume Scorer</h3>
              <p className="mb-4">AI-powered resume screening and candidate ranking for modern recruitment teams.</p>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/api" className="hover:text-white">API Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} AI Resume Scorer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;