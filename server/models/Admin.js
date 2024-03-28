import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String,required : true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    roles: { type: String, default: "admin" }, // Set default value for roles as ["user"]
   // Enum for account visibility with default "always"
});

export default mongoose.model("Admin", AdminSchema);