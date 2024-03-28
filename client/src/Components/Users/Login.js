import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { signInApi,googleauth } from '../../api';
import toast, { Toaster } from "react-hot-toast";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export default function Login() {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const change = (e) => {
        setUser(preinfo => ({ ...preinfo, [e.target.name]: e.target.value }))
    }

    const googleSucess = async (res) => {


        // if profile obj exists it returns or else it throws an error
        // const token = jwtDecode(res.credential).jti
        // console.log("this is token", token)


        try {
            console.log(res)
            const token = res.credential
            const result = jwtDecode(token)
            const response = await googleauth(result)
            const responseData = response.data
            console.log(responseData)

            if (responseData.success) {
                console.log("i am gettinng called here")
                toast.success(responseData.message);
                localStorage.setItem('user_token', responseData.token);
                setTimeout(() => {
                    navigate('/')
                }, 1500)
            } else {
                console.log("getting called from else block")
                toast.error(responseData.message);
            }

            console.log(result)
            navigate('/')
        } catch (error) {
            console.log("error dispatching", error)

        }


    }
    const googleFailure = (error) => {
        console.error('Sign-in failed:', error);


    }



    const submit = async (e) => {
        e.preventDefault()
        try {
            const response = await signInApi(user)
            const responseData = response.data
            console.log(responseData)

            if (responseData.success) {
                console.log("i am gettinng called here")
                toast.success(responseData.message);
                localStorage.setItem('user_token', responseData.token);
                setTimeout(() => {
                    navigate('/')
                }, 1500)
            } else {
                console.log("getting called from else block")
                toast.error(responseData.message);
            }



        } catch (error) {
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
                            Sign in
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={submit}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input type="email" name="email" value={user.email} id="email" onChange={change}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" name="password" value={user.password} onChange={change} id="password" placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="text-black">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <div>
                                <GoogleLogin
                                    clientId='282872334993-nd7f60uaf0hfnukni8q2b3eresn1v0r5.apps.googleusercontent.com'
                                    render={(renderProps) => (
                                        <button
                                            style={{ marginTop: '15px' }}
                                            color='primary'
                                            fullWidth
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                            variant='contained'

                                        >Google Signin</button>
                                    )}
                                    onSuccess={googleSucess}
                                    onFailure={googleFailure}
                                    cookiePolicy='single_host_origin'
                                    plugin_name='dont work'
                                />
                            </div>
                            <button type="submit" className="bg-transparent block mx-auto font-bold text-center hover:bg-gray-500 text-black-700  hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">Sign In</button>
                            <p className="text-center">
                                Don’t have an account yet? <div className="text-center text-decoration-line: underline">
                                    <Link to='/signup'>Signup</Link>
                                </div>
                            </p>
                            <p className="text-center">
                                <div className="text-center text-decoration-line: underline">
                                    <Link to='/adminlogin'>Admin</Link>
                                </div>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
