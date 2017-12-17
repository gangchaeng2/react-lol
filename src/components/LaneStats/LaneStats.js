import React from 'react';

const LaneStats = ({ summonerLaneStats })  => {
    return(
      <div className="ui massive aligned divided list">
        <div className="item">
          <img className="ui avatar image" src="https://vignette.wikia.nocookie.net/leagueoflegends/images/e/ef/Top_icon.png/revision/latest?cb=20170515021434" alt=""/><br/>
          <div className="middle aligned content">
            <b>{summonerLaneStats.top}</b>
          </div>
        </div>
        <div className="item">
          <img className="ui avatar image" src="https://vignette.wikia.nocookie.net/leagueoflegends/images/1/1b/Jungle_icon.png/revision/latest?cb=20170515021433" alt=""/><br/>
          <div className="middle aligned content">
            <b>{summonerLaneStats.jg}</b>
          </div>
        </div>
        <div className="item">
          <img className="ui avatar image" src="https://vignette.wikia.nocookie.net/leagueoflegends/images/9/98/Middle_icon.png/revision/latest?cb=20161112025312" alt=""/><br/>
          <div className="middle aligned content">
            <b>{summonerLaneStats.mid}</b>
          </div>
        </div>
        <div className="item">
          <img className="ui avatar image" src="https://vignette.wikia.nocookie.net/leagueoflegends/images/9/97/Bottom_icon.png/revision/latest?cb=20161112025314" alt=""/><br/>
          <div className="middle aligned content">
            <b>{summonerLaneStats.ad}</b>
          </div>
        </div>
        <div className="item">
          <img className="ui avatar image" src="https://vignette.wikia.nocookie.net/leagueoflegends/images/e/e0/Support_icon.png/revision/latest?cb=20170515021434" alt=""/><br/>
          <div className="middle aligned content">
            <b>{summonerLaneStats.sp}</b>
          </div>
        </div>
      </div>
    );
}

export default LaneStats;
