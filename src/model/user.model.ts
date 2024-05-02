import  {Schema , model , models} from "mongoose";

const UserSchema = new Schema(
    {
        authID: String,
        name:  String,
        email: String,
        whatsApp: String,
        dep : String,
        isPaid: Boolean,
        CardRecieved: Boolean,
    },{
        timestamps: true,
    }
)

const UserModel = (models.User) || model("User", UserSchema);

export default UserModel;