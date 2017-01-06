import {
    GraphQLInputObjectType,
    GraphQLString,
} from 'graphql';
import UserModel from '../../../models/user';
import { successType } from '../../types/result';

export const userRegisterType = new GraphQLInputObjectType({
    name: 'userRegisterType',
    fields: {
        phone: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
    },
});

function registerUser (user, password) {
    return new Promise((resolve) => {
        UserModel.register(user, password, (error) => {
            if (error) {
                resolve(error.name);
            }
            resolve();
        });
    });
}

export default {
    type: successType,
    args: {
        data: {
            type: userRegisterType,
        },
    },
    async resolve (root, params, options) {
        const { phone, password, email } = params.data;
        const user = new UserModel({
            phone,
            email,
        });
        let error = await registerUser(user, password);
        if (!error) {
            return { success: true, msg: '注册成功' };
        } else if (error === 'UserExistsError') {
            return { success: false, msg: '该账号已经被占用' };
        } else {
            return { success: false, msg: '注册失败' };
        }
    },
};
