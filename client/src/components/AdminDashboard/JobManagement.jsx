import React, { useState } from 'react';

const JobManagement = () => {
  const [filterActive, setFilterActive] = useState(false);
  
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Management</h2>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-700">Active Job Postings</h3>
          <div className="flex gap-2">
            <button 
              className={`${filterActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} px-3 py-1 rounded text-sm`}
              onClick={() => setFilterActive(!filterActive)}
            >
              Filter
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
              Add Job
            </button>
          </div>
        </div>
        
        {filterActive && (
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="">All Companies</option>
                  <option value="acme">Acme Inc.</option>
                  <option value="tech">TechStart Ltd</option>
                  <option value="design">DesignHub Co.</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="review">Under Review</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Posted
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="">Any Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-3">Senior React Developer</td>
              <td className="px-4 py-3">Acme Inc.</td>
              <td className="px-4 py-3">24</td>
              <td className="px-4 py-3">2 days ago</td>
              <td className="px-4 py-3">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                <button className="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Product Manager</td>
              <td className="px-4 py-3">TechStart Ltd</td>
              <td className="px-4 py-3">18</td>
              <td className="px-4 py-3">5 days ago</td>
              <td className="px-4 py-3">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                <button className="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">UX Designer</td>
              <td className="px-4 py-3">DesignHub Co.</td>
              <td className="px-4 py-3">32</td>
              <td className="px-4 py-3">1 week ago</td>
              <td className="px-4 py-3">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Under Review
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                <button className="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Frontend Developer</td>
              <td className="px-4 py-3">WebSolutions Inc.</td>
              <td className="px-4 py-3">15</td>
              <td className="px-4 py-3">2 weeks ago</td>
              <td className="px-4 py-3">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  Closed
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                <button className="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">24</span> jobs
            </p>
          </div>
          <button className="text-blue-600 hover:text-blue-800">View All Jobs →</button>
        </div>
      </div>
      
      {/* Recent Applications Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-semibold text-gray-700 mb-4">Recent Applications</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Position</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match Score</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                  <div className="ml-3">
                    <div className="text-sm font-medium">Alex Morgan</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">Senior React Developer</td>
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <span className="mr-2 font-medium">94%</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">2 hours ago</td>
              <td className="px-4 py-3 text-sm">
                <button className="text-blue-600 hover:text-blue-800">View Resume</button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                  <div className="ml-3">
                    <div className="text-sm font-medium">Taylor Wilson</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">Product Manager</td>
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <span className="mr-2 font-medium">78%</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">1 day ago</td>
              <td className="px-4 py-3 text-sm">
                <button className="text-blue-600 hover:text-blue-800">View Resume</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default JobManagement;