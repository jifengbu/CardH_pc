import mongoose from 'mongoose';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import {Strategy} from 'passport-local';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    /*
    * 注册电话
    */
    phone: {
        type: String,
        required: true,
    },
    /*
    * 用户密码
    */
    password: {
        type: String,
    },
    /*
    * 注册邮箱，用来找回密码
    */
    email: {
        type: String,
        trim: true,
    },
    /*
    * 注册时间
    */
    date: {
        type: Date,
        default: Date.now,
    },
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'phone' });
const UserModel = mongoose.model('User', userSchema);
passport.use(new Strategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

export default UserModel;
