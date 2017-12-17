import React from 'react';
import { Item } from 'semantic-ui-react';

import * as utils from '../../services/utils';

const rankItem = (rankInfoList) => {
    let rankInfoChange = [];
    if(rankInfoList.length > 1) {
        rankInfoChange = rankInfoChange.concat(rankInfoList[1]).concat(rankInfoList[0]);
    }

    return rankInfoChange.map((rankInfo, i) => {
        const tireSrc = `//opgg-static.akamaized.net/images/medals/${rankInfo.tier.toLowerCase()}_${utils.getTierNum(rankInfo.rank)}.png`;

        return(
          <Item key={i}>
            <Item.Image size='small' src={tireSrc} />

            <Item.Content verticalAlign='middle'>
              <Item.Header>{rankInfo.queueType === 'RANKED_FLEX_SR' ? '자유랭크' : '솔로랭크'}</Item.Header><br/>
              <Item.Header>{rankInfo.tier} {rankInfo.rank}</Item.Header>
              <Item.Meta>
                <span className='cinema'>{rankInfo.leagueName}</span>
              </Item.Meta>
              <Item.Description>{rankInfo.leaguePoints}LP / {rankInfo.wins}승 {rankInfo.losses}패</Item.Description>
              <Item.Description><b>승률 : {(rankInfo.wins/(rankInfo.wins+rankInfo.losses)*100).toFixed(2)}%</b></Item.Description>
            </Item.Content>
          </Item>
        );
    });
};

const SummonerInfo = ({summonerInfo, summonerRankInfo, summonerStatus, summonerName}) => {
    const lastLogin = new Date(summonerInfo.revisionDate).toLocaleString();

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
        {rankItem(summonerRankInfo)}
      </Item.Group>
    )
}

export default SummonerInfo;
