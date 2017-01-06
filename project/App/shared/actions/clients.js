import { mutation } from 'relatejs';

export const actionTypes = {
    recharge: 'CLIENTS_RECHARGE',
    deduct: 'CLIENTS_DEDUCT',
    newCard: 'CLIENTS_NEW_CARD',
};
export function recharge (phone, money, context, callback) {
    const type = actionTypes.recharge;
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                recharge: { success: 1, msg: 1, context },
            },
            variables: {
                recharge: {
                    phone: {
                        value: phone,
                        type: 'String!',
                    },
                    money: {
                        value: money,
                        type: 'Int!',
                    },
                },
            },
        }, (result) => {
            callback(result.recharge);
        })(dispatch, getState);
    };
}
export function deduct (phone, money, remark, context, callback) {
    const type = actionTypes.deduct;
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                deduct: { success: 1, msg: 1, context },
            },
            variables: {
                deduct: {
                    phone: {
                        value: phone,
                        type: 'String!',
                    },
                    money: {
                        value: money,
                        type: 'Int!',
                    },
                    remark: {
                        value: remark,
                        type: 'String!',
                    },
                },
            },
        }, (result) => {
            callback(result.deduct);
        })(dispatch, getState);
    };
}
export function newCard (data, context, callback) {
    const type = actionTypes.newCard;
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                newCard: { success: 1, msg: 1, context },
            },
            variables: {
                newCard: {
                    data: {
                        value: data,
                        type: 'cardInputType!',
                    },
                },
            },
        }, (result) => {
            callback(result.newCard);
        })(dispatch, getState);
    };
}
