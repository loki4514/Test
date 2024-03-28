import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    photo: { type: String,default : 'https://i.stack.imgur.com/l60Hf.png' },
    account_name: { type: String, required: true },
    bio: { type: String,default:"hello there" },
    phone: { type: String,unique: true },
    email: { type: String, required: true,unique: true },
    password: { type: String, },
    roles: { type: String, default: "user" }, // Set default value for roles as ["user"]
    account_view: { type: String, enum: ["private", "public"], default: "public" }, // Enum for account visibility with default "always"

});

export default mongoose.model("User", userSchema);