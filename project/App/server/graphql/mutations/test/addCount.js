import {
    GraphQLBoolean,
    GraphQLInt,
} from 'graphql';

export default {
    type: GraphQLInt,
    async resolve (root, params) {
        return 10;
    },
};
