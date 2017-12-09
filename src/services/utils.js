import  Cookies  from 'universal-cookie';
import * as champ from './champions';

export function getRecentSummoer(summoner) {
    const cookies = new Cookies();
    let cookieArr = [];
    let cookieSummoners = cookies.get('summoners');
    let tmpSummoner = cookieSummoners;

    if(summoner !== '') {
      if(cookieSummoners === undefined || cookieSummoners === '') {
          tmpSummoner = summoner;
      } else if(cookieSummoners.indexOf(summoner) < 0) {
          tmpSummoner = cookieSummoners + '^' + summoner;
      }

      cookies.set('summoners', tmpSummoner, { path: '/' });
    }

    if(tmpSummoner !== undefined) {
      if(tmpSummoner.indexOf('^') > 0) {
          cookieArr = tmpSummoner.split('^');
      } else {
          cookieArr = cookieArr.concat(tmpSummoner);
      }
    }

    return cookieArr;
}

// 경기 순서 정렬
export function sortMatchList(matchList) {
    matchList.sort(function(obj1, obj2) {
      return obj1.gameCreation < obj2.gameCreation ? -1 : obj1.gameCreation > obj2.gameCreation ? 1 : 0;
    });

    return matchList;
}

// tier 숫자변환
export function getTierNum(rank) {
    let tierNum = 1;

    switch(rank) {
      case 'I':
        tierNum = 1;
        break;
      case 'II':
        tierNum = 2;
        break;
      case 'III':
        tierNum = 3;
        break;
      case 'IV':
        tierNum = 4;
        break;
      case 'V':
        tierNum = 5;
        break;
      default:
        break;
    }
    return tierNum;
}

// gameType
export function getGameType(queueId) {
    let gameType = null;

    switch(queueId) {
      case 420:
        gameType = '솔로랭크';
        break;
      case 430:
        gameType = '일반게임';
        break;
      case 440:
        gameType = '자유랭크';
        break;
      case 450:
        gameType = '칼바람 나락';
        break;
      default:
        break;
    }
    return gameType;
}

// 배열 중복제거
export function uniqueArr(arr) {
    return arr.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
}

// 레인 통계
export function laneStats(matchList) {
    let obj = {};
    let total = 0;
    let top = 0;
    let jg = 0;
    let mid = 0;
    let ad = 0;
    let sp = 0;

    matchList.map((match, i) => {
      //if(match.queue === 420) {
        total += 1;
        if(match.lane === 'TOP') {
            top += 1;
        } else if(match.lane === 'JUNGLE') {
            jg += 1;
        } else if(match.lane === 'MID') {
            mid += 1;
        } else if(match.lane === 'BOTTOM' && match.role === 'DUO_SUPPORT') {
            sp += 1;
        } else {
            ad += 1;
        }
      //}
    });

    obj = {
        top: 100 * top / total + ' %',
        jg : 100 * jg / total + ' %',
        mid: 100 * mid / total + ' %',
        ad: 100 * ad / total + ' %',
        sp: 100 * sp / total + ' %'
    }

    return obj;
}

// 게임정보 저장
export function setmyInfoList(myInfo, champArr) {
    let championStats = {
        championStat:[],
        totalKill: 0,
        totalDeath: 0,
        totalAssist: 0,
        totalAverage: 0
    };

    champArr.map((obj, i) => {
        let info = null;

        info = myInfo.filter(function(item){
            return item.championId === champArr[i];
        });

        let championStat = {};

        let totalGame = info.length;
        let champion = info[0].championId;
        let name = '';
        let title = '';
        let win = 0;
        let loss = 0;
        let kill = 0;
        let assist = 0;
        let death = 0;

        const champions = champ.getChampions();

        let championData = champions.filter(function(item){
            return item.title === champion;
        });

        name = championData[0].text;
        title = championData[0].key;

        if(info.length > 1) {
            info.map((obj2, j) => {
                if(obj2.stats.win) {
                  win += 1;
                } else {
                  loss += 1;
                }
                kill += obj2.stats.kills;
                assist += obj2.stats.assists;
                death += obj2.stats.deaths;
            });
        } else {
            if(info[0].stats.win) {
                win += 1;
            } else {
                loss += 1;
            }

            kill = info[0].stats.kills;
            assist = info[0].stats.assists;
            death = info[0].stats.deaths;
      }

      championStats.totalKill = kill + championStats.totalKill;
      championStats.totalDeath = death + championStats.totalDeath;
      championStats.totalAssist = assist + championStats.totalAssist;
      championStats.totalAverage = ((championStats.totalKill + championStats.totalAssist) / championStats.totalDeath).toFixed(2);

      championStat = {
          totalGame: totalGame,
          champion: champion,
          name: name,
          title: title,
          win: win,
          loss: loss,
          kill: kill,
          assist: assist,
          death: death,
          average: ((kill + assist) / death).toFixed(2),
          winPercent: (100 * win / totalGame).toFixed(2) + "%"
      }

      championStats.championStat = championStats.championStat.concat(championStat);
    });

    return championStats;
}

// 게임수로 정렬
export function sortInfoList(infoList) {
  infoList.championStat.sort(function(obj1, obj2) {
    return obj1.totalGame > obj2.totalGame ? -1 : obj1.totalGame < obj2.totalGame ? 1 : 0;
  });

  return infoList;
}

// 숫자포맷
export function setNumberFormat(number) {
    return Number(number).toLocaleString('en');
}
