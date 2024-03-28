import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getAdmin,updateProfile} from "../../api";
import { jwtDecode } from "jwt-decode";
import FileBase from "react-file-base64";


export default function EditProfile() {
    const navigate = useNavigate();
    const [id,setId] = useState('')

    const [userData, setUserData] = useState({
        photoType: '',
        name: "",
        photo: null,
        email: "",
        bio: "",
        phone_number: "",
        password: "",
        confirm_password: "",
        account_view: "",
    });
    console.log(userData)

    useEffect(() => {
        const fetchData = async () => {
            const getUser = localStorage.getItem("user_token");
            try {
                if (getUser) {
                    let decodedToken = jwtDecode(getUser);
                    const somevar = JSON.parse(JSON.stringify(decodedToken));
                    setId(somevar.id)
                    console.log(somevar.id)
                    const response = await getAdmin(somevar.id);
                    const user = response.data;
                    console.log(user, "this is for user");
                    setUserData({
                        name: user.account_name,
                        phone_number: user.phone,
                        email: user.email,
                        bio: user.bio,
                        // photo: user.photo || "", // Set photo if available, or empty string
                        account_view: user.account_view,
                        // Populate other fields similarly
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    const change = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileUpload = (file) => {
        if (file && file.base64) {
            setUserData({
                ...userData,
                photoType: 'upload', // Update photoType
                photo: file.base64, // Update photo with base64 representation of uploaded file
            });
        }
    };

    // Function to handle URL input change
    const handleUrlChange = (event) => {
        setUserData({
            ...userData,
            photoType: 'url', // Update photoType
            photo: event.target.value, // Update photo with URL entered by the user
        });
    };

    // Function to handle dropdown change
    const handleTypeChange = (e) => {
        setUserData({ ...userData, photoType: e.target.value });
    };

    console.log(userData)

    const submit = async (e) => {
        e.preventDefault();

        try {
            
            if (userData.password !== userData.confirm_password) {
                toast.error("Password not same");
                

            } else if (userData.phone_number === '' && userData.phone_number.length !== 10) {
                toast.error("Phone number must be 10 digits");
            } else {
                console.log(id,userData)
                const response = await updateProfile(id,userData);
                const responseData = response.data;

                console.log(responseData);

                if (responseData.success) {
                    toast.success(responseData.message);
                    localStorage.setItem("user_token", responseData.token);
                    setTimeout(() => {
                        navigate("/");
                    }, 1500);
                } else {
                    toast.error(responseData.message);
                }
            }
        } catch (error) {
            toast.error("An error occured");
            console.error(error);
        }
    };

    return (
        <>
            <>
                <Toaster position="top-center" reverseOrder={false} />
                <br>
                </br>
                <div className="flex flex-col lg:mt-[75px] items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-black text-center md:text-2xl">
                                Edit
                            </h1>
                            <form
                                className="space-y-4 md:space-y-6"
                                action="#"
                                onSubmit={submit}
                            >
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={userData.name}
                                        id="name"
                                        onChange={change}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Hello"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Your Bio
                                    </label>
                                    <input
                                        type="text"
                                        name="bio"
                                        value={userData.bio}
                                        id="name"
                                        onChange={change}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Hello"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        id="email"
                                        onChange={change}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Your Profile
                                    </label>
                                    {/* Dropdown to select upload or URL */}
                                    <select
                                        value={userData.photoType}
                                        onChange={handleTypeChange}
                                        className="bg-gray-50 border pb-3 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="">Select file type</option>
                                        <option value="upload">Upload Image</option>
                                        <option value="url">Image URL</option>
                                    </select>
                                    {/* Display FileBase component if upload option is selected */}
                                    {userData.photoType === 'upload' && (
                                        <FileBase
                                            type="file"
                                            multiple={false}
                                            onDone={handleFileUpload}
                                        />
                                    )}
                                    {/* Input field for URL if URL option is selected */}
                                    {userData.photoType === 'url' && (
                                        <input
                                            type="text"
                                            name="photoUrl"
                                            placeholder="Image URL"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={userData.photo}
                                            onChange={handleUrlChange}
                                        />
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Your Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        value={userData.phone_number}
                                        id="number"
                                        onChange={change}
                                        placeholder="91XXXXXX"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={userData.password}
                                        id="password"
                                        onChange={change}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirm_password"
                                        value={userData.confirm_password}
                                        id="password"
                                        onChange={change}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        
                                    />
                                </div>
                                <div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Account Type
                                        </label>
                                        <input
                                            type="radio"
                                            id="public"
                                            name="account_view"
                                            value="public"
                                            checked={userData.account_view === "public"}
                                            onChange={change}
                                        />
                                        <label htmlFor="public" className="pr-5">Public</label>

                                        <input
                                            type="radio"
                                            id="private"
                                            name="account_view"
                                            value="private"
                                            checked={userData.account_view === "private"}
                                            onChange={change}
                                        />
                                        <label htmlFor="private">Private</label>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-transparent block mx-auto font-bold text-center hover:bg-gray-500 text-black-700  hover:text-white py-2 px-4 border border-black hover:border-transparent rounded"
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
}
