import React from 'react';
import { Item } from 'semantic-ui-react';

const SummonerInfo = ({summoner, soloRating, freeRating, summonerName}) => {
    return (
      <Item.Group divided>
        <Item>
          <Item.Image size='small' src={`//opgg-static.akamaized.net/images/profile_icons/profileIcon${summoner.profileIconId}.jpg`} />

          <Item.Content verticalAlign='middle'>
            <Item.Header>{summonerName}</Item.Header>
            <Item.Meta>
              <span className='cinema'>{summoner.revisionDate}</span>
            </Item.Meta>
            <Item.Description>{summoner.status ? "현재 게임중 입니다." : "현재 게임중이 아닙니다."}</Item.Description>
          </Item.Content>
        </Item>

        <Item>
          <Item.Image size='small' src={soloRating.soloTierSrc} />

          <Item.Content verticalAlign='middle'>
            <Item.Header>솔로랭크</Item.Header><br/>
            <Item.Header>{soloRating.tier} {soloRating.rank}</Item.Header>
            <Item.Meta>
              <span className='cinema'>{soloRating.leagueName}</span>
            </Item.Meta>
            <Item.Description>{soloRating.leaguePoints}LP / {soloRating.wins}승 {soloRating.losses}패</Item.Description>
            <Item.Description>승률 : {(soloRating.wins/(soloRating.wins+soloRating.losses)*100).toFixed(2)}%</Item.Description>
          </Item.Content>
        </Item>

        <Item>
          <Item.Image size='small' src={freeRating.freeTierSrc} />

          <Item.Content verticalAlign='middle'>
            <Item.Header>자유랭크</Item.Header><br/>
            <Item.Header>{freeRating.tier} {freeRating.rank}</Item.Header>
            <Item.Meta>
              <span className='cinema'>{freeRating.leagueName}</span>
            </Item.Meta>
            <Item.Description>{freeRating.leaguePoints}LP / {freeRating.wins}승 {freeRating.losses}패</Item.Description>
            <Item.Description>승률 : {(freeRating.wins/(freeRating.wins+freeRating.losses)*100).toFixed(2)}%</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    )
}

export default SummonerInfo;
