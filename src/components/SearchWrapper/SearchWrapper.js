import React from 'react';
import './SearchWrapper.css'

const SearchWrapper = ({children}) => {
    return (
        <div className="SearchWrapper">
            {children}
        </div>
    );
};

export default SearchWrapper;
