import React, { useEffect, useState } from 'react';
import { Router } from '@reach/router';
import Layout from '../components/layout';
import Profile from '../components/profile';
import RouteBase from '../components/route-base';
import RouteSecret from '../components/route-secret';
import RouteLogin from '../components/route-login';
import { navigate } from 'gatsby';
import IdentityModal from 'react-netlify-identity-widget';

import 'react-netlify-identity-widget/styles.css';
import PrivateRoute from '../components/private-route';

const Dashboard = ({ location }) => {
    const [isVisible, setVisibilty] = useState(false);
    useEffect(() => {
        if (location.pathname.match(/^\/dashboard\/?$/)) {
            navigate('/dashboard/login', { replace: true});
        }
    }, [location.pathname]);

    const showModal = () => setVisibilty(true);

    return (
        <Layout>
            <Profile showModal={showModal} />
            <Router>
                <PrivateRoute path="/dashboard/base" component={RouteBase} />
                <PrivateRoute path="/dashboard/secret" component={RouteSecret} />
                <RouteLogin path="/dashboard/login" showModal={showModal}/>
            </Router>
            <IdentityModal showDialog={isVisible} onCloseDialog={() => setVisibilty(false)} />
        </Layout>
    )
}

export default Dashboard;
