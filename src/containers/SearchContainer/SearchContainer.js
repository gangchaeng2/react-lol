import React, {Component} from 'react';
import { Grid, Segment, Dimmer, Loader, Tab } from 'semantic-ui-react';

import { Header, MatchList, SearchResult, MatchDetail } from '../../components';
import * as service from '../../services/search';
import * as utils from '../../services/utils';
import * as champ from '../../services/champions';

class SearchContainer extends Component {
    constructor(props) {
        super(props);

        // 최근 검색한 소환사
        const arr = utils.getRecentSummoer('');

        this.state = {
            errorCheck: false,
            detailOpen: false,
            setQueueType: 0,
            loadingTab: null,
            loadingSearch: null,
            summonerInfo: {},
            summonerStatus: false,
            summonerRankInfo: [],
            summonerMatchList: [],
            summonerLaneStats: {},
            detailMatchList: [],
            myInfoObj: [],
            donutChartObj: {
                wins: 0,
                losses: 0,
                label: null,
                percent: null,
                circleSize: 20
            },
            detailMatchInfo: {},
            recentSummoner: arr
        };
    }

    // 소환사 검색
    getSummonerInfo = async(summonerName)  => {
        const self = this;

        const summonerInfo = await service.getSummoner(summonerName)
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
           self.setState({
              loadingSearch: false,
              errorCheck: true
           });
           return false;
        });

        if(!this.state.errorCheck) {
            const { id, accountId } = summonerInfo;

            // 랭크 정보
            const summonerRankInfo = await service.getSummoneRating(id);
            // 현재 게임상태
            const summonerStatus = await service.getCurrentStatus(id)
                                        .then(function(response) {
                                            console.log(response);
                                        })
                                        .catch(function(error) {
                                            console.log('this user not in Game');
                                            return false;
                                        });
            // 소환사 매치 리스트
            const summonerMatchList = await service.getMatchList(0, 0, accountId);
            const { matches } = summonerMatchList.data;

            // 라인 정보 저장
            const summonerLaneStats = utils.laneStats(matches);

            this.setState({
                summonerInfo: summonerInfo,
                summonerStatus: summonerStatus,
                summonerRankInfo: summonerRankInfo.data,
                summonerLaneStats,
                summonerMatchList: matches
            });

            //  매치 상세 조회
            this.getMatchListDetailInfo(matches);
        }
    }

    // 매치 리스트 검색
    getMatchListDetailInfo = async (matchList) => {
        const self = this;
        // 챔피언 정보 호출
        const champions = champ.getChampions();
        const matchListInfo = await service.getGameListInfo(matchList);

        let myInfoList = [];
        let myInfoObj = {};
        let wins = 0;
        let detailMatchList = [];

        matchListInfo.forEach((match, i) => {
            const { queueId, gameCreation, gameDuration, participants, participantIdentities, teams } = match;
            // 게임타입
            const gameType = utils.getGameType(queueId);
            // 게임생성 날짜
            const now = new Date().getTime();
            const realGameCreation = now - gameCreation;
            // 검색한 소환사 게임정보
            const myGameInfo = participantIdentities
            .filter(function(item) {
                return item.player.accountId === self.state.summonerInfo.accountId;
            });
            // 게임 내 유저번호
            const playerId = myGameInfo[0].participantId;
            // 승/패 계산, 챔피언 정보 저장
            const myInfo = participants.filter(function(item) {
                return item.participantId === playerId;
            });
            if(myInfo[0].stats.win === true) {
                wins = wins + 1;
            }
            const championData = champions.filter(function(item) {
                return item.title === myInfo[0].championId;
            });

            // 팀 정보
            const team1 = participants.filter(function(item) {
                return item.teamId === 100;
            });
            const team2 = participants.filter(function(item) {
                  return item.teamId === 200;
            });

            const team1Obj = {
                summonersInfo: team1,
                gameInfo: teams[0],
                identity: participantIdentities.slice(0, 5)
            };

            const team2Obj = {
                summonersInfo: team2,
                gameInfo: teams[1],
                identity: participantIdentities.slice(5, 10)
            };

            let teamArr = [];
            teamArr = teamArr.concat(team1Obj).concat(team2Obj);

            // 매치 내 최다 대미지
            const maxDamage = utils.getMaxDamage(participants);

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
                  teamArr: teamArr,
                  maxDamage: maxDamage
            };

            // 매치 상세정보 객체를 배열에 저장
            myInfoList = myInfoList.concat(myInfo[0]);
            detailMatchList = detailMatchList.concat(matchList);
        });

        // 매치 리스트에서 내가 한 챔피언 저장
        let champArr = myInfoList.map((obj, i) => {
            return obj.championId;
        });
        // 매치 리스트에서 중복 챔피언 제거
        champArr = utils.uniqueArr(champArr);

        // 매치 리스트 챔피언 승/패/KDA 저장
        myInfoObj = utils.setmyInfoList(myInfoList, champArr);

        // 도넛 차트 출력을 위한 객체
        const donutChartObj = {
            totalKill: myInfoObj.totalKill,
            totalDeath: myInfoObj.totalDeath,
            totalAssist: myInfoObj.totalAssist,
            totalAverage: myInfoObj.totalAverage,
            wins: wins,
            losses: myInfoList.length - wins,
            label: (wins) +'승 / ' + (myInfoList.length - wins) + '패',
            percent: (100 * (wins) / myInfoList.length).toFixed(0) + " %",
            circleSize: myInfoList.length
        }

        // state 설정
        this.setState({
            detailMatchList: detailMatchList,
            myInfoObj: myInfoObj,
            donutChartObj: donutChartObj,
            loadingSearch: false,
            loadingTab: false
        });
    }

    // 검색버튼 클릭 시
    searchSummoner = (summonerName) => {
        // state 초기화
        this.setState({
            loadingSearch: true,
            detailOpen: false,
            errorCheck: false
        });

        document.getElementById('summonerName').value = summonerName;
        this.getSummonerInfo(summonerName);
    }

    // 챔피언 selectBox 선택
    onSelectByChampion = (e) => {
        this.getMatchListDetailInfo(e.target.title);
    }

    // 매치 정보 tab 인덱스 클릭
    onSelectByQueueType = async(e) => {
        let index = 0;

        if(e.target.text === '전체') {
            index = 0;
        } else if(e.target.text === '일반게임') {
            index = 1;
        } else if(e.target.text === '솔로랭크') {
            index = 2;
        } else if(e.target.text === '자유랭크') {
            index = 3;
        }

        this.setState({
            loadingTab: true,
            setQueueType: index
        });

        const summonerMatchList = await service.getMatchList(index, 0, this.state.summonerInfo.accountId);
        const { matches } = summonerMatchList.data;
        this.getMatchListDetailInfo(matches);
    }

    // 게임 상세정보 세팅
    showDetailMatchInfo = (index) => {
        this.setState({
            detailMatchInfo: this.state.detailMatchList[index],
            detailOpen: true
        });
    }

    // 게임 상세정보 닫기
    hideDetailMatchInfo = () => {
        this.setState({
            detailOpen: false
        });
    }

    render() {
        const { loadingSearch, loadingTab, errorCheck, summonerInfo, summonerStatus, summonerRankInfo, donutChartObj, myInfoObj, summonerLaneStats, detailMatchList, detailMatchInfo, detailOpen, setQueueType } = this.state;
        const { searchSummoner, showDetailMatchInfo, hideDetailMatchInfo, onSelectByQueueType, getMatchListDetailInfo, handleChange } = this;
        // const champions = champ.getChampions();
        const panes = [
          { id: '0', menuItem: '전체', render: () => <Tab.Pane><MatchList matchList={detailMatchList} showDetailMatchInfo={showDetailMatchInfo}/></Tab.Pane> },
          { id: '1', menuItem: '일반게임', render: () => <Tab.Pane><MatchList matchList={detailMatchList} showDetailMatchInfo={showDetailMatchInfo}/></Tab.Pane> },
          { id: '2', menuItem: '솔로랭크', render: () => <Tab.Pane><MatchList matchList={detailMatchList} showDetailMatchInfo={showDetailMatchInfo}/></Tab.Pane> },
          { id: '3', menuItem: '자유랭크', render: () => <Tab.Pane><MatchList matchList={detailMatchList} showDetailMatchInfo={showDetailMatchInfo}/></Tab.Pane> }
        ];

        return (
            <div>
              <Dimmer
                active={loadingSearch}
                content={<Loader indeterminate size="massive">Searching Summoner</Loader>}
                page
              />
              <Header
                searchSummoner={searchSummoner}
                handleChange={handleChange}
              />

            {(loadingSearch === false && errorCheck === false) &&
              <Grid>
                <Grid.Row centered>
                  <Grid.Column width={10}>
                    <Segment>
                      <SearchResult
                          summonerInfo={summonerInfo}
                          summonerStatus={summonerStatus}
                          summonerRankInfo={summonerRankInfo}
                          donutChartObj={donutChartObj}
                          myInfoObj={myInfoObj.championStat.slice(0, 4)}
                          summonerLaneStats={summonerLaneStats}
                          getMatchListDetailInfo={getMatchListDetailInfo}
                      />
                    </Segment>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row centered>
                  <Grid.Column width={12}>
                    <Segment>
                      {loadingTab ?
                      (
                        <Dimmer active inverted><Loader inverted content='Loading' /></Dimmer>
                      ) : (
                        <Dimmer><Loader inverted content='Loading' /></Dimmer>)
                      }
                      <Tab panes={panes} onTabChange={onSelectByQueueType} activeIndex={setQueueType}/>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              }

              {errorCheck &&
                  <div>검색된 소환사가 없습니다. 소환사명을 확인해주세요.</div>
              }

              {detailOpen &&
                <MatchDetail
                    detailMatchInfo={detailMatchInfo}
                    open={detailOpen}
                    searchSummoner={searchSummoner}
                    hideDetailMatchInfo={hideDetailMatchInfo}
                />
              }
            </div>
        );
    }
}

export default SearchContainer;
