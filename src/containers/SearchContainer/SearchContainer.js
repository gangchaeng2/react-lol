import React, {Component} from 'react';
import { Header, SearchWrapper, SearchResult } from '../../components';
import * as service from '../../services/search';
import * as etc from '../../services/etc';
import * as champ from '../../services/champions';

class SearchContainer extends Component {
    constructor(props) {
        super(props);

        const arr = etc.recnetSummoner('');

        this.state = {
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
            totalMatchInfo: {},
            totalStats: {},
            recentSummoner: arr
        };

        this.getSummonerInfo = this.getSummonerInfo.bind(this);
        this.searchSummoner = this.searchSummoner.bind(this);
    }

    // 소환사 검색
    async getSummonerInfo(summonerName) {
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
        tierNum = etc.getTierNum(rank);
        let tierSrc = `//opgg-static.akamaized.net/images/medals/${tier}_${tierNum}.png`;
        tierSrc = tierSrc.toLowerCase();

        // 최근 20 게임
        const recentMatches = await service.getRecentMatch(accountId);
        const matchList = recentMatches.data.matches;

        const totalStats = etc.laneStats(matchList);

        setTimeout(this.getGameInfo(matchList), 5000000);

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
            },
            totalStats: totalStats
        });
    }

    // 게임정보
    getGameInfo(matchList) {
        let myInfos = [];
        let matchLists = [];
        let matchListLength = matchList.length;

        // this 사용가능 변수
        const self = this;

        matchList.map(async (match, i) => {
          const champions = champ.getChampions();
          const champion = match.champion;

          let championData = champions.filter(function(item){
              return item.id === champion;
          });

          const championName = championData[0].name;
          const gameId = match.gameId;

          await service.getGameInfo(gameId)
          .then(function(res) {
            const queueId = res.data.queueId;
            const gameCreation = res.data.gameCreation;
            const gameDuration = res.data.gameDuration;
            const participants = res.data.participants;
            const participantIdentities = res.data.participantIdentities;
            const myGameInfo = participantIdentities.filter(function(item){
                return item.player.summonerName.toLowerCase() === document.getElementById('summonerName').value.toLowerCase();
            });
            const playerId = myGameInfo[0].participantId;

            const now = new Date().getTime();
            const realGameCreation = now - gameCreation;

            const myInfo = participants.filter(function(item){
                return item.participantId === playerId;
            });

            if(myInfo[0].stats.win === true) {
                self.setState({
                  totalMatchInfo: {
                    wins: self.state.totalMatchInfo.wins + 1,
                    losses: 19 - self.state.totalMatchInfo.wins,
                    label: (self.state.totalMatchInfo.wins + 1) +'승 / ' + (19 - self.state.totalMatchInfo.wins) + '패',
                    percent: 100 * (self.state.totalMatchInfo.wins + 1) / 20 + " %"
                  }
                });
            }

            let gameType = "";
            gameType = etc.getGameType(queueId);

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

            const matchList =  {
                  champion: champion,
                  championName: championName,
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

            if(i === matchListLength - 1) {
              let champArr = myInfos.map((obj, i) => {
                  return obj.championId;
              });

              champArr = etc.uniqueArr(champArr);

              let myInfoList = etc.setmyInfoList(myInfos, champArr);
              myInfoList = etc.sortInfoList(myInfoList);
              myInfoList = myInfoList.slice(0,3);

              matchLists = etc.sortMatchList(matchLists);

              self.setState({
                  matchList: matchLists,
                  myInfo: myInfoList
              });
            }
          })
          .catch(function(error) {
              console.log(error);
              return;
          });
      });
    }

    // 검색버튼 클릭 시
    searchSummoner() {
        // 소환사 명
        let summonerName = document.getElementById('summonerName').value;

        const recentSummoner = etc.recnetSummoner(summonerName);
        this.setState({
          recentSummoner: recentSummoner
        });

        // state 초기화
        this.setState({
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

    render() {
        return (
          <div>
            <SearchWrapper>
                <Header
                    searchSummoner={this.searchSummoner}
                />
                <SearchResult
                    name={this.state.summonerName}
                    summoner={this.state.summoner}
                    rating={this.state.rating}
                    matchList={this.state.matchList}
                    totalMatchInfo={this.state.totalMatchInfo}
                    totalStats={this.state.totalStats}
                    myInfo={this.state.myInfo}
                    recentSummoner={this.state.recentSummoner}
                />
            </SearchWrapper>
        </div>
        );
    }
}

export default SearchContainer;
