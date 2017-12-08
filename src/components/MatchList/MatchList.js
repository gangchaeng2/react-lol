import React from 'react';
import { Match } from '../';

import './MatchList.css';

const MatchList = ({ matchList }) => {
    const printMatch = (data) => {
      return data.map((match, i) => {
          return (
            <Match
              match={match}
              key={i}
            />
          );
      });
    };

    return (
      <div className="match-list">
        <table className="ui celled table">
          <thead>
            <tr>
              <th className="center aligned">win/loss</th>
              <th className="center aligned">gameType</th>
              <th className="center aligned">KDA</th>
              <th className="center aligned">champion</th>
              <th className="center aligned">spell</th>
              <th className="center aligned">teamInfo</th>
              <th className="center aligned">items</th>
              <th className="center aligned">level/gold/cs</th>
              <th className="center aligned">playTime</th>
            </tr>
          </thead>
          {printMatch(matchList)}
        </table>
      </div>
    );
}

export default MatchList;
