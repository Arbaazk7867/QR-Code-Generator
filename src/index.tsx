import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import AnimatedRoutes from 'animatedRoutes';
// import Register from 'components/register/UserRegister';
// import AllUsers from 'views/admin/dataTables/components/AllUsersTable';

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<HashRouter>
			{/* <Switch>
					<Route path={`/auth`} component={AuthLayout} />
					<Route path={`/admin`} component={AdminLayout} />
					<Route path={`/rtl`} component={RTLLayout} /> */}
					{/* <Route path={`/userregister`} component={Register} /> */}
					{/* <Redirect from='/' to='/admin' /> */}
				{/* </Switch> */}
				<AnimatedRoutes/>
			</HashRouter>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
