import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    code: {type:Number}
})


export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema)