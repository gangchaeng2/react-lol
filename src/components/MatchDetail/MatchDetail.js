import React from 'react';
import { Modal, Image, Button, Icon, Table, Progress } from 'semantic-ui-react';
import './MatchDetail.css';

import * as utils from '../../services/utils.js';

const teamStats = (team, teamGameInfo) => {
    let totalKill = 0;
    let totalDeath = 0;
    let totalAssist = 0;
    const teamWin = teamGameInfo.win === 'Win' ? true : false;
    const {firstBlood, firstRiftHerald, towerKills, baronKills, dragonKills, teamId} = teamGameInfo;

    team.forEach((summoner, i) => {
        totalKill = totalKill + summoner.stats.kills;
        totalDeath = totalDeath + summoner.stats.deaths;
        totalAssist = totalAssist + summoner.stats.assists;
    });

    return(
        <Table.Row className={teamId === 100 ? 'blue-team' : 'red-team'} textAlign='center'>
            <Table.Cell colSpan={2}>
                <b>{teamWin ? '승리팀' : '패배팀'}</b>
            </Table.Cell>
            <Table.Cell colSpan={2}>
                <Image shape='rounded' size='mini' className='detail-image' src={`//z.fow.kr/img/common/score.png`} alt=''/> <b> {totalKill} / {totalDeath} / {totalAssist} </b>
            </Table.Cell>
            <Table.Cell colSpan={3}>
                <b>
                  {firstBlood ? '선취점 / ' : ''}
                  {firstRiftHerald ? '협곡의 전령 처치 / ' : ''}
                  포탑 : {towerKills} /
                  드래곤 : {dragonKills} /
                  바론 : {baronKills}
                </b>
            </Table.Cell>
        </Table.Row>
    )
}

const teamInfo = (team, teamIdenty, maxDamage, teamColor, searchSummoner) => {
    return team.map((summoner, i) => {
        return(
            <Table.Row key={i} className={teamColor} onClick={() => searchSummoner(teamIdenty[i].player.summonerName)}>
              <Table.Cell collapsing>
                <Image src={`http://iplol.co.kr/images/champ_2015/${summoner.championId}.png`} avatar={true} shape='rounded' size='mini' className='detail-image' /> <span className='summoner-name'><b>{teamIdenty[i].player.summonerName}</b></span>
              </Table.Cell>

              <Table.Cell collapsing textAlign='center'>
                <Image src={`http://iplol.co.kr/images/spell/${summoner.spell1Id}.jpg`} shape='rounded' size='mini' alt="" className='detail-image'/><Image src={`http://z.fow.kr/img/perk/${summoner.stats.perkPrimaryStyle}.png?v=2`} shape='rounded' size='mini' alt="" className='detail-image'/><br/>
                <Image src={`http://iplol.co.kr/images/spell/${summoner.spell2Id}.jpg`} shape='rounded' size='mini' alt="" className='detail-image'/><Image src={`http://z.fow.kr/img/perk/${summoner.stats.perkSubStyle}.png?v=2`} shape='rounded' size='mini' alt="" className='detail-image'/>
              </Table.Cell>

              <Table.Cell collapsing textAlign='center'>
                  {summoner.stats.champLevel}
              </Table.Cell>

              <Table.Cell collapsing textAlign='center'>
                  <b>{summoner.stats.kills} / <span className='total-death'>{summoner.stats.deaths}</span> / {summoner.stats.assists}</b><br/>
                  <b>({((summoner.stats.kills + summoner.stats.assists) / summoner.stats.deaths).toFixed(2)})</b>
              </Table.Cell>

              <Table.Cell collapsing textAlign='center'>
                  <Image src={`http://iplol.co.kr/images/items_201706/${summoner.stats.item0}.png`} shape='rounded' size='mini' className='detail-image'/>
                  <Image src={`http://iplol.co.kr/images/items_201706/${summoner.stats.item1}.png`} shape='rounded' size='mini' className='detail-image'/>
                  <Image src={`http://iplol.co.kr/images/items_201706/${summoner.stats.item2}.png`} shape='rounded' size='mini' className='detail-image'/>
                  <Image src={`http://iplol.co.kr/images/items_201706/${summoner.stats.item3}.png`} shape='rounded' size='mini' className='detail-image'/>
                  <Image src={`http://iplol.co.kr/images/items_201706/${summoner.stats.item4}.png`} shape='rounded' size='mini' className='detail-image'/>
                  <Image src={`http://iplol.co.kr/images/items_201706/${summoner.stats.item5}.png`} shape='rounded' size='mini' className='detail-image'/>
                  <Image src={`http://iplol.co.kr/images/items_201706/${summoner.stats.item6}.png`} shape='rounded' size='mini' className='detail-image'/>
              </Table.Cell>

              <Table.Cell collapsing textAlign='center'>
                  <b>{utils.setNumberFormat(summoner.stats.goldEarned)}<br/>
                  {summoner.stats.neutralMinionsKilled + summoner.stats.totalMinionsKilled}</b>
              </Table.Cell>

              <Table.Cell>
                  <Progress value={Math.round(summoner.stats.totalDamageDealtToChampions/maxDamage*100)} total='100' color='red'>
                      {utils.setNumberFormat(summoner.stats.totalDamageDealtToChampions)}
                  </Progress>
              </Table.Cell>
            </Table.Row>
        );
    });
}

const MatchDetail = ({ detailMatchListInfo, open, onHide, searchSummoner }) => {
    const {team1, team2, team1Identy, team2Identy, maxDamage, team1GameInfo, team2GameInfo} = detailMatchListInfo;

    return (
      <Modal dimmer={true} open={open}>
        <Modal.Header>
          경기상세정보
          <Button color='black' onClick={onHide} floated='right' icon>
            <Icon name='close'/>
          </Button>
        </Modal.Header>
        <Modal.Content scrolling className='detail-game-content'>
          <Table className='detail-table'>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell>Champ & Name</Table.HeaderCell>
                <Table.HeaderCell>Spell & Rune</Table.HeaderCell>
                <Table.HeaderCell>Level</Table.HeaderCell>
                <Table.HeaderCell>KDA</Table.HeaderCell>
                <Table.HeaderCell>Items</Table.HeaderCell>
                <Table.HeaderCell>Gold & CS</Table.HeaderCell>
                <Table.HeaderCell>Damage</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {teamInfo(team1, team1Identy, maxDamage, 'blue-team', searchSummoner)}
              {teamStats(team1, team1GameInfo)}
              {teamStats(team2, team2GameInfo)}
              {teamInfo(team2, team2Identy, maxDamage, 'red-team', searchSummoner)}
            </Table.Body>
          </Table>
        </Modal.Content>
      </Modal>
    );
}

export default MatchDetail;
