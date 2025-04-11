import React, { useState } from 'react';

const FinancialDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [activeSubscriptionsTab, setActiveSubscriptionsTab] = useState('all');
  
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Financial Overview</h2>
        <div className="flex items-center space-x-2">
          <select 
            className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 90 days</option>
            <option value="year">Last 12 months</option>
          </select>
        </div>
      </div>
      
      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-semibold mb-1">Monthly Revenue</h3>
          <p className="text-3xl font-bold">$24,850</p>
          <div className="flex items-center mt-2">
            <span className="text-green-600 text-sm mr-1">↑ 18%</span>
            <span className="text-xs text-gray-500">vs last {timeRange}</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-semibold mb-1">Active Subscriptions</h3>
          <p className="text-3xl font-bold">42</p>
          <div className="mt-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '70%'}}></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">70% retention</span>
              <span className="text-xs text-gray-500">Target: 75%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-semibold mb-1">Avg. Customer Value</h3>
          <p className="text-3xl font-bold">$584</p>
          <div className="flex items-center mt-2">
            <span className="text-green-600 text-sm mr-1">↑ 5%</span>
            <span className="text-xs text-gray-500">vs last {timeRange}</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-semibold mb-1">Churn Rate</h3>
          <p className="text-3xl font-bold">3.2%</p>
          <div className="flex items-center mt-2">
            <span className="text-red-600 text-sm mr-1">↑ 0.5%</span>
            <span className="text-xs text-gray-500">vs last {timeRange}</span>
          </div>
        </div>
      </div>
      
      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="font-semibold text-gray-700 mb-4">Revenue Trends</h3>
        <div className="h-80 bg-gray-50 flex items-center justify-center rounded">
          {/* Integration point for chart library */}
          <p className="text-gray-500">Revenue trend chart over time</p>
        </div>
      </div>
      
      {/* Subscription Management */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-700">Subscription Plans</h3>
        </div>
        
        <div className="flex border-b">
          <button 
            onClick={() => setActiveSubscriptionsTab('all')} 
            className={`px-6 py-3 ${activeSubscriptionsTab === 'all' ? 'bg-white border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
          >
            All Plans
          </button>
          <button 
            onClick={() => setActiveSubscriptionsTab('active')} 
            className={`px-6 py-3 ${activeSubscriptionsTab === 'active' ? 'bg-white border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Active
          </button>
          <button 
            onClick={() => setActiveSubscriptionsTab('trial')} 
            className={`px-6 py-3 ${activeSubscriptionsTab === 'trial' ? 'bg-white border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Trial
          </button>
          <button 
            onClick={() => setActiveSubscriptionsTab('expired')} 
            className={`px-6 py-3 ${activeSubscriptionsTab === 'expired' ? 'bg-white border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Expired
          </button>
        </div>
        
        <div className="p-6">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Users</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Basic</div>
                    <div className="text-xs text-gray-500">Limited features</div>
                  </div>
                </td>
                <td className="px-4 py-3">$29/mo</td>
                <td className="px-4 py-3">18</td>
                <td className="px-4 py-3">$522</td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Pro</div>
                    <div className="text-xs text-gray-500">Advanced features</div>
                  </div>
                </td>
                <td className="px-4 py-3">$99/mo</td>
                <td className="px-4 py-3">15</td>
                <td className="px-4 py-3">$1,485</td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Enterprise</div>
                    <div className="text-xs text-gray-500">Complete solution</div>
                  </div>
                </td>
                <td className="px-4 py-3">$499/mo</td>
                <td className="px-4 py-3">9</td>
                <td className="px-4 py-3">$4,491</td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold text-gray-700">Latest Transactions</h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">TechCorp Inc.</div>
                      <div className="text-sm text-gray-500">tech@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Enterprise</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">$499.00</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Apr 9, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Design Studio</div>
                      <div className="text-sm text-gray-500">design@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Pro</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">$99.00</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Apr 8, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Marketing Pro</div>
                      <div className="text-sm text-gray-500">marketing@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Basic</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">$29.00</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Apr 7, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FinancialDashboard;