import React,{Component} from 'react';
import TeamInfo from './TeamInfo';
import { Image } from 'semantic-ui-react';

import './Match.css';

class Match extends Component {
  render() {
    const lastDate = new Date(this.props.match.gameCreation);
    let strDate = (lastDate.getUTCDate() - 1) + ' 일 전';
    if(strDate === '0 일 전') {
      strDate = (lastDate.getUTCHours()) + ' 시간 전';
    }

    return (
        <tbody>
          <tr className={this.props.match.stats.win ? "" : "negative"}>
            <td className="center aligned">
                {this.props.match.stats.win ? "Win" : "Loss"}
            </td>

            <td className="center aligned">
                {this.props.match.gameType}
            </td>

            <td className="center aligned">
                {this.props.match.stats.kills} / {this.props.match.stats.deaths} / {this.props.match.stats.assists}
            </td>

            <td className="center aligned">
                <img src={`http://iplol.co.kr/images/champ_2015/${this.props.match.champion}.png`} alt=""/><br/>
                {this.props.match.championName}
            </td>

            <td className="center aligned">
                <Image src={`http://iplol.co.kr/images/spell/${this.props.match.spell1}.jpg`} shape='rounded' size='mini' alt=""/>
                <Image src={`http://iplol.co.kr/images/spell/${this.props.match.spell2}.jpg`} shape='rounded' size='mini' alt=""/>
            </td>

            <td className="center aligned">
                <table>
                    <tbody>
                          <TeamInfo
                              team={this.props.match.team1}
                          />
                          <TeamInfo
                              team={this.props.match.team2}
                          />
                    </tbody>
                </table>
            </td>

            <td className="center aligned">
                <table>
                    <tbody>
                        <tr>
                            <td>
                              <Image src={`http://iplol.co.kr/images/items_201706/${this.props.match.stats.item0}.png`} shape='rounded' size='mini' />
                            </td>

                            <td>
                              <Image src={`http://iplol.co.kr/images/items_201706/${this.props.match.stats.item1}.png`} shape='rounded' size='mini' />
                            </td>

                            <td>
                              <Image src={`http://iplol.co.kr/images/items_201706/${this.props.match.stats.item2}.png`} shape='rounded' size='mini' />
                            </td>

                            <td>
                              <Image src={`http://iplol.co.kr/images/items_201706/${this.props.match.stats.item6}.png`} shape='rounded' size='mini' />
                            </td>
                        </tr>

                        <tr>
                            <td>
                              <Image src={`http://iplol.co.kr/images/items_201706/${this.props.match.stats.item3}.png`} shape='rounded' size='mini' />
                            </td>

                            <td>
                              <Image src={`http://iplol.co.kr/images/items_201706/${this.props.match.stats.item4}.png`} shape='rounded' size='mini' />
                            </td>

                            <td>
                              <Image src={`http://iplol.co.kr/images/items_201706/${this.props.match.stats.item5}.png`} shape='rounded' size='mini' />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>

            <td className="center aligned">
                Level : {this.props.match.stats.champLevel} <br/>
                <b>Gold : {this.props.match.stats.goldEarned}</b> <br/>
                CS : {this.props.match.stats.neutralMinionsKilled + this.props.match.stats.totalMinionsKilled} ({((this.props.match.stats.neutralMinionsKilled + this.props.match.stats.totalMinionsKilled) / this.props.match.gameDuration).toFixed(1)})
            </td>

            <td className="center aligned">
                {strDate}<br/>
                {this.props.match.gameDuration}분
            </td>
          </tr>
        </tbody>
    );
  }
}

export default Match;
