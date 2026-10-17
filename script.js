/* =========================================
   역사 지도 탐험 - script.js
   사건을 추가하려면 아래 EVENTS 배열에 같은 형식으로 넣으면 됩니다.
   year: 정렬용 숫자 (기원전은 음수)
   era: ancient | medieval | earlymodern | modern | contemporary
   region: world(세계사) | korea(한국사)
   ========================================= */

const ERAS = {
  ancient:      { name: '고대', color: '#B8860B' },
  medieval:     { name: '중세', color: '#2A7F7A' },
  earlymodern:  { name: '근세', color: '#3F6FB5' },
  modern:       { name: '근대', color: '#7A3E8E' },
  contemporary: { name: '현대', color: '#C23B3B' },
};

const EVENTS = [
  // ---------- 고대 ----------
  {
    id: 'mesopotamia', title: '메소포타미아 문명', year: -3500, yearLabel: '기원전 3500년경',
    era: 'ancient', region: 'world', place: '우르 (오늘날 이라크)', lat: 30.96, lng: 46.10,
    summary: '티그리스강과 유프라테스강 사이에서 수메르인이 도시 국가를 세웠어요. 쐐기 문자를 만들었고, 훗날 바빌로니아에서 함무라비 법전(기원전 1750년경)이 만들어졌어요.',
    keywords: ['쐐기 문자', '지구라트', '함무라비 법전'],
  },
  {
    id: 'egypt', title: '이집트 문명과 피라미드', year: -2560, yearLabel: '기원전 2560년경',
    era: 'ancient', region: 'world', place: '기자 (오늘날 이집트)', lat: 29.98, lng: 31.13,
    summary: '나일강이 정기적으로 범람하면서 기름진 땅이 만들어져 농업이 발달했어요. 파라오는 태양신의 아들로 여겨졌고, 이 무렵 기자에 쿠푸왕의 피라미드가 세워졌어요.',
    keywords: ['나일강', '파라오', '상형 문자', '미라'],
  },
  {
    id: 'indus', title: '인더스 문명', year: -2500, yearLabel: '기원전 2500년경',
    era: 'ancient', region: 'world', place: '모헨조다로 (오늘날 파키스탄)', lat: 27.33, lng: 68.14,
    summary: '인더스강 유역에 계획 도시가 세워졌어요. 모헨조다로에는 바둑판 모양의 도로, 하수 시설, 대형 목욕탕이 갖추어져 있었어요.',
    keywords: ['계획 도시', '모헨조다로', '하라파'],
  },
  {
    id: 'shang', title: '중국 문명과 상(은) 왕조', year: -1600, yearLabel: '기원전 1600년경',
    era: 'ancient', region: 'world', place: '은허, 안양 (오늘날 중국)', lat: 36.10, lng: 114.39,
    summary: '황허강 유역에서 상 왕조가 일어났어요. 왕은 점을 쳐서 나라의 중요한 일을 결정했고, 그 내용을 거북 껍데기나 소뼈에 새긴 갑골 문자가 한자의 기원이 되었어요.',
    keywords: ['황허강', '갑골 문자', '청동기'],
  },
  {
    id: 'buddhism', title: '불교의 성립', year: -550, yearLabel: '기원전 6세기경',
    era: 'ancient', region: 'world', place: '부다가야 (오늘날 인도)', lat: 24.70, lng: 84.99,
    summary: '석가모니(고타마 싯다르타)가 깨달음을 얻고 불교를 열었어요. 카스트 제도에 따른 차별을 비판하고, 누구나 수행을 통해 해탈할 수 있다고 가르쳤어요.',
    keywords: ['석가모니', '카스트 제도 비판', '해탈'],
  },
  {
    id: 'athens', title: '아테네의 민주 정치', year: -450, yearLabel: '기원전 5세기',
    era: 'ancient', region: 'world', place: '아테네 (오늘날 그리스)', lat: 37.97, lng: 23.73,
    summary: '페리클레스 시대에 민회를 중심으로 한 민주 정치가 꽃피었어요. 하지만 여성, 노예, 외국인은 정치에 참여할 수 없는 제한된 민주 정치였어요.',
    keywords: ['폴리스', '민회', '페리클레스', '직접 민주 정치'],
  },
  {
    id: 'alexander', title: '알렉산드로스의 동방 원정', year: -334, yearLabel: '기원전 334~323년',
    era: 'ancient', region: 'world', place: '알렉산드리아 (오늘날 이집트)', lat: 31.20, lng: 29.92,
    summary: '마케도니아의 알렉산드로스는 그리스에서 인도 서북부까지 정복했어요. 정복지 곳곳에 알렉산드리아라는 도시를 세웠고, 그리스 문화와 오리엔트 문화가 어우러진 헬레니즘 문화가 생겨났어요.',
    keywords: ['마케도니아', '헬레니즘 문화'],
  },
  {
    id: 'qin', title: '진의 중국 통일', year: -221, yearLabel: '기원전 221년',
    era: 'ancient', region: 'world', place: '셴양 (오늘날 중국 시안 부근)', lat: 34.33, lng: 108.71,
    summary: '진의 시황제가 처음으로 중국을 통일했어요. 군현제를 실시하고 화폐·도량형·문자를 통일했으며, 북쪽 유목 민족을 막기 위해 만리장성을 쌓았어요.',
    keywords: ['시황제', '군현제', '분서갱유', '만리장성'],
  },
  {
    id: 'rome', title: '로마 제정의 시작', year: -27, yearLabel: '기원전 27년',
    era: 'ancient', region: 'world', place: '로마 (오늘날 이탈리아)', lat: 41.89, lng: 12.49,
    summary: '옥타비아누스가 원로원으로부터 ‘아우구스투스(존엄한 자)’라는 칭호를 받으며 사실상 황제가 되었어요. 이후 약 200년 동안 ‘로마의 평화(팍스 로마나)’가 이어졌어요.',
    keywords: ['아우구스투스', '팍스 로마나', '제정'],
  },
  {
    id: 'gwanggaeto', title: '광개토 대왕릉비 건립', year: 414, yearLabel: '414년',
    era: 'ancient', region: 'korea', place: '국내성 부근, 지안 (오늘날 중국)', lat: 41.13, lng: 126.19,
    summary: '장수왕이 아버지 광개토 대왕의 업적을 기리기 위해 세운 비석이에요. 고구려가 영토를 크게 넓히고 동북아시아의 강국으로 성장한 모습을 보여 줘요.',
    keywords: ['광개토 대왕', '장수왕', '영토 확장'],
  },
  {
    id: 'silla', title: '신라의 삼국 통일', year: 676, yearLabel: '676년',
    era: 'ancient', region: 'korea', place: '경주 (서라벌)', lat: 35.84, lng: 129.21,
    summary: '신라는 당과 연합하여 백제(660)와 고구려(668)를 멸망시켰어요. 이후 나당 전쟁에서 당군을 몰아내고 676년 삼국 통일을 이루었어요.',
    keywords: ['나당 연합', '나당 전쟁', '매소성·기벌포 전투'],
  },

  // ---------- 중세 ----------
  {
    id: 'tang', title: '당의 건국과 국제도시 장안', year: 618, yearLabel: '618년',
    era: 'medieval', region: 'world', place: '장안 (오늘날 중국 시안)', lat: 34.27, lng: 108.95,
    summary: '당은 율령 체제를 갖추고 넓은 영토를 다스렸어요. 수도 장안은 실크로드를 통해 온 상인과 여러 나라의 유학생으로 붐비는 국제도시였어요.',
    keywords: ['율령', '장안', '실크로드', '국제적 문화'],
  },
  {
    id: 'islam', title: '이슬람교의 성립과 헤지라', year: 622, yearLabel: '622년',
    era: 'medieval', region: 'world', place: '메디나 (오늘날 사우디아라비아)', lat: 24.47, lng: 39.61,
    summary: '무함마드가 메카에서 박해를 피해 메디나로 옮겨 갔어요(헤지라). 이 해가 이슬람력의 첫해가 되었고, 이후 이슬람 세력은 아라비아반도를 통일했어요.',
    keywords: ['무함마드', '헤지라', '쿠란', '메카'],
  },
  {
    id: 'charlemagne', title: '카롤루스 대제의 대관', year: 800, yearLabel: '800년',
    era: 'medieval', region: 'world', place: '아헨 (프랑크 왕국의 중심지, 오늘날 독일)', lat: 50.78, lng: 6.08,
    summary: '프랑크 왕국의 카롤루스 대제가 로마 교황에게 서로마 황제의 관을 받았어요. 이로써 로마 문화, 크리스트교, 게르만 문화가 합쳐진 서유럽 문화의 기틀이 마련되었어요.',
    keywords: ['프랑크 왕국', '교황', '서유럽 문화'],
  },
  {
    id: 'goryeo', title: '고려의 건국', year: 918, yearLabel: '918년',
    era: 'medieval', region: 'korea', place: '개경 (오늘날 개성)', lat: 37.97, lng: 126.55,
    summary: '왕건이 고려를 세우고 936년 후삼국을 통일했어요. 개경을 수도로 삼았고, 지방 호족을 포용하는 정책을 펼쳤어요.',
    keywords: ['왕건', '후삼국 통일', '호족 통합'],
  },
  {
    id: 'crusades', title: '십자군 전쟁', year: 1096, yearLabel: '1096~1270년',
    era: 'medieval', region: 'world', place: '예루살렘', lat: 31.78, lng: 35.23,
    summary: '셀주크 튀르크가 예루살렘을 차지하자 교황의 호소로 십자군이 결성되었어요. 약 200년 동안 이어진 전쟁은 결국 실패했지만, 교황권이 약해지고 동서 교류가 늘어나는 결과를 가져왔어요.',
    keywords: ['교황 우르바누스 2세', '셀주크 튀르크', '교황권 약화'],
  },
  {
    id: 'mongol', title: '몽골 제국의 성립', year: 1206, yearLabel: '1206년',
    era: 'medieval', region: 'world', place: '카라코룸 (몽골 제국의 수도, 오늘날 몽골)', lat: 47.20, lng: 102.82,
    summary: '테무친이 몽골 부족을 통일하고 칭기즈 칸으로 추대되었어요. 몽골은 유라시아에 걸친 대제국을 세웠고, 역참제가 마련되면서 동서 교류가 활발해졌어요.',
    keywords: ['칭기즈 칸', '역참제', '원', '동서 교류'],
  },

  // ---------- 근세 ----------
  {
    id: 'joseon', title: '조선의 건국', year: 1392, yearLabel: '1392년',
    era: 'earlymodern', region: 'korea', place: '한양 (오늘날 서울)', lat: 37.566, lng: 126.978,
    summary: '이성계가 신진 사대부와 함께 조선을 세웠어요. 1394년 수도를 한양으로 옮기고 경복궁을 지었으며, 성리학을 나라를 다스리는 이념으로 삼았어요.',
    keywords: ['이성계', '정도전', '한양 천도', '성리학'],
  },
  {
    id: 'hunminjeongeum', title: '훈민정음 반포', year: 1446, yearLabel: '1446년',
    era: 'earlymodern', region: 'korea', place: '경복궁, 한양', lat: 37.580, lng: 126.977,
    summary: '세종은 백성이 쉽게 익혀 쓸 수 있도록 훈민정음을 만들어(1443) 반포했어요. 집현전 학자들과 함께 여러 책을 펴내며 민족 문화를 발전시켰어요.',
    keywords: ['세종', '집현전', '훈민정음'],
  },
  {
    id: 'constantinople', title: '콘스탄티노폴리스 함락', year: 1453, yearLabel: '1453년',
    era: 'earlymodern', region: 'world', place: '콘스탄티노폴리스 (오늘날 튀르키예 이스탄불)', lat: 41.01, lng: 28.98,
    summary: '오스만 제국의 메흐메트 2세가 콘스탄티노폴리스를 점령하면서 비잔티움 제국이 멸망했어요. 도시는 이스탄불로 불리며 오스만 제국의 수도가 되었어요.',
    keywords: ['오스만 제국', '비잔티움 제국 멸망', '이스탄불'],
  },
  {
    id: 'columbus', title: '콜럼버스의 아메리카 도착', year: 1492, yearLabel: '1492년',
    era: 'earlymodern', region: 'world', place: '산살바도르섬 (오늘날 바하마)', lat: 24.05, lng: -74.50,
    summary: '에스파냐의 지원을 받은 콜럼버스가 대서양을 건너 아메리카에 도착했어요. 이후 유럽인의 아메리카 진출이 시작되었고, 원주민 사회는 전쟁과 전염병으로 큰 피해를 입었어요.',
    keywords: ['신항로 개척', '에스파냐', '아메리카 원주민'],
  },
  {
    id: 'luther', title: '루터의 종교 개혁', year: 1517, yearLabel: '1517년',
    era: 'earlymodern', region: 'world', place: '비텐베르크 (오늘날 독일)', lat: 51.87, lng: 12.65,
    summary: '루터가 교황청의 면벌부 판매를 비판하는 95개조 반박문을 발표했어요. 믿음과 성경을 중시하는 그의 주장은 유럽 곳곳의 종교 개혁으로 이어졌어요.',
    keywords: ['면벌부', '95개조 반박문', '신교(프로테스탄트)'],
  },
  {
    id: 'imjin', title: '임진왜란과 한산도 대첩', year: 1592, yearLabel: '1592년',
    era: 'earlymodern', region: 'korea', place: '한산도 앞바다 (경상남도 통영)', lat: 34.77, lng: 128.47,
    summary: '일본이 조선을 침략하자 이순신이 이끄는 수군이 학익진 전법으로 한산도 앞바다에서 크게 이겼어요. 수군의 활약과 의병의 저항으로 조선은 위기를 이겨 냈어요.',
    keywords: ['이순신', '학익진', '의병', '거북선'],
  },

  // ---------- 근대 ----------
  {
    id: 'industrial', title: '영국의 산업 혁명', year: 1760, yearLabel: '18세기 후반',
    era: 'modern', region: 'world', place: '맨체스터 (오늘날 영국)', lat: 53.48, lng: -2.24,
    summary: '방적기와 증기 기관 같은 기계가 발명되면서 공장에서 물건을 대량으로 생산하게 되었어요. 맨체스터는 면직물 공업의 중심지가 되었지만, 노동 문제와 도시 문제도 함께 생겨났어요.',
    keywords: ['증기 기관', '면직물 공업', '노동 문제'],
  },
  {
    id: 'usa', title: '미국 독립 선언', year: 1776, yearLabel: '1776년',
    era: 'modern', region: 'world', place: '필라델피아 (오늘날 미국)', lat: 39.95, lng: -75.15,
    summary: '영국의 세금 부과에 반발한 13개 식민지 대표들이 독립 선언서를 발표했어요. 독립 전쟁에서 승리한 뒤 삼권 분립을 담은 헌법을 만들어 민주 공화국을 세웠어요.',
    keywords: ['보스턴 차 사건', '독립 선언서', '삼권 분립'],
  },
  {
    id: 'france', title: '프랑스 혁명', year: 1789, yearLabel: '1789년',
    era: 'modern', region: 'world', place: '파리 (오늘날 프랑스)', lat: 48.86, lng: 2.35,
    summary: '구제도의 모순에 맞서 파리 시민들이 바스티유 감옥을 습격했어요. 국민 의회는 ‘인간과 시민의 권리 선언’을 발표해 자유와 평등의 원칙을 밝혔어요.',
    keywords: ['구제도', '바스티유 감옥', '인권 선언'],
  },
  {
    id: 'opium', title: '아편 전쟁', year: 1840, yearLabel: '1840~1842년',
    era: 'modern', region: 'world', place: '광저우 (오늘날 중국)', lat: 23.13, lng: 113.26,
    summary: '청이 광저우에서 영국 상인의 아편을 몰수하자 영국이 전쟁을 일으켰어요. 패배한 청은 난징 조약을 맺어 홍콩을 넘겨주고 항구를 열어야 했어요.',
    keywords: ['임칙서', '난징 조약', '홍콩'],
  },
  {
    id: 'meiji', title: '메이지 유신', year: 1868, yearLabel: '1868년',
    era: 'modern', region: 'world', place: '도쿄 (오늘날 일본)', lat: 35.68, lng: 139.69,
    summary: '에도 막부가 무너지고 천황 중심의 새 정부가 들어섰어요. 서양의 제도와 기술을 받아들이는 근대화를 추진했고, 이후 이웃 나라를 침략하는 길로 나아갔어요.',
    keywords: ['막부 붕괴', '근대화', '부국강병'],
  },
  {
    id: 'ganghwa', title: '강화도 조약', year: 1876, yearLabel: '1876년',
    era: 'modern', region: 'korea', place: '강화도 (인천광역시 강화군)', lat: 37.71, lng: 126.49,
    summary: '운요호 사건을 계기로 조선이 일본과 맺은 최초의 근대적 조약이에요. 치외 법권 등을 인정한 불평등 조약으로, 부산 등 항구가 열렸어요.',
    keywords: ['운요호 사건', '불평등 조약', '개항'],
  },

  // ---------- 현대 ----------
  {
    id: 'sarajevo', title: '사라예보 사건과 제1차 세계 대전', year: 1914, yearLabel: '1914년',
    era: 'contemporary', region: 'world', place: '사라예보 (오늘날 보스니아 헤르체고비나)', lat: 43.86, lng: 18.41,
    summary: '오스트리아 황태자 부부가 세르비아 청년에게 암살된 사건을 계기로 제1차 세계 대전이 일어났어요. 동맹국과 연합국으로 나뉜 나라들이 나라의 모든 힘을 쏟는 총력전을 벌였어요.',
    keywords: ['황태자 암살', '총력전', '삼국 동맹과 삼국 협상'],
  },
  {
    id: 'russia', title: '러시아 혁명', year: 1917, yearLabel: '1917년',
    era: 'contemporary', region: 'world', place: '페트로그라드 (오늘날 러시아 상트페테르부르크)', lat: 59.93, lng: 30.36,
    summary: '전쟁과 굶주림에 지친 민중이 들고일어나 황제 정치가 무너졌어요. 이후 레닌이 이끄는 볼셰비키가 정권을 잡아 세계 최초의 사회주의 정부를 세웠어요.',
    keywords: ['레닌', '볼셰비키', '사회주의'],
  },
  {
    id: 'march1', title: '3·1 운동', year: 1919, yearLabel: '1919년 3월',
    era: 'contemporary', region: 'korea', place: '탑골 공원, 서울', lat: 37.571, lng: 126.988,
    summary: '민족 대표 33인이 독립 선언서를 발표하고, 탑골 공원에서 학생과 시민들이 만세 시위를 시작했어요. 시위는 전국과 해외로 퍼져 나갔어요.',
    keywords: ['독립 선언서', '만세 시위', '유관순'],
  },
  {
    id: 'provisional', title: '대한민국 임시 정부 수립', year: 1919, yearLabel: '1919년 4월',
    era: 'contemporary', region: 'korea', place: '상하이 (오늘날 중국)', lat: 31.22, lng: 121.47,
    summary: '3·1 운동을 계기로 상하이에서 대한민국 임시 정부가 세워졌어요. 민주 공화제를 채택했고, 독립운동을 이끄는 중심 역할을 했어요.',
    keywords: ['민주 공화제', '연통제', '김구'],
  },
  {
    id: 'hiroshima', title: '원자 폭탄 투하와 광복', year: 1945, yearLabel: '1945년 8월',
    era: 'contemporary', region: 'world', place: '히로시마 (오늘날 일본)', lat: 34.39, lng: 132.45,
    summary: '미국이 히로시마와 나가사키에 원자 폭탄을 떨어뜨렸고, 일본이 항복하면서 제2차 세계 대전이 끝났어요. 우리 민족은 8·15 광복을 맞이했어요.',
    keywords: ['제2차 세계 대전', '일본 항복', '8·15 광복'],
  },
  {
    id: 'un', title: '국제 연합(UN) 창설', year: 1945, yearLabel: '1945년',
    era: 'contemporary', region: 'world', place: '샌프란시스코 (오늘날 미국, 헌장 채택)', lat: 37.77, lng: -122.42,
    summary: '전쟁이 되풀이되는 것을 막기 위해 샌프란시스코 회의에서 국제 연합 헌장이 채택되었고, 1945년 10월 국제 연합이 정식으로 출범했어요. 본부는 뉴욕에 있어요.',
    keywords: ['국제 연합 헌장', '안전 보장 이사회', '평화 유지'],
  },
  {
    id: 'koreanwar', title: '6·25 전쟁과 정전 협정', year: 1950, yearLabel: '1950~1953년',
    era: 'contemporary', region: 'korea', place: '판문점 (경기도 파주)', lat: 37.95, lng: 126.68,
    summary: '1950년 6월 25일 북한의 남침으로 전쟁이 시작되었어요. 1953년 7월 판문점에서 정전 협정이 맺어졌고, 군사 분계선이 그어졌어요.',
    keywords: ['북한의 남침', '인천 상륙 작전', '정전 협정'],
  },
  {
    id: 'may18', title: '5·18 민주화 운동', year: 1980, yearLabel: '1980년',
    era: 'contemporary', region: 'korea', place: '광주 (광주광역시)', lat: 35.15, lng: 126.85,
    summary: '신군부의 권력 장악과 비상계엄 확대에 맞서 광주 시민들이 민주화를 요구했어요. 계엄군의 무력 진압으로 많은 시민이 희생되었고, 관련 기록물은 유네스코 세계 기록 유산이 되었어요.',
    keywords: ['신군부', '비상계엄', '민주화 운동'],
  },
  {
    id: 'berlin', title: '베를린 장벽 붕괴', year: 1989, yearLabel: '1989년',
    era: 'contemporary', region: 'world', place: '베를린 (오늘날 독일)', lat: 52.52, lng: 13.40,
    summary: '냉전의 상징이던 베를린 장벽이 무너졌어요. 이듬해 독일이 통일되었고, 1991년 소련이 해체되면서 냉전 체제가 막을 내렸어요.',
    keywords: ['냉전 종식', '독일 통일', '소련 해체'],
  },
];

// 연도순 정렬
EVENTS.sort((a, b) => a.year - b.year);
const byId = new Map(EVENTS.map((ev) => [ev.id, ev]));

const REGION_NAME = { world: '세계사', korea: '한국사' };
const START_VIEW = { center: [32, 70], zoom: 2 };
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 화면 요소 ---------- */
const $ = (id) => document.getElementById(id);
const els = {
  search: $('searchInput'),
  eraFilters: $('eraFilters'),
  regionFilter: $('regionFilter'),
  count: $('resultCount'),
  list: $('eventList'),
  detail: $('detail'),
  detailEra: $('detailEra'),
  detailRegion: $('detailRegion'),
  detailYear: $('detailYear'),
  detailTitle: $('detailTitle'),
  detailPlace: $('detailPlace'),
  detailText: $('detailText'),
  detailKeywords: $('detailKeywords'),
  prev: $('prevEvent'),
  next: $('nextEvent'),
  legend: $('legend'),
  explorePanel: $('explorePanel'),
  quizPanel: $('quizPanel'),
  modeExplore: $('modeExplore'),
  modeQuiz: $('modeQuiz'),
  quizProgress: $('quizProgress'),
  quizQuestion: $('quizQuestion'),
  quizHint: $('quizHint'),
  quizFeedback: $('quizFeedback'),
  quizNext: $('quizNext'),
  quizRestart: $('quizRestart'),
};

/* ---------- 상태 ---------- */
const state = {
  eras: new Set(Object.keys(ERAS)),
  region: 'all',
  query: '',
  selected: null,
};

const quiz = { active: false, questions: [], index: 0, score: 0, answered: false };

/* ---------- 지도 ---------- */
const map = L.map('map', { worldCopyJump: true, minZoom: 2 })
  .setView(START_VIEW.center, START_VIEW.zoom);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 18,
}).addTo(map);

const markerLayer = L.layerGroup().addTo(map);
const markers = new Map();

EVENTS.forEach((ev) => {
  const icon = L.divIcon({
    className: 'pin-wrap',
    html: `<span class="pin ${ev.region}" style="--c:${ERAS[ev.era].color}"></span>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  const marker = L.marker([ev.lat, ev.lng], { icon, keyboard: true });
  marker.bindTooltip(`<strong>${ev.title}</strong><br>${ev.yearLabel}`, {
    direction: 'top',
    offset: [0, -10],
    className: 'pin-tip',
  });
  marker.on('click', () => {
    if (quiz.active) answerQuiz(ev.id);
    else selectEvent(ev.id);
  });
  markers.set(ev.id, marker);
});

function moveMap(latlng, zoom) {
  if (reducedMotion) map.setView(latlng, zoom);
  else map.flyTo(latlng, zoom, { duration: 0.8 });
}

/* ---------- 필터 ---------- */
function getFiltered() {
  const q = state.query.trim().toLowerCase();
  return EVENTS.filter((ev) => {
    if (!state.eras.has(ev.era)) return false;
    if (state.region !== 'all' && ev.region !== state.region) return false;
    if (!q) return true;
    const text = [ev.title, ev.place, ev.summary, ev.yearLabel, ...ev.keywords].join(' ').toLowerCase();
    return text.includes(q);
  });
}

function buildEraFilters() {
  Object.entries(ERAS).forEach(([key, era]) => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = era.name;
    btn.style.setProperty('--c', era.color);
    btn.setAttribute('aria-pressed', 'true');
    btn.addEventListener('click', () => {
      if (state.eras.has(key)) state.eras.delete(key);
      else state.eras.add(key);
      btn.setAttribute('aria-pressed', String(state.eras.has(key)));
      render();
    });
    els.eraFilters.appendChild(btn);
  });
}

function buildLegend() {
  const rows = Object.values(ERAS).map((era) =>
    `<div class="legend-row"><span class="pin" style="--c:${era.color}"></span>${era.name}</div>`
  ).join('');
  els.legend.innerHTML = `${rows}<hr>
    <div class="legend-row"><span class="pin" style="--c:#8A94A8"></span>세계사</div>
    <div class="legend-row"><span class="pin korea" style="--c:#8A94A8"></span>한국사</div>`;
}

/* ---------- 목록과 지도 다시 그리기 ---------- */
function render() {
  const list = getFiltered();
  const visible = new Set(list.map((ev) => ev.id));

  markers.forEach((marker, id) => {
    if (visible.has(id)) markerLayer.addLayer(marker);
    else markerLayer.removeLayer(marker);
  });

  els.list.innerHTML = '';
  list.forEach((ev) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'event-item';
    btn.dataset.id = ev.id;
    btn.style.setProperty('--c', ERAS[ev.era].color);
    btn.innerHTML = `
      <span class="ev-year">${ev.yearLabel}</span>
      <span>
        <span class="ev-title">${ev.title}${ev.region === 'korea' ? '<span class="ev-badge">한국사</span>' : ''}</span>
        <span class="ev-place">${ev.place}</span>
      </span>`;
    btn.addEventListener('click', () => selectEvent(ev.id));
    li.appendChild(btn);
    els.list.appendChild(li);
  });

  els.count.textContent = list.length
    ? `사건 ${list.length}개`
    : '조건에 맞는 사건이 없어요. 시대를 더 고르거나 검색어를 바꿔 보세요.';

  if (state.selected && !visible.has(state.selected)) closeDetail();
  else markActive(state.selected);
}

/* ---------- 사건 선택 ---------- */
function markActive(id) {
  markers.forEach((marker, mid) => {
    const el = marker.getElement();
    if (el) el.classList.toggle('is-active', mid === id);
    marker.setZIndexOffset(mid === id ? 1000 : 0);
  });
  els.list.querySelectorAll('.event-item').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.id === id);
  });
}

function selectEvent(id) {
  const ev = byId.get(id);
  if (!ev) return;
  state.selected = id;
  markActive(id);
  showDetail(ev);

  const item = els.list.querySelector(`[data-id="${id}"]`);
  if (item) item.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' });

  moveMap([ev.lat, ev.lng], Math.max(map.getZoom(), 5));
}

function showDetail(ev) {
  const era = ERAS[ev.era];
  els.detailEra.textContent = era.name;
  els.detailEra.style.setProperty('--c', era.color);
  els.detailRegion.textContent = REGION_NAME[ev.region];
  els.detailYear.textContent = ev.yearLabel;
  els.detailTitle.textContent = ev.title;
  els.detailPlace.textContent = `장소: ${ev.place}`;
  els.detailText.textContent = ev.summary;
  els.detailKeywords.innerHTML = ev.keywords.map((k) => `<li>${k}</li>`).join('');

  const list = getFiltered();
  const i = list.findIndex((e) => e.id === ev.id);
  els.prev.disabled = i <= 0;
  els.next.disabled = i === -1 || i >= list.length - 1;

  els.detail.hidden = false;
}

function closeDetail() {
  els.detail.hidden = true;
  state.selected = null;
  markActive(null);
}

function stepEvent(dir) {
  const list = getFiltered();
  const i = list.findIndex((e) => e.id === state.selected);
  const target = list[i + dir];
  if (target) selectEvent(target.id);
}

/* ---------- 퀴즈 ---------- */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function clearQuizMarks() {
  markers.forEach((marker) => {
    const el = marker.getElement();
    if (el) el.classList.remove('is-correct', 'is-wrong', 'is-active');
  });
}

function startQuiz() {
  const pool = getFiltered();
  quiz.score = 0;
  quiz.index = 0;
  clearQuizMarks();

  if (pool.length < 3) {
    quiz.questions = [];
    els.quizProgress.textContent = '';
    els.quizQuestion.textContent = '문제를 낼 사건이 부족해요';
    els.quizHint.textContent = '‘탐험하기’로 돌아가 시대나 범위를 더 넓게 골라 주세요. 사건이 3개 이상 필요해요.';
    els.quizFeedback.textContent = '';
    els.quizNext.hidden = true;
    return;
  }

  quiz.questions = shuffle([...pool]).slice(0, Math.min(10, pool.length));
  showQuestion();
}

function showQuestion() {
  const q = quiz.questions[quiz.index];
  quiz.answered = false;
  clearQuizMarks();

  els.quizProgress.textContent = `문제 ${quiz.index + 1} / ${quiz.questions.length}, 맞힌 개수 ${quiz.score}`;
  els.quizQuestion.textContent = q.title;
  els.quizHint.textContent = `${q.yearLabel}에 일어난 일이에요. 지도에서 이 사건이 일어난 곳을 눌러 보세요.`;
  els.quizFeedback.textContent = '';
  els.quizFeedback.className = 'quiz-feedback';
  els.quizNext.hidden = true;

  moveMap(START_VIEW.center, START_VIEW.zoom);
}

function answerQuiz(id) {
  if (quiz.answered || !quiz.questions.length) return;
  quiz.answered = true;

  const q = quiz.questions[quiz.index];
  const correct = id === q.id;
  if (correct) quiz.score++;

  const answerEl = markers.get(q.id).getElement();
  if (answerEl) answerEl.classList.add('is-correct');
  if (!correct) {
    const wrongEl = markers.get(id).getElement();
    if (wrongEl) wrongEl.classList.add('is-wrong');
  }

  const picked = byId.get(id);
  els.quizFeedback.className = `quiz-feedback ${correct ? 'ok' : 'bad'}`;
  els.quizFeedback.textContent = correct
    ? `정답이에요! ${q.place}에서 일어났어요.`
    : `아쉬워요. 고른 곳은 ‘${picked.title}’이 일어난 곳이에요. 정답은 ${q.place}이고, 지도에 초록색으로 표시했어요.`;

  els.quizProgress.textContent = `문제 ${quiz.index + 1} / ${quiz.questions.length}, 맞힌 개수 ${quiz.score}`;
  els.quizNext.textContent = quiz.index === quiz.questions.length - 1 ? '결과 보기' : '다음 문제';
  els.quizNext.hidden = false;
  els.quizNext.focus();

  moveMap([q.lat, q.lng], 4);
}

function nextQuestion() {
  quiz.index++;
  if (quiz.index < quiz.questions.length) {
    showQuestion();
    return;
  }
  const total = quiz.questions.length;
  const ratio = quiz.score / total;
  clearQuizMarks();
  els.quizProgress.textContent = '퀴즈 끝';
  els.quizQuestion.textContent = `${total}문제 중 ${quiz.score}문제를 맞혔어요`;
  els.quizHint.textContent =
    ratio === 1 ? '모두 맞혔어요! 다른 시대로도 도전해 보세요.'
    : ratio >= 0.7 ? '잘했어요. 틀린 사건은 탐험하기에서 다시 확인해 보세요.'
    : '탐험하기에서 사건의 장소를 한 번 더 살펴본 뒤 다시 도전해 보세요.';
  els.quizFeedback.textContent = '';
  els.quizNext.hidden = true;
  moveMap(START_VIEW.center, START_VIEW.zoom);
}

/* ---------- 모드 전환 ---------- */
function setMode(mode) {
  const isQuiz = mode === 'quiz';
  quiz.active = isQuiz;
  document.body.classList.toggle('quiz-mode', isQuiz);

  els.modeExplore.classList.toggle('is-active', !isQuiz);
  els.modeQuiz.classList.toggle('is-active', isQuiz);
  els.modeExplore.setAttribute('aria-pressed', String(!isQuiz));
  els.modeQuiz.setAttribute('aria-pressed', String(isQuiz));

  els.explorePanel.hidden = isQuiz;
  els.quizPanel.hidden = !isQuiz;

  closeDetail();
  clearQuizMarks();

  if (isQuiz) startQuiz();
  else moveMap(START_VIEW.center, START_VIEW.zoom);
}

/* ---------- 이벤트 연결 ---------- */
els.search.addEventListener('input', (e) => {
  state.query = e.target.value;
  render();
});

els.regionFilter.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-region]');
  if (!btn) return;
  state.region = btn.dataset.region;
  els.regionFilter.querySelectorAll('button').forEach((b) => {
    b.classList.toggle('is-active', b === btn);
  });
  render();
});

$('detailClose').addEventListener('click', closeDetail);
els.prev.addEventListener('click', () => stepEvent(-1));
els.next.addEventListener('click', () => stepEvent(1));
els.modeExplore.addEventListener('click', () => setMode('explore'));
els.modeQuiz.addEventListener('click', () => setMode('quiz'));
els.quizNext.addEventListener('click', nextQuestion);
els.quizRestart.addEventListener('click', startQuiz);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !els.detail.hidden) closeDetail();
});

/* ---------- 시작 ---------- */
buildEraFilters();
buildLegend();
render();
