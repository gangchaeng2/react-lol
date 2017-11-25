import React,{Component} from 'react';
import {Match, DonutChart, LaneStats, ChampStats} from '../';

import './MatchList.css';

class MatchList extends Component {
    constructor(props) {
      super(props);

      this.state = {
        style: {
          marginTop: '1rem',
        }
      };
    }

    render() {
      const mapToComponents = (data) => {
        return data.map((match, i) => {
            return (<Match
                match={match}
                key={i}
                />);
        });
      };

      const champStats = (data) => {
        return data.map((champList, i) => {
            return (<ChampStats
                champList={champList}
                key={i}
            />);
        });
      };

      return (
        <div style={this.state.style}>
          <table className="ui celled table">
            <thead>
              <tr>
                <th className="center aligned">최근 20전 승/패 통계</th>
                <th className="center aligned">최근 20전 라인 통계</th>
                <th className="center aligned">최근 20전 챔피언 통계</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <DonutChart
                      totalMatchInfo={this.props.totalMatchInfo}
                  />
                </td>

                <td className="center aligned">
                  <LaneStats
                    totalStats={this.props.totalStats}
                  />
                </td>

                <td className="center aligned">
                  <div className="ui divided items">
                    {champStats(this.props.myInfo)}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

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
            {mapToComponents(this.props.matchList)}
          </table>
        </div>
      );
    }
}

export default MatchList;
