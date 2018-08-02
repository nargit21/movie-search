export const ITEMS_FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS';
export const ITEMS_IS_LOADING = 'ITEMS_IS_LOADING';
export const ITEMS_HAS_ERRORED = 'ITEMS_HAS_ERRORED';
export const SET_LOGIN_DATA = 'SET_LOGIN_DATA';
export const USER_LOGOUT = 'USER_LOGOUT';
export const RESET_FETCHED_DATA = 'RESET_FETCHED_DATA';

export function itemsHasErrored(bool) {
    return {
        type: ITEMS_HAS_ERRORED,
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: ITEMS_IS_LOADING,
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: ITEMS_FETCH_DATA_SUCCESS,
        items
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url)
            .then((response) => {
                dispatch(itemsIsLoading(false));

                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function loginData(data) {
    return {
        type: SET_LOGIN_DATA,
        data
    }
}

export function logout() {
    return {
        type: USER_LOGOUT
    }
}

export function resetFetchedData() {
    return {
        type: RESET_FETCHED_DATA
    }
}