import React, {Component} from 'react';
import { Grid, Segment, Dimmer, Loader, Select, Tab } from 'semantic-ui-react';

import { Header, MatchList, SearchResult, RecentSummoner } from '../../components';
import * as service from '../../services/search';
import * as utils from '../../services/utils';
import * as champ from '../../services/champions';

class SearchContainer extends Component {
    constructor(props) {
        super(props);

        const arr = utils.getRecentSummoer('');

        this.state = {
            setQueueType: 0,
            loadingTab: null,
            loadingSearch: null,
            summonerName: '',
            summoner: {
                id: null,
                accountId: null,
                profileIconId: null,
                summonerLevel: null,
                revisionDate: null,
                status: null
            },
            soloRating: {
                tier: null,
                soloTierSrc: null,
                rank: null,
                leagueName: null,
                leaguePoints: null,
                wins: null,
                losses: null
            },
            freeRating: {
                tier: null,
                freeTierSrc: null,
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

        // 소환사 현재 게임진행 상태
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

        // 솔로랭크
        const soloRankRate = summonerRate.data.filter(function(item){
            return item.queueType === "RANKED_SOLO_5x5";
        });

        // 자유랭크
        const freeRankRate = summonerRate.data.filter(function(item){
            return item.queueType === "RANKED_FLEX_SR";
        });

        // 랭크 티어 이미지
        let soloTierNum = 1;
        soloTierNum = utils.getTierNum(soloRankRate[0].rank);
        let soloTierSrc = `//opgg-static.akamaized.net/images/medals/${soloRankRate[0].tier}_${soloTierNum}.png`;
        soloTierSrc = soloTierSrc.toLowerCase();

        let freeTierNum = 1;
        freeTierNum = utils.getTierNum(freeRankRate[0].rank);
        let freeTierSrc = `//opgg-static.akamaized.net/images/medals/${freeRankRate[0].tier}_${freeTierNum}.png`;
        freeTierSrc = freeTierSrc.toLowerCase();

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
            soloRating: {
                tier: soloRankRate[0].tier,
                soloTierSrc: soloTierSrc,
                rank: soloRankRate[0].rank,
                leagueName: soloRankRate[0].leagueName,
                leaguePoints: soloRankRate[0].leaguePoints,
                wins: soloRankRate[0].wins,
                losses: soloRankRate[0].losses
            },
            freeRating: {
              tier: freeRankRate[0].tier,
              freeTierSrc: freeTierSrc,
              rank: freeRankRate[0].rank,
              leagueName: freeRankRate[0].leagueName,
              leaguePoints: freeRankRate[0].leaguePoints,
              wins: freeRankRate[0].wins,
              losses: freeRankRate[0].losses
            }
        });

        // 매치 리스트 검색
        setTimeout(this.getMatchListDetailInfo('recent', accountId), 50000);
    }

    // 매치 리스트 검색
    getMatchListDetailInfo = async (championId, accountId) => {
        // 챔피언, 랭크별 매치 리스트 검색
        let matchList = [];
        matchList = await service.getMatchList(championId, accountId);
        matchList = matchList.data.matches;
        // 라인 정보 저장
        const totalStats = utils.laneStats(matchList);

        // 챔피언 정보 호출
        const champions = champ.getChampions();
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

            // 게임생성 날짜계산
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

            // 매치 상세정보 객체를 배열에 저장
            myInfos = myInfos.concat(myInfo[0]);
            matchLists = matchLists.concat(matchList);
        });

        // 매치 리스트에서 내가 한 챔피언 저장
        let champArr = myInfos.map((obj, i) => {
            return obj.championId;
        });
        // 매치 리스트에서 중복 챔피언 제거
        champArr = utils.uniqueArr(champArr);

        // 매치 리스트 챔피언 승/패/KDA 저장
        myInfoList = utils.setmyInfoList(myInfos, champArr);
        myInfoList = utils.sortInfoList(myInfoList);

        // 도넛 차트 출력을 위한 객체
        const totalMatchInfo = {
            totalKill: myInfoList.totalKill,
            totalDeath: myInfoList.totalDeath,
            totalAssist: myInfoList.totalAssist,
            totalAverage: myInfoList.totalAverage,
            wins: wins,
            losses: matchListInfo.length - wins,
            label: (wins) +'승 / ' + (matchListInfo.length - wins) + '패',
            percent: 100 * (wins) / matchListInfo.length + " %",
            circleSize: matchListInfo.length
        }

        // state 설정
        this.setState({
            matchList: matchLists,
            myInfo: myInfoList,
            totalMatchInfo: totalMatchInfo,
            totalStats: totalStats,
            loadingSearch: false,
            loadingTab: false
        });
    }

    // 검색버튼 클릭 시
    searchSummoner = () => {
        // let summonerName = document.getElementById('summonerName').value;
        let summonerName = document.getElementById('summonerName').value;

        const recentSummoner = utils.getRecentSummoer(summonerName);
        this.setState({
          recentSummoner: recentSummoner
        });

        // state 초기화
        this.setState({
            loadingSearch: true,
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

    // 챔피언 selectBox 선택
    onSelectByChampion = (e) => {
        this.getMatchListDetailInfo(e.target.title);
    }

    // 매치 정보 tab 인덱스 클릭
    onSelectByQueueType = (e) => {
        let index = 0;
        if(e.target.text === '전체') {
            index = 0;
        } else if(e.target.text === '솔로랭크') {
            index = 1;
        } else if(e.target.text === '자유랭크') {
            index = 2;
        }

        this.setState({
            loadingTab: true,
            setQueueType: index
        });
        this.getMatchListDetailInfo(e.target.text, this.state.summoner.accountId);
    }

    render() {
        // const champions = champ.getChampions();
        const panes = [
          { id: '0', menuItem: '전체', render: () => <Tab.Pane><MatchList matchList={this.state.matchList}/></Tab.Pane> },
          { id: '1', menuItem: '솔로랭크', render: () => <Tab.Pane><MatchList matchList={this.state.matchList}/></Tab.Pane> },
          { id: '2', menuItem: '자유랭크', render: () => <Tab.Pane><MatchList matchList={this.state.matchList}/></Tab.Pane> }
        ];

        return (
            <div>
              <Dimmer
                active={this.state.loadingSearch}
                content={<Loader indeterminate size="massive">Searching Summoner</Loader>}
                page
              />
              <Header
                searchSummoner={this.searchSummoner}
              />

              {this.state.loadingSearch === false &&
              <Grid>
                <Grid.Row centered>
                  <Grid.Column width={10}>
                    <Segment>
                      <SearchResult
                          summoner={this.state.summoner}
                          soloRating={this.state.soloRating}
                          freeRating={this.state.freeRating}
                          summonerName={this.state.summonerName}
                          totalMatchInfo={this.state.totalMatchInfo}
                          myInfo={this.state.myInfo.championStat}
                          totalStats={this.state.totalStats}
                          getMatchListByChampion={this.getMatchListDetailInfo}
                      />
                    </Segment>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row centered>
                  <Grid.Column width={12}>
                    <Segment>
                      {this.state.loadingTab ?
                      (
                        <Dimmer active inverted><Loader inverted content='Loading' /></Dimmer>
                      ) : (
                        <Dimmer><Loader inverted content='Loading' /></Dimmer>)
                      }
                      <Tab panes={panes} onTabChange={this.onSelectByQueueType} activeIndex={this.state.setQueueType}/>
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
