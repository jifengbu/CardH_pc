import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
} from 'graphql';

export const clientType = new GraphQLObjectType({
    name: 'clientType',
    fields: {
        name: { type: GraphQLString },
        sex: { type: GraphQLInt },
        age: { type: GraphQLInt },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        card: { type: GraphQLString },
        date: { type: GraphQLString },
        leftMoney: { type: GraphQLFloat },
        leftTimes: { type: GraphQLInt },
        costMoney: { type: GraphQLFloat },
        discount: { type: GraphQLFloat },
        unit: { type: GraphQLFloat },
        discountUnit: { type: GraphQLFloat },
        period: { type: GraphQLInt },
        expiryDate: { type: GraphQLString },
        remark: { type: GraphQLString },
    },
});

export const consumeRecordType = new GraphQLObjectType({
    name: 'consumeRecordType',
    fields: {
        fee: { type: GraphQLFloat },
        leftMoney: { type: GraphQLFloat },
        date: { type: GraphQLString },
        remark: { type: GraphQLString },
    },
});

export const cardInputType = new GraphQLInputObjectType({
    name: 'cardInputType',
    fields: {
        name: { type: GraphQLString },
        sex: { type: GraphQLInt },
        age: { type: GraphQLInt },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        leftMoney: { type: GraphQLFloat },
        discount: { type: GraphQLFloat },
        unit: { type: GraphQLFloat },
        period: { type: GraphQLInt },
        remark: { type: GraphQLString },
    },
});
