import React, { useState, useEffect } from 'react'
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"

export default function Navbar() {
    const navigate = useNavigate()
    const [user, setUser] = useState(false)
    const [extUser, setExtUser] = useState(null)
    const [menu, setMenu] = useState(false)

    const [mounted, setMounted] = useState(false);
    

    useEffect(() => {
        setMounted(true);
    }, []);

    // const toggleMenu = () => {
    //     setMenu(!menu)
    // }

    const logout = () => {
        localStorage.removeItem("user_token")
        setUser(false)
        setExtUser('')
        navigate('/auth')
    }

    console.log("Component is rendering"); // Log before component renders



    useEffect(() => {
        console.log("useEffect is getting mounted");
        const getUser = localStorage.getItem("user_token");
        console.log("Token from localStorage:", getUser); // Log retrieved token

        if (getUser) {
            setUser(true);
            let decodedToken = jwtDecode(getUser);
            let somevar = JSON.parse(JSON.stringify(decodedToken));
            setExtUser(somevar);
            console.log(somevar);
        }
    }, [user]); // Empty dependency array


    console.log("calling from navbar")
    console.log("calling from navbar")

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!menu || e.target.closest('.relative.flex.rounded-full')) return; // Ignore clicks within toggler or dropdown
            setMenu(false);
        };

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside); // Cleanup on unmount
    }, [menu]);


    return (
        <>
            <nav className="bg-[#EEEEEE] border-2 ring-slate-900">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-1">
                    <div className="relative flex h-16 items-center sm:justify-between">
                    <button
                            component={Link} to="/"
                            onClick={extUser?.role === 'user' ? () => navigate("/") : undefined}
                        >
                            <h1 className="sm:pr-5 font-extrabold text-3xl font-mono mb-2 sm:mb-0">MEDIA APP</h1>
                        </button>
                        
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            {/* <div className="flex flex-shrink-0 lg:items-center"> */}
                            {/* <button onClick={() => router.push("/")}>
                                    <img className="w-8 h-8 sm:mr-2" src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/comment-blog-icon.png" alt="logo" />
                                </button> */}
                            {/* </div> */}
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {extUser ? (<div className="relative ml-3">
                                <div>
                                    <button type="button" id="dropdownToggleButton" data-dropdown-toggle="dropdownToggle"
                                        className={`relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2   ${menu ? "focus:ring-white focus:ring-offset-2" : "focus:ring-offset-gray-800"} `}
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                        onClick={() => setMenu(!menu)}>
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        {/* <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                                        <Avatar name={extUser?.name} className="rounded-full" size="50" />
                                    </button>
                                </div>
                                {menu && (<div id="dropdownToggleButton" data-dropdown-toggle="dropdownToggle" className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                                <button
                                        onClick={extUser?.role === 'user' ? () =>  navigate("/profilepage") : undefined}
                                    >
                                        <a id="dropdownToggleButton" className="block px-4 py-2 text-sm text-gray-700 font-semibold" role="menuitem" tabIndex={-1} id="user-menu-item-0">Your Profile</a>
                                    </button>
                                    <button
                                        onClick={logout}
                                    >
                                        <a id="dropdownToggleButton" className="block px-4 py-2 text-sm text-gray-700 font-semibold" role="menuitem" tabIndex={-1} id="user-menu-item-1">Sign Out</a>
                                    </button>
                                </div>)}
                            </div>) : (
                                <button
                                    onClick={() => navigate("/auth")}
                                    className="bg-transparent  hover:bg-gray-500 text-black font-bold  hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded-lg">Login</button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container mx-auto px-10 mb-8 bg-gray-300 ">
                <title>Media App</title>
                <link rel="icon" href="favion.ico" />
            </div>
        </>

    )
}
