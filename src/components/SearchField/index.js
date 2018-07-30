import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import './SearchField.css';

class SearchField extends Component {

	inputHandler(event) {
		this.props.inputHandler(event.target.value)
	}

	render() {
		return (
			<div className='search-container'>
				<TextField
					label="Search"
					fullWidth={true}
					onChange={(event) => this.inputHandler(event)}
				/>
			</div>
		)
	}
}


export default SearchField;