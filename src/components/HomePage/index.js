import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchField from '../SearchField';
import FilmCards from '../FilmCards';
import { itemsFetchData } from '../../actions/items';
import { Redirect} from 'react-router-dom';

class HomePage extends Component {
	state = {
		searchValue: null,
		prevPage: 1
	}

	fetchDecider(value, newPage, from) {
		const { searchValue } = this.props;
		
		from === 'search' && this.setState(() => ({searchValue: value}), (a, b, v) => {
			if(!value) {
				return this.fetchPopulars(newPage)
			} else {
				return this.fetchTyped(value, newPage)
			}
		})

		if(searchValue) {
			this.fetchTyped(searchValue, newPage)
		} else if (from !== 'search') {
			this.fetchPopulars(newPage)
		} 
			
	}

	fetchTyped(value, page) {
		const { fetchData, loginData } = this.props;
		fetchData(`https://api.themoviedb.org/3/search/movie?api_key=${loginData.key}&language=en-US&query=${value}&page=${page}&include_adult=false`)
	}

	fetchPopulars(page) {
		const { fetchData, loginData } = this.props;
		fetchData(`https://api.themoviedb.org/3/movie/popular?api_key=${loginData.key}&language=en-US&page=${page}`);
	}

	render() {
		const { fetchedItems, loginData } = this.props;
		
		if(!loginData) {
			return <Redirect to='/login' />
		}
		
		return (
			<div className='main-container'>
				<SearchField fetchDecider={(value) => this.fetchDecider(value, 1, 'search')} />
				<FilmCards data={fetchedItems} fetchDecider={(page) => this.fetchDecider(null, page)}/>
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