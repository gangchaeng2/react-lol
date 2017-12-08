import React from 'react';
import { DonutChart, LaneStats, ChampStats } from '../';
import './SummonerInfo.css';

const champStats = (data, getMatchListByChampion) => {
  return data.map((champList, i) => {
      return (
          <ChampStats
            champList={champList}
            getMatchListByChampion={getMatchListByChampion}
            key={i}
          />
      );
  });
};

const SummonerInfo = ({ summoner, rating, name, totalMatchInfo, myInfo, totalStats, getMatchListByChampion }) => {
    return (
      <table className="ui celled collapsing table">
        <thead>
          <tr>
            <th className="center aligned">소환사 정보</th>
            <th className="center aligned">최근 챔피언 통계</th>
            <th className="center aligned">최근 라인 통계</th>
            <th className="center aligned">최근 승/패 통계</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <div className="ui centered cards">
                <div className="card">
                  <div className="ui fluid image">
                    <div className="ui large black ribbon label">
                        Level : {summoner.summonerLevel}
                    </div>
                    <img src={`//opgg-static.akamaized.net/images/profile_icons/profileIcon${summoner.profileIconId}.jpg`} alt=""/>
                  </div>
                  <div className="content summoner-info">
                    <div className="header">{name}</div>
                    <div className="meta">
                        {summoner.revisionDate}
                    </div>
                    <div className="description">
                      {summoner.status ? "현재 게임중 입니다." : "현재 게임중이 아닙니다."}
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="image">
                    <img src={rating.tierSrc} alt=""/>
                  </div>
                  <div className="content summoner-info">
                    <div className="header">{rating.tier} {rating.rank}</div>
                    <div className="meta">
                      <span className="date">{rating.leagueName}</span>
                    </div>
                    <div className="description">
                      {rating.leaguePoints}LP / {rating.wins}승 {rating.losses}패
                    </div>
                  </div>
                </div>
              </div>
            </td>

            <td className="center aligned">
              <div className="ui divided items">
                {champStats(myInfo, getMatchListByChampion)}
              </div>
            </td>

            <td className="center aligned">
              <LaneStats
                totalStats={totalStats}
              />
            </td>

            <td>
              <DonutChart
                  totalMatchInfo={totalMatchInfo}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
}

export default SummonerInfo;
