import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const signInControllers = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body, "this is the request body from login of user")

    try {
        
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.json({ message: "User doesn't exist with provided email id", success : false });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.json({ message: 'Invalid Password', success : false });

        const token = jwt.sign({name: existingUser.account_name, email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1d' });
        console.log(token);
        return res.json({ token, message : "Login Successful", success : true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const signUpControllers = async (req, res) => {
    const { name, email, phone_number, password } = req.body;
    console.log("ok it won't work")
    console.log(req.body,"body of request")
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.json({ message: "User Already Exists", success : false });
        console.log(existingUser,"this is for existing user")


        const existingUser1 = await User.findOne({ phone : phone_number });
        if (existingUser1)  return res.json({ message: "Phone Already Exists", success : false });


        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ account_name: name, email:email, password: hashedPassword, phone : phone_number});

        const token = jwt.sign({name: result.name, email: result.email, id: result._id   }, 'test', { expiresIn: '1d' });

        return res.status(200).json({ token, message : "Account Created Successfully", success : true });
        console.log(token, 'is from backend of controllers/users');
    } catch (error) {
        // Handle any errors that occurred during the database query
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", success : false });
    }
};

export const signInAdminControllers = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body, "this is the request body from login of user")

    try {
        
        const req_email = process.env.admin_user

        if(req_email !== email) {
            return res.json({ message: "Incorrect Admin Email", success : false });
        }else{
            const req_password = process.env.admin_password
            if (req_password !== password) {
                return res.json({ message: "Incorrect Admin Email", success : false });
            }
            else {
                const token = jwt.sign({name: 'Admin 1', email: process.env.admin_user, role : 'admin' }, 'test', { expiresIn: '1d' });
                return res.json({ token, message : "Admin Login Successful", success : true });
            }

        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

