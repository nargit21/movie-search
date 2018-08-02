import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import './SearchField.css';

class SearchField extends Component {

	inputHandler = (event) => {
		const { fetchDecider } = this.props;

		fetchDecider(event.target.value)
	}

	render() {
		return (
			<div className='search-container'>
				<TextField
					label="Search"
					fullWidth={true}
					onChange={this.inputHandler}
				/>
			</div>
		)
	}
}

export default SearchField;
