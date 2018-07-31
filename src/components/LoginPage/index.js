import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Typography } from '@material-ui/core';
import { itemsFetchData, loginData } from '../../actions/items';
import CircularProgress from '@material-ui/core/CircularProgress';

import './LoginPage.css';

class Login extends Component {
	state = {
		nicknameInput: null,
		keyInput: null,
	}

	buttonHandler() {
		const { nicknameInput, keyInput } = this.state;
		const { setLoginData, fetchData } = this.props;
		setLoginData({ username: nicknameInput.toLowerCase(), key: keyInput })
		fetchData(`https://api.themoviedb.org/3/movie/popular?api_key=${keyInput}&language=en-US&page=1`);
	}

	componentDidUpdate() {
		const { items, history } = this.props;

		if (items) {
			history.push('/home')
		}
	}

	inputHandler(inputName, event) {
		this.setState({
			[inputName]: event.target.value
		})
	}

	render() {
		const { isLoading, hasErrored } = this.props;

		return (
			<div className='login-page-container'>
				<div className='login-content-container'>
					<form className='login-form'>
						<TextField
							name='nickname'
							fullWidth={true}
							label='Nickname'
							onChange={(event) => this.inputHandler('nicknameInput', event)}
							defaultValue='Nargit'
							required={true}
						/>
						<TextField
							fullWidth={true}
							name='api-key'
							label="API key"
							required={true}
							error={hasErrored}
							onChange={(event) => this.inputHandler('keyInput', event)}
							defaultValue='7370c4e7078c5e5d5ad0b58ce292d84e'
						/>
						{!hasErrored && <div className='login-key-error'></div>}
						{hasErrored && <Typography color='error'>Enter valid key</Typography>}

						<Button
							disabled={isLoading}
							onClick={() => this.buttonHandler()}
							color="primary"
						>
							LOGIN
     					</Button>
						{isLoading && <CircularProgress />}
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		items: state.items,
		hasErrored: state.itemsHasErrored,
		isLoading: state.itemsIsLoading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchData: (url) => dispatch(itemsFetchData(url)),
		setLoginData: (data) => dispatch(loginData(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);