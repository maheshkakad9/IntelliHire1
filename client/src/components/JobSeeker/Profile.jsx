import { Link } from 'react-router-dom';
import { useGetProfileQuery } from '../../../store/api/jobSeekerApi'; 

const defaultAvatar = "https://via.placeholder.com/150";

const Profile = () => {
  const { 
    data: response, 
    error, 
    isLoading,
    isFetching,
    isSuccess
   } = useGetProfileQuery();

   if (isLoading || isFetching) {
    return <div>Loading user profile...</div>;
   }

   if (error) {
    return (
      <div className="text-red-600">
        Error: {error.data?.message || 'Failed to load profile'}
      </div>
    );
  }

  if (!response?.user) {
    return <div>No profile data found</div>;
  }

  const profile = response.user;
  
  const calculateProfileCompleteness = () => {
    if (!profile) return 0;
    const fields = [
      !!profile.name, 
      !!profile.email, 
      !!profile.phone, 
      !!profile.location, 
      profile.skills && profile.skills.length > 0, 
      !!profile.experience, 
      !!profile.education, 
      !!profile.resumeUrl
    ];
    
    const filledFields = fields.filter(Boolean).length;
    return Math.round((filledFields / fields.length) * 100);
  };
  
  const profileCompleteness = calculateProfileCompleteness();

  return (
    <div className="space-y-5">
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
          <div className="absolute bottom-0 transform translate-y-1/2 left-6">
            <img
              src={profile.profilePicUrl || defaultAvatar}
              alt={profile.name}
              className="h-24 w-24 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>
        <div className="px-6 pt-16 pb-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
            {profile.experience && (
              <div className="mt-1">
                <span className="text-sm font-medium text-gray-700">Experience: </span>
                <span className="text-sm text-gray-500">{profile.experience}</span>
              </div>
            )}
            {profile.location && (
              <div className="mt-1">
                <span className="text-sm font-medium text-gray-700">Location: </span>
                <span className="text-sm text-gray-500">{profile.location}</span>
              </div>
            )}
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-500">Profile Completeness</span>
              <span className="text-xs font-medium text-gray-700">{profileCompleteness}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  profileCompleteness < 50 ? 'bg-red-500' : 
                  profileCompleteness < 80 ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`} 
                style={{ width: `${profileCompleteness}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="ml-2 text-sm font-medium text-gray-700">Email: </span>
              <span className="ml-1 text-sm text-gray-500">{profile.email}</span>
            </div>
            
            {profile.phone && (
              <div className="flex items-center">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="ml-2 text-sm font-medium text-gray-700">Phone: </span>
                <span className="ml-1 text-sm text-gray-500">{profile.phone}</span>
              </div>
            )}
            
            {profile.education && (
              <div className="flex items-center">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                <span className="ml-2 text-sm font-medium text-gray-700">Education: </span>
                <span className="ml-1 text-sm text-gray-500">{profile.education}</span>
              </div>
            )}
          </div>

          {profile.skills && profile.skills.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700">Skills:</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.resumeUrl && (
            <div className="mt-6">
              <span className="text-sm font-medium text-gray-700">Resume: </span>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                </svg>
                Download Resume
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-4 sm:px-6 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="bg-gray-50 px-4 py-4 sm:px-6">
          <nav className="space-y-1" aria-label="Sidebar">
            <Link
              to="/jobs/saved"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
            >
              <svg className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span className="truncate">Saved Jobs</span>
            </Link>

            <Link
              to="/jobs/applied"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
            >
              <svg className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span className="truncate">Applied Jobs</span>
              {profile.appliedJobs?.length > 0 && (
                <span className="inline-flex items-center justify-center ml-auto w-5 h-5 text-xs font-medium text-white bg-blue-500 rounded-full">
                  {profile.appliedJobs.length}
                </span>
              )}
            </Link>

            <Link
              to="/profile/view"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
            >
              <svg className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="truncate">Profile Views</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Profile;