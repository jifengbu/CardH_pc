import {
    GraphQLString,
} from 'graphql';
import { successType } from '../../types/result';

export default {
    type: successType,
    args: {
        phone: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
    },
    async resolve (root, params, options) {
        return { msg: '服务器错误' };
    },
};
