import { useSelector } from 'react-redux';
import { Outlet, NavLink } from 'react-router-dom';
import { FaNewspaper, FaPlusCircle } from 'react-icons/fa';

export default function AuthorProfile() {
  const { currentUser } = useSelector(state => state.userAuthorLoginReducer);

  return (
    <div className='flex flex-col min-h-screen bg-gray-100'>
      <nav className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <div className="flex items-center space-x-4">
              <NavLink
                to={`my-articles/${currentUser.username}`}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <FaNewspaper className="mr-2" />
                Articles
              </NavLink>
              <NavLink
                to="write-article"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <FaPlusCircle className="mr-2" />
                Add New
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}