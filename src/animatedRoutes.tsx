import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import PrivateRoute from 'views/auth/signIn/privateRoute';
import SignIn from 'views/auth/signIn/login';
import Register from 'views/auth/signIn/register';

function AnimatedRoutes() {
    const location = useLocation()

    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x:window.innerWidth }}
            transition={{ duration: 0.1 }}
        >
                <Switch location={location} key={location.pathname}>
                    <Route path={`/auth`} component={AuthLayout} />
                    <PrivateRoute path={`/admin`} component={AdminLayout} />
                    <Route path = "*" component={SignIn} />
                    <Route path={`/rtl`} component={RTLLayout} />
                    <Route path="/signIn/register" component={Register} />
                    {/* <Route path={`/userregister`} component={Register} /> */}
                    {/* <Redirect from='/' to='/admin' /> */}
                </Switch>
        </motion.div>
    )
}

export default AnimatedRoutes
