import React from 'react';
import { Route, IndexRoute } from 'react-router';
import request from 'superagent';
import Admin from 'screens/admin';
import Statistics from 'screens/admin/screens/statistics';
import Applications from 'screens/admin/screens/applications';
import ApplicationDetail from 'screens/admin/screens/applications/screens/detail';
import Alarms from 'screens/admin/screens/alarms';
import AlarmDetail from 'screens/admin/screens/alarms/screens/detail';
import Feedback from 'screens/admin/screens/feedback';
import Notify from 'screens/admin/screens/notify';

let firstEntry = true;

function authenticate (nextState, replaceState, callback) {
    if (typeof window !== 'undefined' && !firstEntry) {
        request
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
            query: 'query { session }',
        })
        .end((error, result) => {
            if (error || !result.body.data.session) {
                window.location.href = '/admin/login';
            } else {
                callback();
            }
        });
    } else {
        firstEntry = false;
        callback();
    }
}

export default [
    <Route name='admin' path='/admin' component={Admin}>
        <Route name='adminApplications' path='applications'>
            <IndexRoute component={Applications} onEnter={authenticate} />
            <Route name='adminApplicationDetail' path='detail' component={ApplicationDetail} onEnter={authenticate} />
        </Route>
        <Route name='adminAlarms' path='alarms'>
            <IndexRoute component={Alarms} onEnter={authenticate} />
            <Route name='adminAlarmDetail' path='detail' component={AlarmDetail} onEnter={authenticate} />
        </Route>
        <Route name='adminStatistics' path='statistics' component={Statistics} onEnter={authenticate} />
        <Route name='adminFeedback' path='feedback' component={Feedback} onEnter={authenticate} />
        <Route name='adminNotify' path='notify' component={Notify} onEnter={authenticate} />
    </Route>,
];
