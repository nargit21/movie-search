import {
	ITEMS_FETCH_DATA_SUCCESS,
	ITEMS_IS_LOADING,
	ITEMS_HAS_ERRORED,
	SET_LOGIN_DATA,
	USER_LOGOUT,
	RESET_FETCHED_DATA
} from '../actions/items'
import { combineReducers } from 'redux';

function itemsHasErrored(state = false, action) {
	switch (action.type) {
		case ITEMS_HAS_ERRORED:
			return action.hasErrored;

		default:
			return state;
	}
}

function itemsIsLoading(state = false, action) {
	switch (action.type) {
		case ITEMS_IS_LOADING:
			return action.isLoading;

		default:
			return state;
	}
}

function items(state = null, action) {
	switch (action.type) {
		case ITEMS_FETCH_DATA_SUCCESS:
			return action.items;
		case RESET_FETCHED_DATA:
			return state = null;
		default:
			return state;
	}
}

function loginData(state = null, action) {
	switch (action.type) {
		case SET_LOGIN_DATA:
			return action.data

		default:
			return state;
	}
}

const appReducer = combineReducers({
	items,
	itemsHasErrored,
	itemsIsLoading,
	loginData
})


const rootReducer = (state, action) => {
	if (action.type === USER_LOGOUT) {
		state = undefined
	}

	return appReducer(state, action)
}

export default rootReducer;