import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} from 'graphql';

export const testListType = new GraphQLObjectType({
    name: 'testListType',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
    },
});
export const LIST = [
    { id: 1, name: 'fang1' },
    { id: 2, name: 'fang2' },
    { id: 3, name: 'fang3' },
];

export default {
    type: new GraphQLList(testListType),
    args: {
        pageNo: {
            type: GraphQLInt,
        },
        pageSize: {
            type: GraphQLInt,
        },
    },
    resolve (root, params, options) {
        const { pageNo, pageSize } = params;
        const list = [];
        if (pageNo < pageSize) {
            list.push({ id: pageNo * 3 + 1, name: 'fang' + 1 });
            list.push({ id: pageNo * 3 + 2, name: 'fang' + 2 });
            list.push({ id: pageNo * 3 + 3, name: 'fang' + 3 });
        } else {
            list.push({ id: pageNo * 3 + 1, name: 'fang' + 1 });
            list.push({ id: pageNo * 3 + 2, name: 'fang' + 2 });
        }
        return list;
    },
};
