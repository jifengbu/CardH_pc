import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import moment from 'moment';
const Schema = mongoose.Schema;

const clientSchema = new mongoose.Schema({
    /*
    * 商家Id
    */
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    /*
    * 名称
    */
    name: {
        type: String,
        required: true,
    },
    /*
    * 性别 0:男   1:女
    */
    sex: {
        type: Number,
    },
    /*
    * 年龄
    */
    age: {
        type: Number,
    },
    /*
    * 电话
    */
    phone: {
        type: String,
    },
    /*
    * 邮箱
    */
    email: {
        type: String,
    },
    /*
    * 余额
    */
    leftMoney: {
        type: Number,
    },
    /*
    * 预计每次消费的金额
    */
    costMoney: {
        type: Number,
    },
    /*
    * 打折额度
    */
    discount: {
        type: Number,
    },
    /*
    * 单价
    */
    unit: {
        type: Number,
    },
    /*
    * 有效期（年）
    */
    period: {
        type: Number,
    },
    /*
    * 注册时间
    */
    date: {
        type: Date,
        default: Date.now,
    },
    /*
    * 备注
    */
    remark: {
        type: String,
    },
});

autoIncrement.initialize(mongoose);
clientSchema.plugin(autoIncrement.plugin, {
    model: 'Client',
    field: 'card',
    startAt: 100000,
    incrementBy: 1,
});
clientSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        ret.date = moment(ret.date).format('YYYY-MM-DD');
        delete ret._id;
        delete ret.__v;
        return ret;
    },
};
export default mongoose.model('Client', clientSchema);
