export function getChampions() {
const champions = [
        {
            "key": "원숭이 왕",
            "title": 62,
            "value": "MonvalueKing",
            "text": "오공"
        },
        {
            "key": "무기의 달인",
            "title": 24,
            "value": "Jax",
            "text": "잭스"
        },
        {
            "key": "종말의 전조",
            "title": 9,
            "value": "Ftitledlesticks",
            "text": "피들스틱"
        },
        {
            "key": "악마 어릿광대",
            "title": 35,
            "value": "Shaco",
            "text": "샤코"
        },
        {
            "key": "자운의 고삐 풀린 분노",
            "title": 19,
            "value": "Warwick",
            "text": "워윅"
        },
        {
            "key": "저항하는 자",
            "title": 498,
            "value": "Xayah",
            "text": "자야"
        },
        {
            "key": "야성의 사냥꾼",
            "title": 76,
            "value": "Ntitlealee",
            "text": "니달리"
        },
        {
            "key": "가시 덩굴의 복수",
            "title": 143,
            "value": "Zyra",
            "text": "자이라"
        },
        {
            "key": "망나니 기사",
            "title": 240,
            "value": "Kled",
            "text": "클레드"
        },
        {
            "key": "타오르는 복수",
            "title": 63,
            "value": "Brand",
            "text": "브랜드"
        },
        {
            "key": "중무장 아르마딜로",
            "title": 33,
            "value": "Rammus",
            "text": "람머스"
        },
        {
            "key": "크라켄의 여사제",
            "title": 420,
            "value": "Illaoi",
            "text": "일라오이"
        },
        {
            "key": "대담한 폭격수",
            "title": 42,
            "value": "Corki",
            "text": "코르키"
        },
        {
            "key": "프렐요드의 심장",
            "title": 201,
            "value": "Braum",
            "text": "브라움"
        },
        {
            "key": "녹서스의 실력자",
            "title": 122,
            "value": "Darius",
            "text": "다리우스"
        },
        {
            "key": "야만전사 왕",
            "title": 23,
            "value": "Tryndamere",
            "text": "트린다미어"
        },
        {
            "key": "현상금 사냥꾼",
            "title": 21,
            "value": "MissFortune",
            "text": "미스 포츈"
        },
        {
            "key": "영혼의 길잡이",
            "title": 83,
            "value": "Yorick",
            "text": "요릭"
        },
        {
            "key": "초월한 마법사",
            "title": 101,
            "value": "Xerath",
            "text": "제라스"
        },
        {
            "key": "전장의 여제",
            "title": 15,
            "value": "Sivir",
            "text": "시비르"
        },
        {
            "key": "추방자",
            "title": 92,
            "value": "Riven",
            "text": "리븐"
        },
        {
            "key": "시계태엽 소녀",
            "title": 61,
            "value": "Orianna",
            "text": "오리아나"
        },
        {
            "key": "바다의 무법자",
            "title": 41,
            "value": "Gangplank",
            "text": "갱플랭크"
        },
        {
            "key": "거석의 파편",
            "title": 54,
            "value": "Malphite",
            "text": "말파이트"
        },
        {
            "key": "망치의 수호자",
            "title": 78,
            "value": "Poppy",
            "text": "뽀삐"
        },
        {
            "key": "죽음을 노래하는 자",
            "title": 30,
            "value": "Karthus",
            "text": "카서스"
        },
        {
            "key": "미래의 수호자",
            "title": 126,
            "value": "Jayce",
            "text": "제이스"
        },
        {
            "key": "설인 기수",
            "title": 20,
            "value": "Nunu",
            "text": "누누"
        },
        {
            "key": "트롤 왕",
            "title": 48,
            "value": "Trundle",
            "text": "트런들"
        },
        {
            "key": "무법자",
            "title": 104,
            "value": "Graves",
            "text": "그레이브즈"
        },
        {
            "key": "타락한 천사",
            "title": 25,
            "value": "Morgana",
            "text": "모르가나"
        },
        {
            "key": "잃어버린 고리",
            "title": 150,
            "value": "Gnar",
            "text": "나르"
        },
        {
            "key": "광명의 소녀",
            "title": 99,
            "value": "Lux",
            "text": "럭스"
        },
        {
            "key": "하프 드래곤",
            "title": 102,
            "value": "Shyvana",
            "text": "쉬바나"
        },
        {
            "key": "사막의 도살자",
            "title": 58,
            "value": "Renekton",
            "text": "레넥톤"
        },
        {
            "key": "결투의 대가",
            "title": 114,
            "value": "Fiora",
            "text": "피오라"
        },
        {
            "key": "난폭한 말괄량이",
            "title": 222,
            "value": "Jinx",
            "text": "징크스"
        },
        {
            "key": "복수의 화신",
            "title": 429,
            "value": "Kalista",
            "text": "칼리스타"
        },
        {
            "key": "대양의 말썽꾸러기",
            "title": 105,
            "value": "Fizz",
            "text": "피즈"
        },
        {
            "key": "공허의 방랑자",
            "title": 38,
            "value": "Kassadin",
            "text": "카사딘"
        },
        {
            "key": "현의 명인",
            "title": 37,
            "value": "Sona",
            "text": "소나"
        },
        {
            "key": "칼날의 의지",
            "title": 39,
            "value": "Irelia",
            "text": "이렐리아"
        },
        {
            "key": "기계화의 전령관",
            "title": 112,
            "value": "Viktor",
            "text": "빅토르"
        },
        {
            "key": "매혹하는 자",
            "title": 497,
            "value": "Rakan",
            "text": "라칸"
        },
        {
            "key": "영겁의 사냥꾼",
            "title": 203,
            "value": "Kindred",
            "text": "킨드레드"
        },
        {
            "key": "독사의 포옹",
            "title": 69,
            "value": "Cassiopeia",
            "text": "카시오페아"
        },
        {
            "key": "뒤틀린 나무 정령",
            "title": 57,
            "value": "Maokai",
            "text": "마오카이"
        },
        {
            "key": "거산의 화염",
            "title": 516,
            "value": "Ornn",
            "text": "오른"
        },
        {
            "key": "지옥의 간수",
            "title": 412,
            "value": "Thresh",
            "text": "쓰레쉬"
        },
        {
            "key": "심판자",
            "title": 10,
            "value": "Kayle",
            "text": "케일"
        },
        {
            "key": "전쟁의 전조",
            "title": 120,
            "value": "Hecarim",
            "text": "헤카림"
        },
        {
            "key": "공허의 약탈자",
            "title": 121,
            "value": "Khazix",
            "text": "카직스"
        },
        {
            "key": "광전사",
            "title": 2,
            "value": "Olaf",
            "text": "올라프"
        },
        {
            "key": "마법공학 폭파병",
            "title": 115,
            "value": "Ziggs",
            "text": "직스"
        },
        {
            "key": "어둠의 여제",
            "title": 134,
            "value": "Syndra",
            "text": "신드라"
        },
        {
            "key": "자운의 광인",
            "title": 36,
            "value": "DrMundo",
            "text": "문도 박사"
        },
        {
            "key": "깨우친 자",
            "title": 43,
            "value": "Karma",
            "text": "카르마"
        },
        {
            "key": "어둠의 아이",
            "title": 1,
            "value": "Annie",
            "text": "애니"
        },
        {
            "key": "그림자의 권",
            "title": 84,
            "value": "Akali",
            "text": "아칼리"
        },
        {
            "key": "울부짖는 천둥",
            "title": 106,
            "value": "Volibear",
            "text": "볼리베어"
        },
        {
            "key": "용서받지 못한 자",
            "title": 157,
            "value": "Yasuo",
            "text": "야스오"
        },
        {
            "key": "폭풍의 심장",
            "title": 85,
            "value": "Kennen",
            "text": "케넨"
        },
        {
            "key": "추적하는 사자",
            "title": 107,
            "value": "Rengar",
            "text": "렝가"
        },
        {
            "key": "룬 마법사",
            "title": 13,
            "value": "Ryze",
            "text": "라이즈"
        },
        {
            "key": "황혼의 눈",
            "title": 98,
            "value": "Shen",
            "text": "쉔"
        },
        {
            "key": "비밀 병기",
            "title": 154,
            "value": "Zac",
            "text": "자크"
        },
        {
            "key": "검의 그림자",
            "title": 91,
            "value": "Talon",
            "text": "탈론"
        },
        {
            "key": "전략의 대가",
            "title": 50,
            "value": "Swain",
            "text": "스웨인"
        },
        {
            "key": "영겁의 수호자",
            "title": 432,
            "value": "Bard",
            "text": "바드"
        },
        {
            "key": "언데드 학살병기",
            "title": 14,
            "value": "Sion",
            "text": "사이온"
        },
        {
            "key": "어둠 사냥꾼",
            "title": 67,
            "value": "Vayne",
            "text": "베인"
        },
        {
            "key": "사막의 관리자",
            "title": 75,
            "value": "Nasus",
            "text": "나서스"
        },
        {
            "key": "그림자 사신",
            "title": 141,
            "value": "Kayn",
            "text": "케인"
        },
        {
            "key": "카드의 달인",
            "title": 4,
            "value": "TwistedFate",
            "text": "트위스티드 페이트"
        },
        {
            "key": "공허의 공포",
            "title": 31,
            "value": "Chogath",
            "text": "초가스"
        },
        {
            "key": "정령 주술사",
            "title": 77,
            "value": "Udyr",
            "text": "우디르"
        },
        {
            "key": "정화의 사도",
            "title": 236,
            "value": "Lucian",
            "text": "루시안"
        },
        {
            "key": "자연의 아버지",
            "title": 427,
            "value": "Ivern",
            "text": "아이번"
        },
        {
            "key": "여명의 빛",
            "title": 89,
            "value": "Leona",
            "text": "레오나"
        },
        {
            "key": "필트오버의 보안관",
            "title": 51,
            "value": "Caitlyn",
            "text": "케이틀린"
        },
        {
            "key": "혹한의 분노",
            "title": 113,
            "value": "Sejuani",
            "text": "세주아니"
        },
        {
            "key": "영원한 악몽",
            "title": 56,
            "value": "Nocturne",
            "text": "녹턴"
        },
        {
            "key": "시간의 수호자",
            "title": 26,
            "value": "Zilean",
            "text": "질리언"
        },
        {
            "key": "사막의 황제",
            "title": 268,
            "value": "Azir",
            "text": "아지르"
        },
        {
            "key": "기계 악동",
            "title": 68,
            "value": "Rumble",
            "text": "럼블"
        },
        {
            "key": "바위술사",
            "title": 163,
            "value": "Taliyah",
            "text": "탈리야"
        },
        {
            "key": "날쌘 정찰병",
            "title": 17,
            "value": "Teemo",
            "text": "티모"
        },
        {
            "key": "살상 병기",
            "title": 6,
            "value": "Urgot",
            "text": "우르곳"
        },
        {
            "key": "슬픈 미라",
            "title": 32,
            "value": "Amumu",
            "text": "아무무"
        },
        {
            "key": "위대한 석상",
            "title": 3,
            "value": "Galio",
            "text": "갈리오"
        },
        {
            "key": "위대한 발명가",
            "title": 74,
            "value": "Heimerdinger",
            "text": "하이머딩거"
        },
        {
            "key": "얼음불사조",
            "title": 34,
            "value": "Anivia",
            "text": "애니비아"
        },
        {
            "key": "서리 궁수",
            "title": 22,
            "value": "Ashe",
            "text": "애쉬"
        },
        {
            "key": "공허의 눈",
            "title": 161,
            "value": "Velkoz",
            "text": "벨코즈"
        },
        {
            "key": "미친 화학자",
            "title": 27,
            "value": "Singed",
            "text": "신지드"
        },
        {
            "key": "수정 선봉장",
            "title": 72,
            "value": "Skarner",
            "text": "스카너"
        },
        {
            "key": "응징의 화살",
            "title": 110,
            "value": "Varus",
            "text": "바루스"
        },
        {
            "key": "역병 쥐",
            "title": 29,
            "value": "Twitch",
            "text": "트위치"
        },
        {
            "key": "데마시아의 힘",
            "title": 86,
            "value": "Garen",
            "text": "가렌"
        },
        {
            "key": "거대 증기 골렘",
            "title": 53,
            "value": "Blitzcrank",
            "text": "블리츠크랭크"
        },
        {
            "key": "우주 검사",
            "title": 11,
            "value": "MasterYi",
            "text": "마스터 이"
        },
        {
            "key": "거미 여왕",
            "title": 60,
            "value": "Elise",
            "text": "엘리스"
        },
        {
            "key": "미노타우로스",
            "title": 12,
            "value": "Alistar",
            "text": "알리스타"
        },
        {
            "key": "사악한 칼날",
            "title": 55,
            "value": "Katarina",
            "text": "카타리나"
        },
        {
            "key": "시간을 달리는 소년",
            "title": 245,
            "value": "Ekko",
            "text": "에코"
        },
        {
            "key": "강철의 망령",
            "title": 82,
            "value": "Mordekaiser",
            "text": "모데카이저"
        },
        {
            "key": "요정 마법사",
            "title": 117,
            "value": "Lulu",
            "text": "룰루"
        },
        {
            "key": "강철의 그림자",
            "title": 164,
            "value": "Camille",
            "text": "카밀"
        },
        {
            "key": "다르킨의 검",
            "title": 266,
            "value": "Aatrox",
            "text": "아트록스"
        },
        {
            "key": "화려한 처형자",
            "title": 119,
            "value": "Draven",
            "text": "드레이븐"
        },
        {
            "key": "강의 폭군",
            "title": 223,
            "value": "TahmKench",
            "text": "탐 켄치"
        },
        {
            "key": "전쟁의 장인",
            "title": 80,
            "value": "Pantheon",
            "text": "판테온"
        },
        {
            "key": "데마시아의 호위무사",
            "title": 5,
            "value": "XinZhao",
            "text": "신 짜오"
        },
        {
            "key": "별의 창조자",
            "title": 136,
            "value": "AurelionSol",
            "text": "아우렐리온 솔"
        },
        {
            "key": "눈먼 수도승",
            "title": 64,
            "value": "LeeSin",
            "text": "리 신"
        },
        {
            "key": "발로란의 방패",
            "title": 44,
            "value": "Taric",
            "text": "타릭"
        },
        {
            "key": "공허의 예언자",
            "title": 90,
            "value": "Malzahar",
            "text": "말자하"
        },
        {
            "key": "얼음 마녀",
            "title": 127,
            "value": "Lissandra",
            "text": "리산드라"
        },
        {
            "key": "차가운 달의 분노",
            "title": 131,
            "value": "Diana",
            "text": "다이애나"
        },
        {
            "key": "요들 사수",
            "title": 18,
            "value": "Tristana",
            "text": "트리스타나"
        },
        {
            "key": "공허의 복병",
            "title": 421,
            "value": "RekSai",
            "text": "렉사이"
        },
        {
            "key": "진홍빛 사신",
            "title": 8,
            "value": "Vladimir",
            "text": "블라디미르"
        },
        {
            "key": "데마시아의 귀감",
            "title": 59,
            "value": "JarvanIV",
            "text": "자르반 4세"
        },
        {
            "key": "파도 소환사",
            "title": 267,
            "value": "Nami",
            "text": "나미"
        },
        {
            "key": "잔혹극의 거장",
            "title": 202,
            "value": "Jhin",
            "text": "진"
        },
        {
            "key": "별의 아이",
            "title": 16,
            "value": "Soraka",
            "text": "소라카"
        },
        {
            "key": "악의 작은 지배자",
            "title": 45,
            "value": "Veigar",
            "text": "베이가"
        },
        {
            "key": "폭풍의 분노",
            "title": 40,
            "value": "Janna",
            "text": "잔나"
        },
        {
            "key": "심해의 타이탄",
            "title": 111,
            "value": "Nautilus",
            "text": "노틸러스"
        },
        {
            "key": "고통스런 포옹",
            "title": 28,
            "value": "Evelynn",
            "text": "이블린"
        },
        {
            "key": "술취한 난동꾼",
            "title": 79,
            "value": "Gragas",
            "text": "그라가스"
        },
        {
            "key": "그림자의 주인",
            "title": 238,
            "value": "Zed",
            "text": "제드"
        },
        {
            "key": "필트오버의 집행자",
            "title": 254,
            "value": "Vi",
            "text": "바이"
        },
        {
            "key": "심연의 아귀",
            "title": 96,
            "value": "KogMaw",
            "text": "코그모"
        },
        {
            "key": "구미호",
            "title": 103,
            "value": "Ahri",
            "text": "아리"
        },
        {
            "key": "데마시아의 날개",
            "title": 133,
            "value": "Quinn",
            "text": "퀸"
        },
        {
            "key": "환술사",
            "title": 7,
            "value": "Leblanc",
            "text": "르블랑"
        },
        {
            "key": "방탕한 탐험가",
            "title": 81,
            "value": "Ezreal",
            "text": "이즈리얼"
        },
        {
            "key": "여명의 성위",
            "title": 142,
            "value": "Zoe",
            "text": "조이"
        },
];

return champions;
}
