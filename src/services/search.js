import axios from 'axios';

// 소환사 정보
export function getSummoner(name) {
    return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=RGAPI-c860b5ba-07bc-4531-85d1-f7bd349e3636`);
}

// 소환사 레이팅
export function getSummoneRating(summonerId) {
    return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/league/v3/positions/by-summoner/${summonerId}?api_key=RGAPI-c860b5ba-07bc-4531-85d1-f7bd349e3636`);
}

// 소환사의 최근게임 (20경기)
export function getRecentMatch(accountId) {
    return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}/recent?api_key=RGAPI-c860b5ba-07bc-4531-85d1-f7bd349e3636`);
}

// 현재 게임중
export function getCurrentStatus(summonerId) {
    return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/${summonerId}?api_key=RGAPI-c860b5ba-07bc-4531-85d1-f7bd349e3636`);
}

// 게임 리스트 상세정보
export async function getGameListInfo(list) {
  const promises = [];
  let matchList =[];

  list.map((match, i) => {
      promises.push(axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matches/${match.gameId}?api_key=RGAPI-c860b5ba-07bc-4531-85d1-f7bd349e3636`));
  });

  await axios.all(promises)
  .then(function(results){
    results.forEach(function(response) {
        matchList = matchList.concat(response.data);
      })
  })
  .catch(function(error){
      alert('요청이 너무 많습니다. 잠시후 다시 검색해주세요');
  });

  return matchList;
}

export function getMatchList(championId, accountId) {
  if(championId === 'recent' || championId === '전체') {
      return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}/recent?api_key=RGAPI-c860b5ba-07bc-4531-85d1-f7bd349e3636`);
  } else if(championId === '솔로랭크'){
      // 솔로랭크 최근 10경기
      return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?queue=420&endIndex=20&api_key=RGAPI-c860b5ba-07bc-4531-85d1-f7bd349e3636`);
  } else if(championId === '자유랭크'){
      // 솔로랭크 최근 10경기
      return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?queue=440&endIndex=20&api_key=RGAPI-c860b5ba-07bc-4531-85d1-f7bd349e3636`);
  } else {
      // 챔피언에 대한 최근 10경기
      return axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?champion=${championId}&endIndex=20&api_key=RGAPI-c860b5ba-07bc-4531-85d1-f7bd349e3636`);
  }
}
