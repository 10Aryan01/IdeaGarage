import { Schema,model,models } from "mongoose";

const UserSchema=new Schema({
    email:{
        type: String,
        unique: [true,'Email alreadly Exits'],
        require:[true,'Email is Requiied']
    },
    username:{
        type:String,
        require:[true,'Username cannot is not defined'],
        match:[/^(?=.{8,20}$)(?![_.])(?!.*[._]{2})[a-zA-Z0-9._]+(?<![_.])$/
        ,"Username invalid, it should contain 8-20 alphanumeric letters and be uniqu!"]
    },
    image:{
        type:String,
    }
})

const User=models.User || model("User",UserSchema);
export default User;