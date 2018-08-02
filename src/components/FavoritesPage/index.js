import React, { Component } from 'react';
import FilmCards from '../FilmCards';
import { connect } from 'react-redux';
import { getFavorites } from '../../utils/helpers';
import { Typography } from '@material-ui/core/';
import { Redirect} from 'react-router-dom';

class FavoritesPage extends Component {
	state = {
		favorites: [],
	}

	componentDidMount() {
		const { loginData } = this.props;
		
		loginData && this.setState({ favorites: getFavorites(loginData.username) })
	}

	render() {
		const { favorites } = this.state;
		const { loginData } = this.props;
		
		if(!loginData) {
			return <Redirect to='/login' />
		}

		return (
			<div>
				{
					favorites.length === 0 ?
						<Typography align='center' variant='title'>Nothing here</Typography> :
						<FilmCards data={favorites} />
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		loginData: state.loginData
	}
}



export default connect(mapStateToProps)(FavoritesPage);
