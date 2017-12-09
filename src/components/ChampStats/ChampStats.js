import React from 'react';
import './ChampStat.css';

const ChampStat = ({ champList, getMatchListByChampion }) => {
    return(
        <div className="item">
          <div className="ui tiny image">
            <img src={`http://iplol.co.kr/images/champ_2015/${champList.champion}.png`} alt=""/>
          </div>
          <div className="content champ-stat">
              <a className="header" onClick={() => getMatchListByChampion(champList.champion)}>{champList.name}</a>
              <div className="meta">
                  <span>{champList.title}</span>
              </div>
              <b>{champList.win} 승 / {champList.loss} 패 ( {champList.winPercent} )</b>
              <br/>
              <b>{champList.kill} / <span className='total-death'>{champList.death}</span> / {champList.assist} ( {champList.average} )</b>
          </div>
        </div>
    );
}


export default ChampStat;
