import React from 'react';

import './Header.css';

const Header = (fn) => (
    <div className="Header">
        <div className="ui action input">
            <input type="text" id="summonerName" name="summonerName" placeholder="소환사명" onChange={fn.handleChange} />
            <button className="ui button" onClick={fn.searchSummoner}>검색</button>
        </div>
    </div>
)

export default Header;
