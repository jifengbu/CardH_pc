import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    /*
    * 商家Id
    */
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    /*
    * 反馈内容
    */
    content: {
        type: String,
        required: true,
    },
    /*
    * 注册邮箱，用来找回密码
    */
    email: {
        type: String,
    },
    /*
    * 反馈时间
    */
    date: {
        type: Date,
        default: Date.now,
    },
});

feedbackSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        return ret;
    },
};
export default mongoose.model('Feedback', feedbackSchema);
