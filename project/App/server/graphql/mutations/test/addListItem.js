import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} from 'graphql';

import { testListType, LIST } from '../../queries/test/list';

export default {
    type: testListType,
    args: {
        name: {
            type: GraphQLString,
        },
    },
    async resolve (root, params) {
        const item = { id: LIST[LIST.length - 1].id + 1, name: params.name };
        LIST.push(item);
        return item;
    },
};
