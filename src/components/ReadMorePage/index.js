import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	Typography,
} from '@material-ui/core/';
import { itemsFetchData } from '../../actions/items';
import { Redirect} from 'react-router-dom';

const styles = {

	media: {
		width: 500,
		height: 0,
		paddingTop: '41.25%',
		float: 'left',
		marginRight: '1%'
	},
	content: {
		marginLeft: '1%'
	},
	link: {
		textDecoration: 'none',
	}
};

class ReadMorePage extends Component {

	componentDidMount() {
		const { match, fetchData, loginData } = this.props;
		loginData && fetchData(`https://api.themoviedb.org/3/movie/${match.params.film}?api_key=${loginData.key}&language=en-US`)
	}

	render() {
		const { fetchedItems, classes, loginData } = this.props;

		if(!loginData) {
			return <Redirect to='/login' />
		}

		return (
			<div>
				<Card>
					<CardHeader
						title={fetchedItems.original_title}
						subheader={fetchedItems.release_date}
					/>
					<CardContent >
						<CardMedia
							className={classes.media}
							title={fetchedItems.title}
							image={`https://image.tmdb.org/t/p/w500${fetchedItems.backdrop_path}`}
						/>
						<Typography component="p">
							{`Budget: ${fetchedItems.budget}$ Revenue: ${fetchedItems.revenue}$`}
						</Typography>
						<Typography component="p">
							{`Status: ${fetchedItems.status}`}
						</Typography>
						<a className={classes.link} href={`https://www.imdb.com/title/${fetchedItems.imdb_id}`}>IMDB LINK</a>
						<Typography
							paragraph={true}
							component="p"
						>
							{fetchedItems.overview}
						</Typography>
					</CardContent>
				</Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReadMorePage));
