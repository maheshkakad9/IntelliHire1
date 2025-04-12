import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [userType, setUserType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [recruiterRequests, setRecruiterRequests] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [showRecruiterDetails, setShowRecruiterDetails] = useState(false);

  // Fetch recruiter verification requests
    useEffect(() => {
    const fetchRecruiterRequests = async () => {
      try {
        // Update the API URL to fetch pending recruiters
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/admin/pending-recruiters`);
         
        if (response.data?.data) {
          setRecruiterRequests(response.data.data);
        } else {
          console.error('No data received from pending recruiters API');
          // Fallback to sample data if needed
          setRecruiterRequests([
            {
              _id: 'rec1',
              name: 'David Wilson',
              email: 'david@techcompany.com',
              companyName: 'Tech Solutions Inc.',
              companyWebsite: 'https://techsolutions.com',
              phone: '+91 9876543210',
              profilePicUrl: '',
              createdAt: '2025-04-10T10:30:00Z'
            },
            // More sample data...
          ]);
        }
      } catch (error) {
        console.error('Error fetching recruiter requests:', error);
        // Keep your existing fallback data
      }
    };

    if (userType === 'admin') {
      fetchRecruiterRequests();
    }
  }, [userType]);

  // Handle recruiter verification
  const handleVerifyRecruiter = async (recruiterId, status) => {
    try {
      // In a real app, you would call your API
      await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/admin/verify-recruiter/${recruiterId}`, {
        status
      });
      
      // Update local state
      setRecruiterRequests(prevRequests => 
        prevRequests.filter(recruiter => recruiter._id !== recruiterId)
      );
      
      if (selectedRecruiter && selectedRecruiter._id === recruiterId) {
        setShowRecruiterDetails(false);
        setSelectedRecruiter(null);
      }
      
      // Show notification
      alert(`Recruiter ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
    } catch (error) {
      console.error(`Error ${status} recruiter:`, error);
      
      // For demo, just remove from the list
      setRecruiterRequests(prevRequests => 
        prevRequests.filter(recruiter => recruiter._id !== recruiterId)
      );
      
      if (selectedRecruiter && selectedRecruiter._id === recruiterId) {
        setShowRecruiterDetails(false);
        setSelectedRecruiter(null);
      }

      alert(`Recruiter ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
    }
  };

  // Handle showing recruiter details
  const handleShowRecruiterDetails = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setShowRecruiterDetails(true);
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>
      <div className="flex gap-4 mb-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center">
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add User
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm flex items-center">
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          Export Users
        </button>
        <div className="flex-grow"></div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* User Tabs */}
        <div className="flex border-b">
          <button 
            onClick={() => setUserType('all')} 
            className={`px-6 py-3 ${userType === 'all' ? 'bg-white border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
          >
            All Users
          </button>
          <button 
            onClick={() => setUserType('recruiter')} 
            className={`px-6 py-3 ${userType === 'recruiter' ? 'bg-white border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Recruiters
          </button>
          <button 
            onClick={() => setUserType('jobseeker')} 
            className={`px-6 py-3 ${userType === 'jobseeker' ? 'bg-white border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Job Seekers
          </button>
          <button 
            onClick={() => setUserType('admin')} 
            className={`px-6 py-3 ${userType === 'admin' ? 'bg-white border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Requests
          </button>
        </div>
        
        {userType === 'admin' ? (
          // Show recruiter verification requests when "Requests" tab is active
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recruiter Verification Requests</h3>
            
            {recruiterRequests.length === 0 ? (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No verification requests</h3>
                <p className="mt-1 text-sm text-gray-500">There are currently no pending recruiter verification requests.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recruiter
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requested On
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recruiterRequests.map((recruiter) => (
                    <tr key={recruiter._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200">
                            {recruiter.profilePicUrl && (
                              <img 
                                src={recruiter.profilePicUrl} 
                                alt={recruiter.name} 
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{recruiter.name}</div>
                            <div className="text-sm text-gray-500">{recruiter.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{recruiter.companyName}</div>
                        <div className="text-sm text-gray-500">
                          {recruiter.companyWebsite && (
                            <a href={recruiter.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {recruiter.companyWebsite.replace(/^https?:\/\//, '')}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(recruiter.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button 
                          onClick={() => handleShowRecruiterDetails(recruiter)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => handleVerifyRecruiter(recruiter._id, 'approved')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleVerifyRecruiter(recruiter._id, 'rejected')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          // Show regular user table for other tabs
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">John Smith</div>
                      <div className="text-sm text-gray-500">john@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Recruiter</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 hours ago</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Sarah Johnson</div>
                      <div className="text-sm text-gray-500">sarah@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Job Seeker</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 day ago</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {/* Recruiter Details Modal */}
      {showRecruiterDetails && selectedRecruiter && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
          <div className="relative bg-white rounded-lg max-w-3xl mx-auto p-5 shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-xl font-medium text-gray-900">Recruiter Details</h3>
              <button 
                onClick={() => setShowRecruiterDetails(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-5">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="h-32 w-32 rounded-full bg-gray-200 mb-4">
                      {selectedRecruiter.profilePicUrl && (
                        <img 
                          src={selectedRecruiter.profilePicUrl}
                          alt={selectedRecruiter.name}
                          className="h-32 w-32 rounded-full object-cover"
                        />
                      )}
                    </div>
                    <h4 className="text-lg font-medium text-gray-900">{selectedRecruiter.name}</h4>
                    <p className="text-sm text-gray-500">{selectedRecruiter.email}</p>
                  </div>
                </div>
                
                <div className="md:w-2/3 md:pl-8 border-l">
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-500 mb-2">Company Information</h5>
                    <p className="text-sm font-medium text-gray-900">{selectedRecruiter.companyName}</p>
                    {selectedRecruiter.companyWebsite && (
                      <a 
                        href={selectedRecruiter.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {selectedRecruiter.companyWebsite}
                      </a>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h5>
                    <p className="text-sm text-gray-900">Phone: {selectedRecruiter.phone}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 mb-2">Requested On</h5>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedRecruiter.createdAt).toLocaleDateString()} at {' '}
                      {new Date(selectedRecruiter.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => handleVerifyRecruiter(selectedRecruiter._id, 'rejected')}
                  className="px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 border border-red-300 rounded-md"
                >
                  Reject Request
                </button>
                <button
                  onClick={() => handleVerifyRecruiter(selectedRecruiter._id, 'approved')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  Approve Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserManagement;