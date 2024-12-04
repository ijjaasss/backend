import userModel from "../models/userModel.js";

export const alllusers= async (req,res)=>{
    try {
        const users = await userModel.find({});
        const nonAdminUsers = users.filter(user => user.role !== 1);
     
        
        res.status(200).send({
            success: true,
            users:nonAdminUsers
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error fetching users',
        });
    }
}