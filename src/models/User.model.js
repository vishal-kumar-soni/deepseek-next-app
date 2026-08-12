import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    image: {
        type: String,
        required:false
    },
   
}, { timestamps: true })

export default  UserModel = mongoose.models.UserModel || mongoose.model('User', UserSchema)