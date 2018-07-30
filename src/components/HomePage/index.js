import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchField from '../SearchField';
import FilmCards from '../FilmCards';
import { itemsFetchData } from '../../actions/items';

class HomePage extends Component {
	state = {
		page: 1,
	}

	fetchTyped(value) {
		const { fetchData } = this.props;
		value ?
			fetchData(`https://api.themoviedb.org/3/search/movie?api_key=${fetchData.key}&language=en-US&query=${value}&page=1&include_adult=false`)
			:
			fetchData(`https://api.themoviedb.org/3/movie/popular?api_key=${fetchData.key}&language=en-US&page=1`);
	}

	render() {
		const { fetchedItems } = this.props;
		return (
			<div className='main-container'>
				<SearchField inputHandler={(value) => this.fetchTyped(value)} />
				<FilmCards data={fetchedItems} />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		loginData: state.loginData,
		fetchedItems: state.items
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchData: (url) => dispatch(itemsFetchData(url)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);