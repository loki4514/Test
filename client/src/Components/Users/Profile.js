import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getAdmin } from '../../api';


export default function Profile() {
  const navigate = useNavigate();
  const [extUser, setExtUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const getUser = localStorage.getItem('user_token');
      if (getUser) {
        try {
          let decodedToken = jwtDecode(getUser);
          const somevar = JSON.parse(JSON.stringify(decodedToken));
          console.log(somevar.id, "this is way out of line dummy")
          const user = await getAdmin(somevar.id);
          setExtUser(user.data);
          setLoading(false);
        } catch (error) {
          setError('Error fetching user data');
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []); // Empty dependency array
  console.log(extUser)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-slate-400 dark:border-gray-700">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={extUser?.photo} alt="Bonnie image" />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Name : {extUser?.account_name}</h5>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bio: {extUser?.bio}</h5>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Email : {extUser?.email}</h5>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Phone : {extUser?.phone}</h5>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Role : {extUser?.roles}</h5>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Account Type : {extUser?.account_view}</h5>
            <div className="flex mt-4 md:mt-6">
              <button  onClick={() => navigate('/profileedit')} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
