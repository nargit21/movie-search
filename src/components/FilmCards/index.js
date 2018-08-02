import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	Avatar,
	IconButton,
	Typography,
	Button,
	Tooltip
} from '@material-ui/core/';
import { pink, blue } from '@material-ui/core/colors/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import { favoriteControl, getFavorites } from '../../utils/helpers';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';

const styles = theme => ({
	card: {
		width: 400,
	},
	cardsContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	image: {
		height: 331,
		paddingTop: '56.25%',
	},
	cardFooter: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	userRaiting: {
		backgroundColor: pink[700],
	},
	cardHeader: {
		height: 70
	},
	filmDescription: {
		width: 350,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	cardContainer: {
		margin: '1%'
	},
	pagination: {

	},
	link: {
		textDecoration: 'none',
		color: blue[700]
	},
	readmoreButton: {
		minHeight: 0,
	},
	ul: {
		marginLeft: '45%',
	},
	li: {
		display: 'table-cell',
		height: 100,
		verticalAlign: 'middle',
	},
	paginationContainer: {
		alignItems: 'center'
	}
})

class FilmCards extends Component {
	state = {
		highlighted: [],
	}

	checkforHighlight(id) {
		const { highlighted } = this.state;
		const result = highlighted.find(value => value.id === id);
		return result ? 'error' : 'action';
	}

	buttonHandler(value) {
		const { loginData } = this.props;
		this.setState({ highlighted: favoriteControl(value, loginData.username) })
	}

	componentDidMount() {
		const { loginData } = this.props;
		const favorites = getFavorites(loginData.username)
		this.setState({ highlighted: favorites ? favorites : [] })
	}

	paginationButtonHandler = (page) => {
		const { fetchDecider } = this.props;
		fetchDecider(page)
	}

	render() {
		const { data, classes } = this.props;
		const dataManager = Array.isArray(data) ? data : data.results;
		return (
			<div>
				<div className={classes.cardsContainer}>
					{
						dataManager.map(value => {
							return (
								<div className={classes.cardContainer} key={value.id}>
									<Card className={classes.card} raised={true}>
										<CardHeader
											action={
												<Avatar
													aria-label="User raiting"
													className={classes.userRaiting}
												>
													{value.vote_average}
												</Avatar>
											}
											className={classes.cardHeader}
											title={value.title}
											subheader={value.release_date}
										/>
										<CardMedia
											className={classes.image}
											title={value.title}
											image={`https://image.tmdb.org/t/p/w500${value.poster_path}`}
										/>
										<CardContent>
											<Typography
												className={classes.filmDescription}
												component="p"
											>
												{value.overview}
											</Typography>
										</CardContent>
										<CardContent className={classes.cardFooter}>
											<Tooltip disableFocusListener title="Add to favorite">
												<IconButton
													aria-label="Add to favorites"
													onClick={() => this.buttonHandler(value)}
												>
													<FavoriteIcon color={this.checkforHighlight(value.id)} />
												</IconButton>
											</Tooltip>
											<Button
												size="small"
												color="primary"
												className={classes.readmoreButton}
											>
												<Link to={`/home/${value.id}`} className={classes.link}>
													Read More
												</Link>
											</Button>
										</CardContent>
									</Card>
								</div>
							)
						})
					}
				</div>
				{!Array.isArray(data) &&
					<div className={classes.paginationContainer}>
						<Pagination
							className={classes.pagination}
							innerClass={classes.ul}
							itemClass={classes.li}
							linkClass={classes.linkPagination}
							activePage={data && data.page}
							itemsCountPerPage={20}
							totalItemsCount={data && data.total_pages}
							pageRangeDisplayed={10}
							onChange={this.paginationButtonHandler}
						/>
					</div>}
			</div>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		loginData: state.loginData,
	};
};

export default connect(mapStateToProps)(withStyles(styles)(FilmCards));