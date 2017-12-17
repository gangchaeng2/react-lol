import axios from 'axios';

// 소환사 정보
export function getSummoner(name) {
    name = encodeURIComponent(name);
    return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=RGAPI-2d00ce31-c48b-4c82-a7ce-9bb7c6b4ff85`);
}

// 소환사 레이팅
export function getSummoneRating(summonerId) {
    return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/league/v3/positions/by-summoner/${summonerId}?api_key=RGAPI-2d00ce31-c48b-4c82-a7ce-9bb7c6b4ff85`);
}

// 현재 게임중
export function getCurrentStatus(summonerId) {
    return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/${summonerId}?api_key=RGAPI-2d00ce31-c48b-4c82-a7ce-9bb7c6b4ff85`);
}

// 게임 리스트 상세정보
export async function getGameListInfo(list) {
    let promises = [];
    let matchList =[];

    list.forEach((match, i) => {
        // if(i < 2){
            promises.push(axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matches/${match.gameId}?api_key=RGAPI-2d00ce31-c48b-4c82-a7ce-9bb7c6b4ff85`));
        // }
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
export function getMatchList(gameType, championId, accountId) {
    if(gameType === 0) {
        return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}/recent?api_key=RGAPI-2d00ce31-c48b-4c82-a7ce-9bb7c6b4ff85`);
    } else if(gameType === 1) {
        // 일반게임 최근 20경기
        return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?queue=430&endIndex=20&season=9&api_key=RGAPI-2d00ce31-c48b-4c82-a7ce-9bb7c6b4ff85`);
    } else if(gameType === 2) {
        // 솔로랭크 최근 20경기
        return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?queue=420&endIndex=20&season=9&api_key=RGAPI-2d00ce31-c48b-4c82-a7ce-9bb7c6b4ff85`);
    } else if(gameType === 3) {
        // 솔로랭크 최근 20경기
        return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?queue=440&endIndex=20&season=9&api_key=RGAPI-2d00ce31-c48b-4c82-a7ce-9bb7c6b4ff85`);
    } else {
        // 챔피언에 대한 최근 20경기
        return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?champion=${championId}&endIndex=20&api_key=RGAPI-2d00ce31-c48b-4c82-a7ce-9bb7c6b4ff85`);
    }
}
