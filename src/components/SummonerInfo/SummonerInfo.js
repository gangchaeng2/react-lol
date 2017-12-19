import React from 'react';
import { Item } from 'semantic-ui-react';

import * as utils from '../../services/utils';

const rankItem = (rankInfo) => {
    const tireSrc = `//opgg-static.akamaized.net/images/medals/${rankInfo[0].tier.toLowerCase()}_${utils.getTierNum(rankInfo[0].rank)}.png`;

    return(
      <Item>
        <Item.Image size='small' src={tireSrc} />

        <Item.Content verticalAlign='middle'>
          <Item.Header>{rankInfo[0].queueType === 'RANKED_FLEX_SR' ? '자유랭크' : '솔로랭크'}</Item.Header><br/>
          <Item.Header>{rankInfo[0].tier} {rankInfo[0].rank}</Item.Header>
          <Item.Meta>
            <span className='cinema'>{rankInfo[0].leagueName}</span>
          </Item.Meta>
          <Item.Description>{rankInfo[0].leaguePoints}LP / {rankInfo[0].wins}승 {rankInfo[0].losses}패</Item.Description>
          <Item.Description><b>승률 : {(rankInfo[0].wins/(rankInfo[0].wins+rankInfo[0].losses)*100).toFixed(2)}%</b></Item.Description>
        </Item.Content>
      </Item>
    );
};

const SummonerInfo = ({summonerInfo, summonerRankInfo, summonerStatus, summonerName}) => {
    const lastLogin = new Date(summonerInfo.revisionDate).toLocaleString();
    const soloRank = summonerRankInfo.filter(function(data){
      return data.queueType === "RANKED_SOLO_5x5";
    });
    const freeRank = summonerRankInfo.filter(function(data){
      return data.queueType === "RANKED_FLEX_SR";
    });

    return (
      <Item.Group divided>
        <Item>
          <Item.Image size='small' src={`//opgg-static.akamaized.net/images/profile_icons/profileIcon${summonerInfo.profileIconId}.jpg`} />
          <Item.Content verticalAlign='middle'>
            <Item.Header>{summonerInfo.name}</Item.Header>
            <Item.Meta>
              <span className='cinema'>{lastLogin}</span>
            </Item.Meta>
            <Item.Description>{summonerStatus ? "현재 게임중 입니다." : "현재 게임중이 아닙니다."}</Item.Description>
          </Item.Content>
        </Item>
        {soloRank.length > 0 &&
          rankItem(soloRank)
        }
        {freeRank.length > 0 &&
          rankItem(freeRank)
        }
      </Item.Group>
    )
}

export default SummonerInfo;
