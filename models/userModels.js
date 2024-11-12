import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type: String, 
        required: true  
    }, 
    email: {
        type: String,
        required: true 
    }, 
    password: {
        type: String,
        required: true
    }
}, {
    timeStamps: true 
})

userSchema.statics.findOrCreate = async function({googleId, email, name}){
    let user = await this.findOne({email});
    if (!user){
        user = await this.create({email, name, password: googleId}); 
    }
    return user;
};

const User = mongoose.model("User", userSchema);
export default User; 