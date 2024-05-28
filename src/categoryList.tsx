interface Subregion {
    name: string;
}

interface Region {
    name: string;
    subregions: { [key: string]: Subregion };
}

interface Theme {
    name: string;
}

export interface Categories {
    regions: { [key: string]: Region };
    themes: { [key: string]: Theme };
}

export const categories: Categories = {
    regions: {
        seoul: {
            name: '서울',
            subregions: {
                'gangnam-area': {
                    name: '강남/역삼/삼성/신사/청담',
                },
                'seocho-area': {
                    name: '서초/교대',
                },
                'jamsil-area': {
                    name: '잠실/송파/왕십리/강동',
                },
                'euljiro-area': {
                    name: '을지로/시청/명동',
                },
                'jongno-area': {
                    name: '종로/인사동/동대문/강북',
                },
                'seoul-station-area': {
                    name: '서울역/이태원/용산',
                },
                'mapo-area': {
                    name: '마포/홍대/신촌/서대문',
                },
                'yeongdeungpo-area': {
                    name: '영등포/여의도/김포공항',
                },
                'guro-area': {
                    name: '구로/금천/관악/동작',
                },
            },
        },
        busan: {
            name: '부산',
            subregions: {
                haeundae: {
                    name: '해운대',
                },
                gwangan: {
                    name: '광안리',
                },
                'busan-station-area': {
                    name: '부산역/남포/자갈치',
                },
                'seomyeon-area': {
                    name: '서면/동래/연제/남구',
                },
                'yeongdo-area': {
                    name: '영도/송도해수욕장',
                },
                'gijang-area': {
                    name: '기장/김해공항/기타',
                },
            },
        },
        jeju: {
            name: '제주',
            subregions: {
                'jeju-city': {
                    name: '제주시/제주국제공항',
                },
                'aewol-area': {
                    name: '애월/협재/한림',
                },
                'jocheon-area': {
                    name: '조천/함덕/김녕',
                },
                'seogwipo-city': {
                    name: '서귀포시',
                },
                jungmun: {
                    name: '중문',
                },
                'seongsan-area': {
                    name: '성산/표선',
                },
            },
        },
        gangwon: {
            name: '강원',
            subregions: {
                'gangneung-area': {
                    name: '강릉/동해/삼척',
                },
                'sokcho-area': {
                    name: '속초/고성',
                },
                'yangyang-area': {
                    name: '양양/홍천/인제/철원',
                },
                'pyeongchang-area': {
                    name: '평창/정선/횡성',
                },
                'chuncheon-area': {
                    name: '춘천/원주/영월/태백',
                },
            },
        },
        gyeonggi: {
            name: '경기',
            subregions: {
                'suwon-area': {
                    name: '수원/성남/판교',
                },
                'yongin-area': {
                    name: '용인/평택/여주/인천',
                },
                'goyang-area': {
                    name: '고양/의정부/파주/김포',
                },
                'namyangju-area': {
                    name: '남양주/구리/하남',
                },
                'siheung-area': {
                    name: '시흥/군포/광명',
                },
                'hwaseong-area': {
                    name: '화성/동탄/안산/부천/안양',
                },
                'gapyeong-area': {
                    name: '가평/양평/포천',
                },
            },
        },
        incheon: {
            name: '인천',
            subregions: {
                'songdo-area': {
                    name: '송도/남동구/옹진군',
                },
                ' incheon-airport-area': {
                    name: '인천국제공항(중구)',
                },
                'bupyeong-area': {
                    name: '부평/계양/서구/미추홀구/강화',
                },
            },
        },
        gyeongsang: {
            name: '경상',
            subregions: {
                gyeongju: {
                    name: '경주',
                },
                'geoje-area': {
                    name: '거제/고성',
                },
                'pohang-area': {
                    name: '포항/청송/영덕/울진',
                },
                'tongyeong-area': {
                    name: '통영/창녕',
                },
                'daegu-area': {
                    name: '대구/구미/문경/안동',
                },
                'changwon-area': {
                    name: '창원/양산/김해/울산',
                },
                'sacheon-area': {
                    name: '사천/남해/진주/하동',
                },
            },
        },
        jeolla: {
            name: '전라',
            subregions: {
                yeosu: {
                    name: '여수',
                },

                jeonju: {
                    name: '전주',
                },
                gwangju: {
                    name: '광주',
                },
                'suncheon-area': {
                    name: '순천/광양',
                },
                'gunsan-area': {
                    name: '군산/익산/부안/진안/무주',
                },
                'hwasun-area': {
                    name: '화순/남원/구례',
                },
                'mokpo-area': {
                    name: '목포/나주/완도/해남/영암',
                },
            },
        },
        chungcheong: {
            name: '충청',
            subregions: {
                daejeon: {
                    name: '대전',
                },
                'cheonan-area': {
                    name: '천안/아산/예산/당진',
                },
                'boryeong-area': {
                    name: '보령/태안/서산/부여',
                },
                'chungju-area': {
                    name: '충주/제천/단양',
                },
                'cheongju-area': {
                    name: '청주/세종',
                },
            },
        },
        overseas: {
            name: '해외',
            subregions: {
                asia: {
                    name: '아시아',
                },
                europe: {
                    name: '유럽',
                },
                'north-america': {
                    name: '북아메리카',
                },
                'south-america': {
                    name: '남아메리카',
                },
                oceania: {
                    name: '오세아니아',
                },
                africa: {
                    name: '아프리카',
                },
            },
        },
    },
    themes: {
        course: { name: '코스' },
        nature: { name: '자연' },
        dining: { name: '식당' },
        cafe: { name: '카페' },
        culture: { name: '문화' },
        travel: { name: '여행' },
        other: { name: '기타' },
    },
};
