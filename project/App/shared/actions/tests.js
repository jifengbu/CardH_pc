import { mutation } from 'relatejs';

export function addCount (data) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                addCount: 1,
            },
        })(dispatch, getState);
    };
}
export function subCount (data) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                subCount: 1,
            },
        })(dispatch, getState);
    };
}
export function addListItem (name) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                addListItem: {
                    id: 1,
                    name: 1,
                },
            },
            variables: {
                addListItem: {
                    name: {
                        value: name,
                        type: 'String!',
                    },
                },
            },
        })(dispatch, getState);
    };
}
export function removeListItem (id) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                removeListItem: 1,
            },
            variables: {
                removeListItem: {
                    id: {
                        value: id,
                        type: 'Int!',
                    },
                },
            },
        })(dispatch, getState);
    };
}
