import React from 'react';

const recentSummoners = (data) => {
  return data.recentSummoner.map((summoner, i) => {
      return (
        <div className="item" key={i}>
          <div className="middle aligned content">
            <a className="header">{summoner}</a>
          </div>
        </div>
      );
  });
};

const RecentSummoner = (recentSummoner) => {
    return(
      <div>
          <h3 className="ui header">최근 검색한 소환사</h3>
          <div className="ui divided items">
            {recentSummoners(recentSummoner)}
          </div>
      </div>
    );
}

export default RecentSummoner;
