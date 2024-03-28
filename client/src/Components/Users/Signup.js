import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
import { signUpAPi, googleauth } from '../../api';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


export default function Signup() {

    const googleSucess = async (res,e) => {
        e.preventDefault()



        try {
            console.log(res)
            const token = res.credential
            const result = jwtDecode(token)
            const response = await googleauth(result)
            const responseData = response.data

            if (responseData.success) {
                toast.success(responseData.message);
                localStorage.setItem('user_token', responseData.token);
                setTimeout(() => {
                    navigate('/')
                }, 1500)
            } else {
                
                toast.error(responseData.message);
            }

            
            navigate('/')
        } catch (error) {
            console.log("error dispatching", error)

        }


    }
    const googleFailure = (error) => {
        console.error('Sign-in failed:', error);


    }

    function validatePassword(password) {
        // Regular expression to match the password criteria
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,15}$/;

        return passwordRegex.test(password);
    
        
    }




    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: ''
    })

    const change = (e) => {
        setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }));
    }
    console.log(user)

    const submit = async (e) => {
        e.preventDefault()

        try {
            console.log(user)
            if (!validatePassword(user.password)) {
                toast.error("Password should between 8-15 atleast 1 numberic, alphabet, special character")

            }
            else if (user.password !== user.confirm_password) {
                toast.error("Password not same")
            }
            else if (user.phone_number.length !== 10) {
                console.log(user.phone_number.split('').length)
                toast.error("Phone number must be 10 digits")
            }
            else {
                const response = await signUpAPi({
                    name: user.name,
                    email: user.email,
                    phone_number: user.phone_number,
                    password: user.password
                })
                const responseData = response.data;
                console.log(responseData)

                if (responseData.success) {

                    toast.success(responseData.message);
                    localStorage.setItem('user_token', responseData.token);
                    setTimeout(() => {
                        navigate('/')
                    }, 1500)
                } else {
                    toast.error(responseData.message);
                }



            }

        }
        catch (error) {
            toast.error("An error occured");
            console.error(error);


        }
    }

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    Media App
                </a>
                <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-black text-center md:text-2xl">
                            Sign Up
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={submit}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                                <input type="text" name='name' value={user.name} id="name" onChange={change}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hello" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input type="email" name="email" value={user.email} id="email" onChange={change}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Your Phone Number</label>
                                <input type="text" name='phone_number' value={user.phone_number} id="number" onChange={change} placeholder="91XXXXXX"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" name='password' value={user.password} id="password" onChange={change} placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                <input type="password" name='confirm_password' value={user.confirm_password} id="password" onChange={change} placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
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

                                        >Google Signup</button>
                                    )}
                                    onSuccess={googleSucess}
                                    onFailure={googleFailure}
                                    cookiePolicy='single_host_origin'
                                    plugin_name='dont work'
                                />
                            </div>
                            <button type="submit" className="bg-transparent block mx-auto font-bold text-center hover:bg-gray-500 text-black-700  hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">Register</button>
                            <p className="text-center">
                                Already have an account yet?
                                <div className="text-center text-decoration-line: underline">
                                    <Link to='/auth'>Sign In</Link>
                                </div>
                            </p>


                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
