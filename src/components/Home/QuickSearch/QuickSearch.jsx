import { useEffect, useMemo, useCallback, useReducer } from 'react';

import { getLocalStorage, debounceMethod } from '../../../common/commonMethods.jsx';

/** Import CSS */
import './QuickSearch.css';

export default function QuickSearch(props) {

    const [state, dispatch] = useReducer((newState, action) => {

        switch (action.type) {

            case 'setCurrentSearch':
                return {
                    ...newState,
                    currentSearch: action.payLoad
                };

            case 'setCurrentSearchAndCloseDropdown':
                return {
                    currentSearch: action.payLoad,
                    showDropdown: false
                };

            case 'toggleDropdown':
                return {
                    ...newState,
                    showDropdown: !newState.showDropdown
                };

            case 'closeDropdown':
                return {
                    ...newState,
                    showDropdown: false
                };
        }
    }, {
        currentSearch: '',
        showDropdown: false
    });

    useEffect(() => {
        loadFilteredMovies(state.currentSearch);
    }, [state.currentSearch]);

    /** Debouced Search */
    const loadFilteredMovies = useCallback(debounceMethod((search) => {
        if (search !== '') {
            props.fetchMoviesByName(search);

        }
    }, 1000), []);

    /** Load Previously Searched Items */
    const prevSearchedItems = useMemo(() => {
        let searchedItem = getLocalStorage(props.user.id);
        if (searchedItem) {
            return JSON.parse(searchedItem);
        }
        return [];
    }, [state.showDropdown]);

    return (
        <div className='quick-search'>
            <input id="search" type="text" value={state.currentSearch}
                className='quick-search-input' placeholder='Search by Title'
                onFocus={() => dispatch({ type: 'closeDropdown' })}
                onInput={(event) => dispatch({ type: 'setCurrentSearch', payLoad: event.target.value })}
            />
            <span className='toggle-dropdown-invert' onClick={() => dispatch({ type: 'toggleDropdown' })}>^</span>
            {state.showDropdown &&
                <div className='quick-search-list'>
                    {prevSearchedItems.length ?
                        prevSearchedItems.map((searchedItem, i) => {
                            return (
                                <div key={i} className='quick-search-list-item' title={searchedItem}
                                    onClick={() => dispatch({ type: 'setCurrentSearchAndCloseDropdown', payLoad: searchedItem })}
                                >
                                    {searchedItem}
                                </div>)
                        }) :
                        <div className='quick-search-list-item'>No Suggestions</div>
                    }
                </div>
            }
        </div>
    )
}