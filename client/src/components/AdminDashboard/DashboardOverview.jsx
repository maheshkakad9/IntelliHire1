import { useState,useEffect } from "react";
import React from 'react';
import axios from 'axios';

const DashboardOverview = () => {
  const [users, setUsers] = useState([]);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [recruitersCount, setRecruitersCount] = useState(0);
  const [jobsCount, setJobsCount] = useState(0);


  useEffect(() => {
    // Fetch recent users
    axios.get('http://localhost:8000/api/v1/users/getUsers')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });

    // Fetch total user count
    axios.get('http://localhost:8000/api/v1/admin/users/count')
      .then(response => {
        setTotalUsersCount(response.data.data.totalUsers);
      })
      .catch(error => {
        console.error("Error fetching total users count:", error);
      });

    // Fetch recruiter count
    axios.get('http://localhost:8000/api/v1/admin/recruiters/count')
      .then(response => {
        setRecruitersCount(response.data.data.totalRecruiter);
      })
      .catch(error => {
        console.error("Error fetching recruiter count:", error);
      });

      axios.get('http://localhost:8000/api/v1/admin/jobs/count')
        .then(response => {
        setJobsCount(response.data.data.totalJobs); // Make sure your backend response is in this format
        })
      .catch(error => {
        console.error("Error fetching jobs count:", error);
      });
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-semibold mb-1">Total Users</h3>
          <p className="text-3xl font-bold">{totalUsersCount}</p>
          <p className="text-green-600 text-sm mt-2">↑ 12% this week</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-semibold mb-1">Active Recruiters</h3>
          <p className="text-3xl font-bold">{recruitersCount}</p>
          <p className="text-green-600 text-sm mt-2">↑ 5% this week</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-semibold mb-1">Job Postings</h3>
          <p className="text-3xl font-bold">{jobsCount}</p>
          <p className="text-green-600 text-sm mt-2">↑ 18% this week</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-semibold mb-1">Resumes Analyzed</h3>
          <p className="text-3xl font-bold">6</p>
          <p className="text-green-600 text-sm mt-2">↑ 24% this week</p>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg shadow flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Admin User
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg shadow flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Configure AI Settings
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg shadow flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          View Reports
        </button>
      </div>
      
      {/* Recent Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Recent Users</h3>
          <button className="text-blue-600 hover:text-blue-800">View All</button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardOverview;