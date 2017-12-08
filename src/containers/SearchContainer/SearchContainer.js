import React, {Component} from 'react';
import { Grid, Segment, Dimmer, Loader, Select } from 'semantic-ui-react';
import axios from 'axios';

import { Header, MatchList, SummonerInfo, RecentSummoner } from '../../components';
import * as service from '../../services/search';
import * as utils from '../../services/utils';
import * as champ from '../../services/champions';

class SearchContainer extends Component {
    constructor(props) {
        super(props);

        const arr = utils.getRecentSummoer('');

        this.state = {
            loadingStatus: null,
            summonerName: '',
            summoner: {
                id: null,
                accountId: null,
                profileIconId: null,
                summonerLevel: null,
                revisionDate: null,
                status: null
            },
            rating: {
                tier: null,
                tierSrc: null,
                rank: null,
                leagueName: null,
                leaguePoints: null,
                wins: null,
                losses: null
            },
            matchList: [],
            myInfo: [],
            champStat: [],
            totalMatchInfo: {
                wins: 0,
                losses: 0,
                label: null,
                percent: null,
                circleSize: 20
            },
            recentSummoner: arr
        };
    }

    // 소환사 검색
    getSummonerInfo = async (summonerName)  => {
        const summoner = await service.getSummoner(summonerName);
        // 소환사 정보
        const { id, accountId, profileIconId, summonerLevel, revisionDate } = summoner.data;

        const lastDate = new Date(revisionDate);
        const strDate = lastDate.toLocaleString();

        const currentStatus = await service.getCurrentStatus(id)
        .then(function(res){
            return true;
        })
        .catch(function(error){
            console.log('this user not in game');
            return false;
        });

        // 티어 승,패 정보
        const summonerRate = await service.getSummoneRating(id);

        // 솔로랭크만 가져오는 필터
        const soloRankRate = summonerRate.data.filter(function(item){
            return item.queueType === "RANKED_SOLO_5x5";
        });

        // 랭크 결과값 저장
        const {tier, rank, leagueName, leaguePoints, wins, losses} = soloRankRate[0];

        // 랭크 티어 이미지
        let tierNum = 1;
        tierNum = utils.getTierNum(rank);
        let tierSrc = `//opgg-static.akamaized.net/images/medals/${tier}_${tierNum}.png`;
        tierSrc = tierSrc.toLowerCase();

        setTimeout(this.getMatchListDetailInfo('recent', accountId), 50000);

        // state 설정
        this.setState({
            summonerName,
            summoner: {
              id,
              accountId,
              profileIconId,
              summonerLevel,
              revisionDate: strDate,
              status: currentStatus
            },
            rating: {
                tier,
                tierSrc,
                rank,
                leagueName,
                leaguePoints,
                wins,
                losses
            }
        });
    }

    // 챔피언 선택시
    getMatchListDetailInfo = async (championId, accountId) => {
        const champions = champ.getChampions();
        let matchList = [];

        if(championId === 'recent') {
            const recentMatches = await service.getRecentMatch(accountId);
            matchList = recentMatches.data.matches;
        } else {
            // 챔피언에 대한 최근 10경기를 가져온다.
            matchList = await axios.get(`https://kr.api.riotgames.com/lol/match/v3/matchlists/by-account/4661694?champion=${championId}&endIndex=20&api_key=RGAPI-c860b5ba-07bc-4531-85d1-f7bd349e3636`)
            .then(function(res){
                return res.data.matches;
            });
        }

        const totalStats = utils.laneStats(matchList);
        this.setState({
            totalStats: totalStats
        });

        // 챔피언에 대한 최근 10경기 상세정보를 가져온다.
        const matchListInfo = await service.getGameListInfo(matchList);

        let myInfos = [];
        let matchLists = [];
        let myInfoList = {};
        let wins = 0;

        matchListInfo.map((match, i) => {
            const { queueId, gameCreation, gameDuration, participants, participantIdentities } = match;
            // 게임타입
            const gameType = utils.getGameType(queueId);
            // 검색한 소환사 게임정보
            const myGameInfo = participantIdentities
            .filter(function(item) {
                return item.player.summonerName.toLowerCase() === document.getElementById('summonerName').value.toLowerCase();
            });
            // 게임 내 유저번호
            const playerId = myGameInfo[0].participantId;

            // 날짜계산
            const now = new Date().getTime();
            const realGameCreation = now - gameCreation;

            // 승/패 계산, 챔피언 정보 저장
            const myInfo = participants.filter(function(item) {
                return item.participantId === playerId;
            });
            if(myInfo[0].stats.win === true) {
                wins = wins + 1;
            }
            // 챔피언 정보
            const championData = champions.filter(function(item){
                return item.title === myInfo[0].championId;
            });

            // 팀 정보
            const team1 = participants.filter(function(item){
                return item.teamId === 100;
            });
            const team2 = participants.filter(function(item){
                  return item.teamId === 200;
            });
            const teamInfo1 = team1.map((obj) => {
                return (
                      obj.championId
                );
            });
            const teamInfo2 = team2.map((obj) => {
                return (
                      obj.championId
                );
            });

            // 결과를 출력할 게임정보 저장 객체
            const matchList =  {
                  champion: myInfo[0].championId,
                  championName: championData[0].text,
                  spell1: myInfo[0].spell1Id,
                  spell2: myInfo[0].spell2Id,
                  stats: myInfo[0].stats,
                  gameType: gameType,
                  gameCreation: realGameCreation,
                  gameDuration: (gameDuration / 60).toFixed(0),
                  team1: teamInfo1,
                  team2: teamInfo2
            };

            myInfos = myInfos.concat(myInfo[0]);
            matchLists = matchLists.concat(matchList);
        });

        let champArr = myInfos.map((obj, i) => {
            return obj.championId;
        });

        champArr = utils.uniqueArr(champArr);
        // 나의 게임정보 상위 4개의 챔피언을 저장
        myInfoList = utils.setmyInfoList(myInfos, champArr);
        myInfoList = utils.sortInfoList(myInfoList);
        myInfoList = myInfoList.slice(0, 4);

        const totalMatchInfo = {
            wins: wins,
            losses: matchList.length - wins,
            label: (wins) +'승 / ' + (matchList.length - wins) + '패',
            percent: 100 * (wins) / matchList.length + " %",
            circleSize: matchList.length
        }
        this.setState({
            matchList: matchLists,
            myInfo: myInfoList,
            totalMatchInfo: totalMatchInfo,
            loadingStatus: false
        });
    }

    // 검색버튼 클릭 시
    searchSummoner = () => {
        let summonerName = document.getElementById('summonerName').value;

        const recentSummoner = utils.getRecentSummoer(summonerName);
        this.setState({
          recentSummoner: recentSummoner
        });

        // state 초기화
        this.setState({
            loadingStatus: true,
            matchList: [],
            totalMatchInfo: {
                wins: 0,
                losses: 0,
                label: null,
                percent: null
            },
            myInfo: []
        });

        this.getSummonerInfo(summonerName);
    }

    onSelect = (e) => {
        this.getMatchListDetailInfo(e.target.title);
    }

    render() {
        const champions = champ.getChampions();

        return (
            <div>
              <Dimmer
                active={this.state.loadingStatus}
                content={<Loader indeterminate size="massive">Searching Summoner</Loader>}
                page
              />
              <Header
                searchSummoner={this.searchSummoner}
              />

              {this.state.loadingStatus === false &&
              <Grid centered columns='equal'>
                <Grid.Row>
                  <Segment>
                    <Grid.Column width={13}>
                      <SummonerInfo
                          summoner={this.state.summoner}
                          rating={this.state.rating}
                          name={this.state.summonerName}
                          totalMatchInfo={this.state.totalMatchInfo}
                          myInfo={this.state.myInfo}
                          totalStats={this.state.totalStats}
                          getMatchListByChampion={this.getMatchListDetailInfo}
                      />
                    </Grid.Column>
                  </Segment>
                </Grid.Row>

                <Grid.Row>
                  <Segment>
                    <Grid.Column width={14}>
                      <MatchList
                        matchList={this.state.matchList}
                      />
                    </Grid.Column>
                  </Segment>

                  <Grid.Column width={4}>
                    <Segment compact className='champ-select'>
                      <Select placeholder='Select Champions' options={champions} onChange={this.onSelect}/>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              }
            </div>
        );
    }
}

export default SearchContainer;
