import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 5000000;

// 소환사 정보
export function getSummoner(name) {
    return axios.get(`https://kr.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=RGAPI-7c71aff9-53e7-4ff0-93e7-af7b92ea6569`);
}

// 소환사 레이팅
export function getSummoneRating(summonerId) {
    return axios.get(`https://kr.api.riotgames.com/lol/league/v3/positions/by-summoner/${summonerId}?api_key=RGAPI-7c71aff9-53e7-4ff0-93e7-af7b92ea6569`);
}

// 소환사의 최근게임 (20경기)
export function getRecentMatch(accountId) {
    return axios.get(`https://kr.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}/recent?api_key=RGAPI-7c71aff9-53e7-4ff0-93e7-af7b92ea6569`);
}

// 현재 게임중
export function getCurrentStatus(summonerId) {
    return axios.get(`https://kr.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/${summonerId}?api_key=RGAPI-7c71aff9-53e7-4ff0-93e7-af7b92ea6569`);
}

// 게임결과
export function getGameInfo(gameId) {
    return axios.get(`https://kr.api.riotgames.com/lol/match/v3/matches/${gameId}?api_key=RGAPI-7c71aff9-53e7-4ff0-93e7-af7b92ea6569`);
}

// 챔피언 정보
export function getChampionData(championId) {
    return axios.get(`./champion.json`);
}
