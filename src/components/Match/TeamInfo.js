import React from 'react';
import { Image } from 'semantic-ui-react';

const TeamInfo = ({ team }) =>  {
    return (
          <tr>
            {team.summonersInfo.map((summoner, i) => {
                return (
                  <td key={i}>
                    <Image src={`http://iplol.co.kr/images/champ_2015/${summoner.championId}.png`} shape='rounded' size='mini' />
                  </td>
                );
            })}
          </tr>

    );
}


export default TeamInfo;
