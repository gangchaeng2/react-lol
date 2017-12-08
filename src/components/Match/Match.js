import React from 'react';
import TeamInfo from './TeamInfo';
import { Image } from 'semantic-ui-react';
import * as utils from '../../services/utils';

import './Match.css';

const Match = ({ match }) => {
    const lastDate = new Date(match.gameCreation);

    let strDate = (lastDate.getUTCMonth()) + ' 달 전';
    if(strDate === '0 달 전') {
        strDate = (lastDate.getUTCDate() - 1) + ' 일 전';
    }
    if(strDate === '0 일 전') {
        strDate = (lastDate.getUTCHours()) + ' 시간 전';
    }

    return (
        <tbody>
          <tr className={match.stats.win ? "" : "negative"}>
            <td className="center aligned">
                {match.stats.win ? "Win" : "Loss"}
            </td>

            <td className="center aligned">
                {match.gameType}
            </td>

            <td className="center aligned">
                {match.stats.kills} / {match.stats.deaths} / {match.stats.assists}
            </td>

            <td className="center aligned">
                <img src={`http://iplol.co.kr/images/champ_2015/${match.champion}.png`} alt=""/><br/>
                {match.championName}
            </td>

            <td className="center aligned">
                <Image src={`http://iplol.co.kr/images/spell/${match.spell1}.jpg`} shape='rounded' size='mini' alt=""/><br/>
                <Image src={`http://iplol.co.kr/images/spell/${match.spell2}.jpg`} shape='rounded' size='mini' alt=""/>
            </td>

            <td className="center aligned">
                <table className='detail-table'>
                    <tbody>
                          <TeamInfo
                              team={match.team1}
                          />
                          <TeamInfo
                              team={match.team2}
                          />
                    </tbody>
                </table>
            </td>

            <td className="center aligned">
                <table className='detail-table'>
                    <tbody>
                        <tr>
                            <td>
                              <Image src={`http://iplol.co.kr/images/items_201706/${match.stats.item0}.png`} shape='rounded' size='mini' />
                            </td>

                            <td>
                              <Image src={`http://iplol.co.kr/images/items_201706/${match.stats.item1}.png`} shape='rounded' size='mini' />
                            </td>

                            <td>
                              <Image src={`http://iplol.co.kr/images/items_201706/${match.stats.item2}.png`} shape='rounded' size='mini' />
                            </td>

                            <td>
                              <Image src={`http://iplol.co.kr/images/items_201706/${match.stats.item6}.png`} shape='rounded' size='mini' />
                            </td>
                        </tr>

                        <tr>
                            <td>
                              <Image src={`http://iplol.co.kr/images/items_201706/${match.stats.item3}.png`} shape='rounded' size='mini' />
                            </td>

                            <td>
                              <Image src={`http://iplol.co.kr/images/items_201706/${match.stats.item4}.png`} shape='rounded' size='mini' />
                            </td>

                            <td>
                              <Image src={`http://iplol.co.kr/images/items_201706/${match.stats.item5}.png`} shape='rounded' size='mini' />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>

            <td className="center aligned">
                Level : {match.stats.champLevel} <br/>
              <b>Gold : {utils.setNumberFormat(match.stats.goldEarned)}</b> <br/>
                CS : {match.stats.neutralMinionsKilled + match.stats.totalMinionsKilled} ({((match.stats.neutralMinionsKilled + match.stats.totalMinionsKilled) / match.gameDuration).toFixed(1)})
            </td>

            <td className="center aligned">
                {strDate}<br/>
                {match.gameDuration}분
            </td>
          </tr>
        </tbody>
    );
}

export default Match;
