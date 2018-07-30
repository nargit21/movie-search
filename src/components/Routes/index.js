import React, { Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from '../LoginPage';
import HomePage from '../HomePage';
import Header from '../Header';
import FavoritesPage from '../FavoritesPage';

const Routes = () => {
	return (
		<Fragment>
			<Route path='/home' component={Header} />
			<Switch>
				<Route exact path='/' render={() => <Redirect to='/login' />} />
				<Route path='/login' component={Login} />
				<Route exact path='/home' component={HomePage} />
				<Route path='/home/favorites' component={FavoritesPage} />
			</Switch>
		</Fragment>
	)
}

export default Routes;