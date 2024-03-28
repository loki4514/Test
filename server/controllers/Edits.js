import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


export const viewControllers = async (req, res) => {
    const { id  } = req.query; // Access email from query parameters
    console.log(id, "this is the email from query parameters");

    try {
        const user = await User.findOne({ id });
        // console.log(user)
        return res.json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}; 

export const updateControllers = async (req, res) => {
    const { name, bio, phone, email,photo, password, account_view } = req.body;
    const { id } = req.params;

    console.log(id,"mit bor how are you")
    console.log(req.body)

    try {
        // Find the existing user by ID
        const existingUser = await User.findById({_id : id});
        console.log(existingUser)

        // Check if user with the provided ID exists
        if (!existingUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Check if email is being changed
        if (email && existingUser.email !== email) {
            // Check if the new email already exists in the database
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.json({ message: "Email already exists", success: false });
            }
        } else if (phone && existingUser.phone !== phone) { // Check if phone number is being changed
            // Check if the new phone number already exists in the database
            const phoneExists = await User.findOne({ phone });
            if (phoneExists) {
                return res.json({ message: "Phone number already exists", success: false });
            }
        }

        // Update user details if no conflicts found
        if (name) existingUser.account_name = name;
        if (bio) existingUser.bio = bio;
        if (phone) existingUser.phone = phone;
        if (email) existingUser.email = email;
        if (photo) existingUser.photo = photo
        if (account_view) existingUser.account_view = account_view;
        
        // Update password only if provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12);
            existingUser.password = hashedPassword;
        }

        // Save the updated user details
        await existingUser.save();

        // Return success response

        const token = jwt.sign({name: existingUser.account_name, img : existingUser.photo, email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1d' });
        console.log(token);
        return res.json({ token, message : "profile Update Successful", success : true });

    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};


export const getUserControllers = async (req,res) => {
    try {
        const user = await User.find({account_view : 'public'})
        return res.json(user)
    }catch (error) {
        return res.status(500).json({message : "Internal Server error",success : false})
    }
}



export const getUserAllControllers = async (req,res) => {
    try {
        const user = await User.find()
        return res.json(user)
    }catch (error) {
        return res.status(500).json({message : "Internal Server error",success : false})
    }
}