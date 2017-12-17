import React from 'react';
import './MatchDetail.css';
import { Modal, Image, Table, Progress } from 'semantic-ui-react';


import * as utils from '../../services/utils.js';

const tableTeamInfo = (teams, maxDamage, searchSummoner) => {
    return teams.map((teamInfo, i) => {
        const { firstBlood, firstRiftHerald, towerKills, baronKills, dragonKills, teamId, win } = teamInfo.gameInfo;
        const teamColor = teamId === 100 ? 'blue-team' : 'red-team';
        const teamWin = win === 'Win' ? true : false;

        let totalKill = 0;
        let totalDeath = 0;
        let totalAssist = 0;

        teamInfo.summonersInfo.forEach((summoner, i) => {
            totalKill = totalKill + summoner.stats.kills;
            totalDeath = totalDeath + summoner.stats.deaths;
            totalAssist = totalAssist + summoner.stats.assists;
            // summonersInfo에 소환사 명 추가
            teamInfo.summonersInfo[i].summonerName = teamInfo.identity[i].player.summonerName;
        });

        const teamStats = {
            firstBlood,
            firstRiftHerald,
            towerKills,
            baronKills,
            dragonKills,
            teamId,
            totalKill,
            totalDeath,
            totalAssist
        };

        let gameInfo = teamInfo.summonersInfo;
        gameInfo = gameInfo.concat(teamStats);
        
        // 레드팀인 경우 배열을 reverse 시킨다.
        if(teamId === 200) {
            gameInfo = gameInfo.slice(0).reverse();
        }

        return gameInfo.map((data, i) => {
            if((i === 0 && data.teamId === 200) || (i === gameInfo.length - 1 && data.teamId === 100)) {
                return (
                    <Table.Row className={data.teamId === 100 ? 'blue-team' : 'red-team'} textAlign='center' key={i}>
                        <Table.Cell colSpan={2}>
                            <b>{teamWin ? '승리팀' : '패배팀'}</b>
                        </Table.Cell>
                        <Table.Cell colSpan={2}>
                            <Image shape='rounded' size='mini' className='detail-image' src={`//z.fow.kr/img/common/score.png`} alt=''/> <b> {totalKill} / {totalDeath} / {totalAssist} </b>
                        </Table.Cell>
                        <Table.Cell colSpan={3}>
                            <b>
                            {data.firstBlood ? '선취점 / ' : ''}
                            {data.firstRiftHerald ? '협곡의 전령 처치 / ' : ''}
                            포탑 : {data.towerKills} /
                            드래곤 : {data.dragonKills} /
                            바론 : {data.baronKills}
                            </b>
                        </Table.Cell>
                    </Table.Row>
                );
            } else {
                return (
                    <Table.Row key={i} className={teamColor} onClick={() => searchSummoner(data.summonerName)}>
                        <Table.Cell collapsing>
                            <Image src={`http://iplol.co.kr/images/champ_2015/${data.championId}.png`} avatar={true} shape='rounded' size='mini' className='detail-image' /> <span className='summoner-name'><b>{data.summonerName}</b></span>
                        </Table.Cell>

                        <Table.Cell collapsing textAlign='center'>
                            <Image src={`http://iplol.co.kr/images/spell/${data.spell1Id}.jpg`} shape='rounded' size='mini' alt="" className='detail-image'/><Image src={`http://z.fow.kr/img/perk/${data.stats.perkPrimaryStyle}.png?v=2`} shape='rounded' size='mini' alt="" className='detail-image'/><br/>
                            <Image src={`http://iplol.co.kr/images/spell/${data.spell2Id}.jpg`} shape='rounded' size='mini' alt="" className='detail-image'/><Image src={`http://z.fow.kr/img/perk/${data.stats.perkSubStyle}.png?v=2`} shape='rounded' size='mini' alt="" className='detail-image'/>
                        </Table.Cell>

                        <Table.Cell collapsing textAlign='center'>
                            {data.stats.champLevel}
                        </Table.Cell>

                        <Table.Cell collapsing textAlign='center'>
                            <b>{data.stats.kills} / <span className='total-death'>{data.stats.deaths}</span> / {data.stats.assists}</b><br/>
                            <b>({((data.stats.kills + data.stats.assists) / data.stats.deaths).toFixed(2)})</b>
                        </Table.Cell>

                        <Table.Cell collapsing textAlign='center'>
                            <Image src={`http://iplol.co.kr/images/items_201706/${data.stats.item0}.png`} shape='rounded' size='mini' className='detail-image'/>
                            <Image src={`http://iplol.co.kr/images/items_201706/${data.stats.item1}.png`} shape='rounded' size='mini' className='detail-image'/>
                            <Image src={`http://iplol.co.kr/images/items_201706/${data.stats.item2}.png`} shape='rounded' size='mini' className='detail-image'/>
                            <Image src={`http://iplol.co.kr/images/items_201706/${data.stats.item3}.png`} shape='rounded' size='mini' className='detail-image'/>
                            <Image src={`http://iplol.co.kr/images/items_201706/${data.stats.item4}.png`} shape='rounded' size='mini' className='detail-image'/>
                            <Image src={`http://iplol.co.kr/images/items_201706/${data.stats.item5}.png`} shape='rounded' size='mini' className='detail-image'/>
                            <Image src={`http://iplol.co.kr/images/items_201706/${data.stats.item6}.png`} shape='rounded' size='mini' className='detail-image'/>
                        </Table.Cell>

                        <Table.Cell collapsing textAlign='center'>
                            <b>{utils.setNumberFormat(data.stats.goldEarned)}<br/>
                            {data.stats.neutralMinionsKilled + data.stats.totalMinionsKilled}</b>
                        </Table.Cell>

                        <Table.Cell>
                            <Progress value={Math.round(data.stats.totalDamageDealtToChampions / maxDamage*100)} total='100' color='red'>
                                {utils.setNumberFormat(data.stats.totalDamageDealtToChampions)}
                            </Progress>
                        </Table.Cell>
                    </Table.Row>
                );
            }
        });
    });
}

const MatchDetail = ({ detailMatchInfo, open, hideDetailMatchInfo, searchSummoner }) => {
    // console.log(detailMatchInfo.teamArr);

    return (
      <Modal dimmer={true} open={open} closeIcon={true} onClose={hideDetailMatchInfo} closeOnDimmerClick={hideDetailMatchInfo}>
        <Modal.Content image scrolling className='detail-game'>
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
              {tableTeamInfo(detailMatchInfo.teamArr, detailMatchInfo.maxDamage, searchSummoner)}
            </Table.Body>
          </Table>
        </Modal.Content>
      </Modal>
    );
}

export default MatchDetail;
