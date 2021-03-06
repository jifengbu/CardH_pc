import forEach from 'lodash/forEach';
import union from 'lodash/union';
import warning from 'warning';

import iterateNode from '../helpers/iterate-node';
import Connectors from './connectors';

export default class Store {
    constructor () {
        // Connectors interface
        this.connectors = new Connectors();
    }

    // #isMutation - Boolean
    processIncoming ({ data, fragments, connectors, isMutation }) {
        console.log('[relatejs]: processIncoming', { data, fragments, connectors, isMutation });
        let connectorsToUpdate = connectors && Object.keys(connectors) || [];
        let allNodes = [];

        forEach(fragments, (fragment, queryName) => {
            const relativeNodes = data[queryName];

            // Process data to connectors
            if (connectors) {
                this.connectors.processConnectors(
                    connectors,
                    queryName,
                    relativeNodes,
                );
            }

            // If mutation check if some connector is listening
            if (isMutation) {
                connectorsToUpdate = union(
                    connectorsToUpdate,
                    this.connectors.checkMutationListeners(queryName, relativeNodes)
                );
            }
        });

        // Calculate connectors that need to be changed
        const changes = {};
        forEach(connectorsToUpdate, (connectorId) => {
            if (this.connectors.connectorExists(connectorId)) {
                changes[connectorId] = this.connectors.generateConnectorData(connectorId);
            }
        });
        return changes;
    }

    // Remove a data connector
    deleteConnector (connectorId) {
        this.connectors.deleteConnector(connectorId);
    }
}
