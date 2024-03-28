import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api';
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const checkLoginStatus = () => {
      const getUser = localStorage.getItem('user_token');
      if (getUser) {
        setIsLoggedIn(true);
      }
      else {
        navigate('/auth')
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUsers = async () => {
        try {
          const users = await getUsers();
          setInfo(users.data);
          console.log(users.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchUsers();
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn && info && info.map((user, index) => (
        <div key={index} className="flex justify-center">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-slate-400 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user?.photo} alt="Bonnie image" />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Name : {user?.account_name}</h5>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bio: {user?.bio}</h5>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Email : {user?.email}</h5>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Phone : {user?.phone}</h5>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Role : {user?.roles}</h5>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Account Type : {user?.account_view}</h5>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
