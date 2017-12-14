import axios from 'axios';

// 소환사 정보
export function getSummoner(name) {
    name = encodeURIComponent(name);
    return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=RGAPI-69da2e3e-1a8f-4121-a78b-cbd6ff44a51b`);
}

// 소환사 레이팅
export function getSummoneRating(summonerId) {
    return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/league/v3/positions/by-summoner/${summonerId}?api_key=RGAPI-69da2e3e-1a8f-4121-a78b-cbd6ff44a51b`);
}

// 현재 게임중
export function getCurrentStatus(summonerId) {
    return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/${summonerId}?api_key=RGAPI-69da2e3e-1a8f-4121-a78b-cbd6ff44a51b`);
}

// 게임 리스트 상세정보
export async function getGameListInfo(list) {
    let promises = [];
    let matchList =[];

    list.forEach((match, i) => {
        promises.push(axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matches/${match.gameId}?api_key=RGAPI-69da2e3e-1a8f-4121-a78b-cbd6ff44a51b`));
    });

    await axios.all(promises)
    .then(function(results){
      results.forEach(function(response) {
          matchList = matchList.concat(response.data);
        });
    })
    .catch(function(error){
        alert('요청이 너무 많습니다. 잠시후 다시 검색해주세요');
    });

    return matchList;
}

// 게임 리스트
export function getMatchList(championId, accountId) {
    if(championId === 0 || championId === '전체') {
        return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}/recent?api_key=RGAPI-69da2e3e-1a8f-4121-a78b-cbd6ff44a51b`);
    } else if(championId === 1) {
        // 일반게임 최근 20경기
        return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?queue=430&endIndex=20&season=9&api_key=RGAPI-69da2e3e-1a8f-4121-a78b-cbd6ff44a51b`);
    } else if(championId === 2) {
        // 솔로랭크 최근 20경기
        return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?queue=420&endIndex=20&season=9&api_key=RGAPI-69da2e3e-1a8f-4121-a78b-cbd6ff44a51b`);
    } else if(championId === 3) {
        // 솔로랭크 최근 20경기
        return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?queue=440&endIndex=20&season=9&api_key=RGAPI-69da2e3e-1a8f-4121-a78b-cbd6ff44a51b`);
    } else {
        // 챔피언에 대한 최근 20경기
        return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?champion=${championId}&endIndex=20&api_key=RGAPI-69da2e3e-1a8f-4121-a78b-cbd6ff44a51b`);
    }
}
