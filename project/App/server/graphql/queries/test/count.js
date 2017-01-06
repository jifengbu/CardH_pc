import {
    GraphQLInt,
} from 'graphql';

let count = 1;

export default {
    type: GraphQLInt,
    args: {
        num: {
            type: GraphQLInt,
        },
    },
    resolve (root, params, options) {
        return count;
    },
};
