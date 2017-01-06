import mongoose from 'mongoose';
import moment from 'moment';
const Schema = mongoose.Schema;

const consumeSchema = new mongoose.Schema({
    /*
    * 商家Id
    */
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    /*
    * 电话
    */
    phone: {
        type: String,
    },
    /*
    * 每次消费后的余额
    */
    leftMoney: {
        type: Number,
    },
    /*
    * 消费金额
    */
    fee: {
        type: Number,
    },
    /*
    * 备注
    */
    remark: {
        type: String,
    },
    /*
    * 消费时间
    */
    date: {
        type: Date,
        default: Date.now,
    },
});
consumeSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        ret.date = moment(ret.date).format('YYY-MM-DD');
        delete ret._id;
        delete ret.__v;
        return ret;
    },
};
export default mongoose.model('Consume', consumeSchema);
