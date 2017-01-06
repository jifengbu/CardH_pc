import omitBy from 'lodash/omitBy';
export default {
    list: {},
    update (location, keepData, connectorId) {
        if (keepData) {
            let obj = { connectorId };
            if (typeof keepData === 'object') {
                obj.keepData = keepData;
            }
            this.list[location] = obj;
        } else if (this.list[location]) {
            delete this.list[location];
        }
    },
    getConnectorId (location) {
        return (this.list[location] || {}).connectorId;
    },
    getKeepData (location) {
        return (this.list[location] || {}).keepData;
    },
    removeConnectorId (connectorId) {
        this.list = omitBy(this.list, (o) => o.connectorId === connectorId);
    },
};
