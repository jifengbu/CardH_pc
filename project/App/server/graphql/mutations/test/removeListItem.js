import {
    GraphQLBoolean,
    GraphQLInt,
} from 'graphql';
import _ from 'lodash';
import { LIST } from '../../queries/test/list';

export default {
    type: GraphQLInt,
    args: {
        id: {
            type: GraphQLInt,
        },
    },
    async resolve (root, params) {
        const { id } = params;
        _.remove(LIST, (item) => item.id === id);
        return id;
    },
};
