import React, { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { signInAdmin } from '../../api';

export default function AdminLogin() {
    const navigate = useNavigate()


    const [user,setUser] = useState({
        email : '',
        password : '',
    })

    const change = (e) => {
        setUser(prevuser => ({...prevuser,[e.target.name]:e.target.value}))
    }
    const submit = async (e) => {
        console.log(user)
        e.preventDefault()
        try {
            const response = await signInAdmin(user)
            const responseData = response.data

            if(responseData.success) {
                console.log("i am gettinng called here")
                toast.success(responseData.message);
                localStorage.setItem('user_token', responseData.token);
                setTimeout(() => {
                    navigate('/admin')
                },1500)
            }else {
                console.log("getting called from else block")
                toast.error(responseData.message);
            }

            

        }catch(error) {
            toast.error("something went wrong")
        }
    }

  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    
                    <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-black text-center md:text-2xl"> 
                                Admin Sign in
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={submit}>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                    <input type="email" name="email" value={user.email} onChange={change}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" value={user.password} onChange={change}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <button type="submit" className="bg-transparent block mx-auto font-bold text-center hover:bg-gray-500 text-black-700  hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">Sign In</button>
                                {/* <p className="text-center">
                                    Don’t have an account yet? <div className="text-center text-decoration-line: underline">
                                    <Link href='/signup'>Sign Up</Link>
                                </div>
                                </p> */}
                            </form>
                        </div>
                    </div>
                </div>
    
    </>
  )
}
