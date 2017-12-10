import React from 'react';
import { DonutChart, LaneStats, ChampStats, SummonerInfo } from '../';
import './SearchResult.css';

const champStats = (data, getMatchListByChampion) => {
  return data.map((champList, i) => {
      if(i < 4){
        return (
            <ChampStats
              champList={champList}
              getMatchListByChampion={getMatchListByChampion}
              key={i}
            />
        );
      }
  });
};

const SearchResult = ({ summoner, rating, summonerName, totalMatchInfo, myInfo, totalStats, getMatchListByChampion, soloRating, freeRating }) => {
    return (
      <table className="ui celled table">
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
              <SummonerInfo
                  summoner={summoner}
                  summonerName={summonerName}
                  soloRating={soloRating}
                  freeRating={freeRating}
              />
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

export default SearchResult;
