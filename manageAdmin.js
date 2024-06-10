import mongoose from "mongoose"
import Admin from "./models/admin.js"
import bcrypt from "bcrypt"

mongoose.connect(process.env.MONGO_URI)

const createAdmin = async (name, username, password) =>{
    try {
        // Check if the username already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            throw new Error('Username already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin instance
        const newAdmin = new Admin({
            name,
            username,
            password: hashedPassword
        });

        // Save the new admin to the database
        await newAdmin.save();
        console.log('Admin created successfully');
    }
    catch (error) {
        console.error('Error creating admin:', error.message);
    }
}

const deleteAdmin = async (username, password) =>{
     try {
        // Find the admin by username
        const admin = await Admin.findOne({ username });

        // If admin not found
        if (!admin) {
            throw new Error('Admin not found');
        }
        
        // Check if password is correct
        const isPwdCorrect = bcrypt.compare(password, admin.password)
        if(!isPwdCorrect){
            throw new Error("Wrong Password")
        }

        // Delete the admin
        await Admin.findByIdAndDelete(admin._id)
        console.log('Admin deleted successfully');
    }
    catch (error) {
        console.error('Error deleting admin:', error.message);
    }
}