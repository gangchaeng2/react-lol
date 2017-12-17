import React from 'react';

import './Header.css';

const Header = ({ searchSummoner, handleChange, summonerName }) => {
    const pressSearch = (e) => {
        if(e.charCode === 13) {
            searchSummoner(e.target.value);
        }
    }

    const search = () => {
        const summonerName = document.getElementById('summonerName').value;
        searchSummoner(summonerName);
    }

    return (
      <div className="Header">
          <div className="ui action input">
              <input type="text" id="summonerName" name="summonerName" placeholder="소환사명" onKeyPress={pressSearch} autoComplete='off' />
              <button className="ui button" onClick={search}>검색</button>
          </div>
      </div>
    );
}

export default Header;
