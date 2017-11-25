export function getChampions() {
const champions = [
        {
            "title": "원숭이 왕",
            "id": 62,
            "key": "MonkeyKing",
            "name": "오공"
        },
        {
            "title": "무기의 달인",
            "id": 24,
            "key": "Jax",
            "name": "잭스"
        },
        {
            "title": "종말의 전조",
            "id": 9,
            "key": "Fiddlesticks",
            "name": "피들스틱"
        },
        {
            "title": "악마 어릿광대",
            "id": 35,
            "key": "Shaco",
            "name": "샤코"
        },
        {
            "title": "자운의 고삐 풀린 분노",
            "id": 19,
            "key": "Warwick",
            "name": "워윅"
        },
        {
            "title": "저항하는 자",
            "id": 498,
            "key": "Xayah",
            "name": "자야"
        },
        {
            "title": "야성의 사냥꾼",
            "id": 76,
            "key": "Nidalee",
            "name": "니달리"
        },
        {
            "title": "가시 덩굴의 복수",
            "id": 143,
            "key": "Zyra",
            "name": "자이라"
        },
        {
            "title": "망나니 기사",
            "id": 240,
            "key": "Kled",
            "name": "클레드"
        },
        {
            "title": "타오르는 복수",
            "id": 63,
            "key": "Brand",
            "name": "브랜드"
        },
        {
            "title": "중무장 아르마딜로",
            "id": 33,
            "key": "Rammus",
            "name": "람머스"
        },
        {
            "title": "크라켄의 여사제",
            "id": 420,
            "key": "Illaoi",
            "name": "일라오이"
        },
        {
            "title": "대담한 폭격수",
            "id": 42,
            "key": "Corki",
            "name": "코르키"
        },
        {
            "title": "프렐요드의 심장",
            "id": 201,
            "key": "Braum",
            "name": "브라움"
        },
        {
            "title": "녹서스의 실력자",
            "id": 122,
            "key": "Darius",
            "name": "다리우스"
        },
        {
            "title": "야만전사 왕",
            "id": 23,
            "key": "Tryndamere",
            "name": "트린다미어"
        },
        {
            "title": "현상금 사냥꾼",
            "id": 21,
            "key": "MissFortune",
            "name": "미스 포츈"
        },
        {
            "title": "영혼의 길잡이",
            "id": 83,
            "key": "Yorick",
            "name": "요릭"
        },
        {
            "title": "초월한 마법사",
            "id": 101,
            "key": "Xerath",
            "name": "제라스"
        },
        {
            "title": "전장의 여제",
            "id": 15,
            "key": "Sivir",
            "name": "시비르"
        },
        {
            "title": "추방자",
            "id": 92,
            "key": "Riven",
            "name": "리븐"
        },
        {
            "title": "시계태엽 소녀",
            "id": 61,
            "key": "Orianna",
            "name": "오리아나"
        },
        {
            "title": "바다의 무법자",
            "id": 41,
            "key": "Gangplank",
            "name": "갱플랭크"
        },
        {
            "title": "거석의 파편",
            "id": 54,
            "key": "Malphite",
            "name": "말파이트"
        },
        {
            "title": "망치의 수호자",
            "id": 78,
            "key": "Poppy",
            "name": "뽀삐"
        },
        {
            "title": "죽음을 노래하는 자",
            "id": 30,
            "key": "Karthus",
            "name": "카서스"
        },
        {
            "title": "미래의 수호자",
            "id": 126,
            "key": "Jayce",
            "name": "제이스"
        },
        {
            "title": "설인 기수",
            "id": 20,
            "key": "Nunu",
            "name": "누누"
        },
        {
            "title": "트롤 왕",
            "id": 48,
            "key": "Trundle",
            "name": "트런들"
        },
        {
            "title": "무법자",
            "id": 104,
            "key": "Graves",
            "name": "그레이브즈"
        },
        {
            "title": "타락한 천사",
            "id": 25,
            "key": "Morgana",
            "name": "모르가나"
        },
        {
            "title": "잃어버린 고리",
            "id": 150,
            "key": "Gnar",
            "name": "나르"
        },
        {
            "title": "광명의 소녀",
            "id": 99,
            "key": "Lux",
            "name": "럭스"
        },
        {
            "title": "하프 드래곤",
            "id": 102,
            "key": "Shyvana",
            "name": "쉬바나"
        },
        {
            "title": "사막의 도살자",
            "id": 58,
            "key": "Renekton",
            "name": "레넥톤"
        },
        {
            "title": "결투의 대가",
            "id": 114,
            "key": "Fiora",
            "name": "피오라"
        },
        {
            "title": "난폭한 말괄량이",
            "id": 222,
            "key": "Jinx",
            "name": "징크스"
        },
        {
            "title": "복수의 화신",
            "id": 429,
            "key": "Kalista",
            "name": "칼리스타"
        },
        {
            "title": "대양의 말썽꾸러기",
            "id": 105,
            "key": "Fizz",
            "name": "피즈"
        },
        {
            "title": "공허의 방랑자",
            "id": 38,
            "key": "Kassadin",
            "name": "카사딘"
        },
        {
            "title": "현의 명인",
            "id": 37,
            "key": "Sona",
            "name": "소나"
        },
        {
            "title": "칼날의 의지",
            "id": 39,
            "key": "Irelia",
            "name": "이렐리아"
        },
        {
            "title": "기계화의 전령관",
            "id": 112,
            "key": "Viktor",
            "name": "빅토르"
        },
        {
            "title": "매혹하는 자",
            "id": 497,
            "key": "Rakan",
            "name": "라칸"
        },
        {
            "title": "영겁의 사냥꾼",
            "id": 203,
            "key": "Kindred",
            "name": "킨드레드"
        },
        {
            "title": "독사의 포옹",
            "id": 69,
            "key": "Cassiopeia",
            "name": "카시오페아"
        },
        {
            "title": "뒤틀린 나무 정령",
            "id": 57,
            "key": "Maokai",
            "name": "마오카이"
        },
        {
            "title": "거산의 화염",
            "id": 516,
            "key": "Ornn",
            "name": "오른"
        },
        {
            "title": "지옥의 간수",
            "id": 412,
            "key": "Thresh",
            "name": "쓰레쉬"
        },
        {
            "title": "심판자",
            "id": 10,
            "key": "Kayle",
            "name": "케일"
        },
        {
            "title": "전쟁의 전조",
            "id": 120,
            "key": "Hecarim",
            "name": "헤카림"
        },
        {
            "title": "공허의 약탈자",
            "id": 121,
            "key": "Khazix",
            "name": "카직스"
        },
        {
            "title": "광전사",
            "id": 2,
            "key": "Olaf",
            "name": "올라프"
        },
        {
            "title": "마법공학 폭파병",
            "id": 115,
            "key": "Ziggs",
            "name": "직스"
        },
        {
            "title": "어둠의 여제",
            "id": 134,
            "key": "Syndra",
            "name": "신드라"
        },
        {
            "title": "자운의 광인",
            "id": 36,
            "key": "DrMundo",
            "name": "문도 박사"
        },
        {
            "title": "깨우친 자",
            "id": 43,
            "key": "Karma",
            "name": "카르마"
        },
        {
            "title": "어둠의 아이",
            "id": 1,
            "key": "Annie",
            "name": "애니"
        },
        {
            "title": "그림자의 권",
            "id": 84,
            "key": "Akali",
            "name": "아칼리"
        },
        {
            "title": "울부짖는 천둥",
            "id": 106,
            "key": "Volibear",
            "name": "볼리베어"
        },
        {
            "title": "용서받지 못한 자",
            "id": 157,
            "key": "Yasuo",
            "name": "야스오"
        },
        {
            "title": "폭풍의 심장",
            "id": 85,
            "key": "Kennen",
            "name": "케넨"
        },
        {
            "title": "추적하는 사자",
            "id": 107,
            "key": "Rengar",
            "name": "렝가"
        },
        {
            "title": "룬 마법사",
            "id": 13,
            "key": "Ryze",
            "name": "라이즈"
        },
        {
            "title": "황혼의 눈",
            "id": 98,
            "key": "Shen",
            "name": "쉔"
        },
        {
            "title": "비밀 병기",
            "id": 154,
            "key": "Zac",
            "name": "자크"
        },
        {
            "title": "검의 그림자",
            "id": 91,
            "key": "Talon",
            "name": "탈론"
        },
        {
            "title": "전략의 대가",
            "id": 50,
            "key": "Swain",
            "name": "스웨인"
        },
        {
            "title": "영겁의 수호자",
            "id": 432,
            "key": "Bard",
            "name": "바드"
        },
        {
            "title": "언데드 학살병기",
            "id": 14,
            "key": "Sion",
            "name": "사이온"
        },
        {
            "title": "어둠 사냥꾼",
            "id": 67,
            "key": "Vayne",
            "name": "베인"
        },
        {
            "title": "사막의 관리자",
            "id": 75,
            "key": "Nasus",
            "name": "나서스"
        },
        {
            "title": "그림자 사신",
            "id": 141,
            "key": "Kayn",
            "name": "케인"
        },
        {
            "title": "카드의 달인",
            "id": 4,
            "key": "TwistedFate",
            "name": "트위스티드 페이트"
        },
        {
            "title": "공허의 공포",
            "id": 31,
            "key": "Chogath",
            "name": "초가스"
        },
        {
            "title": "정령 주술사",
            "id": 77,
            "key": "Udyr",
            "name": "우디르"
        },
        {
            "title": "정화의 사도",
            "id": 236,
            "key": "Lucian",
            "name": "루시안"
        },
        {
            "title": "자연의 아버지",
            "id": 427,
            "key": "Ivern",
            "name": "아이번"
        },
        {
            "title": "여명의 빛",
            "id": 89,
            "key": "Leona",
            "name": "레오나"
        },
        {
            "title": "필트오버의 보안관",
            "id": 51,
            "key": "Caitlyn",
            "name": "케이틀린"
        },
        {
            "title": "혹한의 분노",
            "id": 113,
            "key": "Sejuani",
            "name": "세주아니"
        },
        {
            "title": "영원한 악몽",
            "id": 56,
            "key": "Nocturne",
            "name": "녹턴"
        },
        {
            "title": "시간의 수호자",
            "id": 26,
            "key": "Zilean",
            "name": "질리언"
        },
        {
            "title": "사막의 황제",
            "id": 268,
            "key": "Azir",
            "name": "아지르"
        },
        {
            "title": "기계 악동",
            "id": 68,
            "key": "Rumble",
            "name": "럼블"
        },
        {
            "title": "바위술사",
            "id": 163,
            "key": "Taliyah",
            "name": "탈리야"
        },
        {
            "title": "날쌘 정찰병",
            "id": 17,
            "key": "Teemo",
            "name": "티모"
        },
        {
            "title": "살상 병기",
            "id": 6,
            "key": "Urgot",
            "name": "우르곳"
        },
        {
            "title": "슬픈 미라",
            "id": 32,
            "key": "Amumu",
            "name": "아무무"
        },
        {
            "title": "위대한 석상",
            "id": 3,
            "key": "Galio",
            "name": "갈리오"
        },
        {
            "title": "위대한 발명가",
            "id": 74,
            "key": "Heimerdinger",
            "name": "하이머딩거"
        },
        {
            "title": "얼음불사조",
            "id": 34,
            "key": "Anivia",
            "name": "애니비아"
        },
        {
            "title": "서리 궁수",
            "id": 22,
            "key": "Ashe",
            "name": "애쉬"
        },
        {
            "title": "공허의 눈",
            "id": 161,
            "key": "Velkoz",
            "name": "벨코즈"
        },
        {
            "title": "미친 화학자",
            "id": 27,
            "key": "Singed",
            "name": "신지드"
        },
        {
            "title": "수정 선봉장",
            "id": 72,
            "key": "Skarner",
            "name": "스카너"
        },
        {
            "title": "응징의 화살",
            "id": 110,
            "key": "Varus",
            "name": "바루스"
        },
        {
            "title": "역병 쥐",
            "id": 29,
            "key": "Twitch",
            "name": "트위치"
        },
        {
            "title": "데마시아의 힘",
            "id": 86,
            "key": "Garen",
            "name": "가렌"
        },
        {
            "title": "거대 증기 골렘",
            "id": 53,
            "key": "Blitzcrank",
            "name": "블리츠크랭크"
        },
        {
            "title": "우주 검사",
            "id": 11,
            "key": "MasterYi",
            "name": "마스터 이"
        },
        {
            "title": "거미 여왕",
            "id": 60,
            "key": "Elise",
            "name": "엘리스"
        },
        {
            "title": "미노타우로스",
            "id": 12,
            "key": "Alistar",
            "name": "알리스타"
        },
        {
            "title": "사악한 칼날",
            "id": 55,
            "key": "Katarina",
            "name": "카타리나"
        },
        {
            "title": "시간을 달리는 소년",
            "id": 245,
            "key": "Ekko",
            "name": "에코"
        },
        {
            "title": "강철의 망령",
            "id": 82,
            "key": "Mordekaiser",
            "name": "모데카이저"
        },
        {
            "title": "요정 마법사",
            "id": 117,
            "key": "Lulu",
            "name": "룰루"
        },
        {
            "title": "강철의 그림자",
            "id": 164,
            "key": "Camille",
            "name": "카밀"
        },
        {
            "title": "다르킨의 검",
            "id": 266,
            "key": "Aatrox",
            "name": "아트록스"
        },
        {
            "title": "화려한 처형자",
            "id": 119,
            "key": "Draven",
            "name": "드레이븐"
        },
        {
            "title": "강의 폭군",
            "id": 223,
            "key": "TahmKench",
            "name": "탐 켄치"
        },
        {
            "title": "전쟁의 장인",
            "id": 80,
            "key": "Pantheon",
            "name": "판테온"
        },
        {
            "title": "데마시아의 호위무사",
            "id": 5,
            "key": "XinZhao",
            "name": "신 짜오"
        },
        {
            "title": "별의 창조자",
            "id": 136,
            "key": "AurelionSol",
            "name": "아우렐리온 솔"
        },
        {
            "title": "눈먼 수도승",
            "id": 64,
            "key": "LeeSin",
            "name": "리 신"
        },
        {
            "title": "발로란의 방패",
            "id": 44,
            "key": "Taric",
            "name": "타릭"
        },
        {
            "title": "공허의 예언자",
            "id": 90,
            "key": "Malzahar",
            "name": "말자하"
        },
        {
            "title": "얼음 마녀",
            "id": 127,
            "key": "Lissandra",
            "name": "리산드라"
        },
        {
            "title": "차가운 달의 분노",
            "id": 131,
            "key": "Diana",
            "name": "다이애나"
        },
        {
            "title": "요들 사수",
            "id": 18,
            "key": "Tristana",
            "name": "트리스타나"
        },
        {
            "title": "공허의 복병",
            "id": 421,
            "key": "RekSai",
            "name": "렉사이"
        },
        {
            "title": "진홍빛 사신",
            "id": 8,
            "key": "Vladimir",
            "name": "블라디미르"
        },
        {
            "title": "데마시아의 귀감",
            "id": 59,
            "key": "JarvanIV",
            "name": "자르반 4세"
        },
        {
            "title": "파도 소환사",
            "id": 267,
            "key": "Nami",
            "name": "나미"
        },
        {
            "title": "잔혹극의 거장",
            "id": 202,
            "key": "Jhin",
            "name": "진"
        },
        {
            "title": "별의 아이",
            "id": 16,
            "key": "Soraka",
            "name": "소라카"
        },
        {
            "title": "악의 작은 지배자",
            "id": 45,
            "key": "Veigar",
            "name": "베이가"
        },
        {
            "title": "폭풍의 분노",
            "id": 40,
            "key": "Janna",
            "name": "잔나"
        },
        {
            "title": "심해의 타이탄",
            "id": 111,
            "key": "Nautilus",
            "name": "노틸러스"
        },
        {
            "title": "고통스런 포옹",
            "id": 28,
            "key": "Evelynn",
            "name": "이블린"
        },
        {
            "title": "술취한 난동꾼",
            "id": 79,
            "key": "Gragas",
            "name": "그라가스"
        },
        {
            "title": "그림자의 주인",
            "id": 238,
            "key": "Zed",
            "name": "제드"
        },
        {
            "title": "필트오버의 집행자",
            "id": 254,
            "key": "Vi",
            "name": "바이"
        },
        {
            "title": "심연의 아귀",
            "id": 96,
            "key": "KogMaw",
            "name": "코그모"
        },
        {
            "title": "구미호",
            "id": 103,
            "key": "Ahri",
            "name": "아리"
        },
        {
            "title": "데마시아의 날개",
            "id": 133,
            "key": "Quinn",
            "name": "퀸"
        },
        {
            "title": "환술사",
            "id": 7,
            "key": "Leblanc",
            "name": "르블랑"
        },
        {
            "title": "방탕한 탐험가",
            "id": 81,
            "key": "Ezreal",
            "name": "이즈리얼"
        },
        {
            "title": "여명의 성위",
            "id": 142,
            "key": "Zoe",
            "name": "조이"
        },
];

return champions;
}
