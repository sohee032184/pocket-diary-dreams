export type Axis = 'EI' | 'SN' | 'TF' | 'JP';
export type Letter = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface Question {
  id: number;
  axis: Axis;
  text: string;
  options: { label: string; value: Letter }[];
}

// 고등학생 일상 맞춤 12문항 (각 축 3문항)
export const QUESTIONS: Question[] = [
  // E / I
  { id: 1, axis: 'EI', text: '쉬는 시간 종이 울리면 나는?', options: [
    { label: '친구들한테 우르르 몰려가서 수다 떤다', value: 'E' },
    { label: '자리에서 조용히 핸드폰 보거나 쉰다', value: 'I' },
  ]},
  { id: 2, axis: 'EI', text: '주말 약속이 갑자기 취소됐을 때 나는?', options: [
    { label: '아쉬워서 다른 친구한테 바로 연락한다', value: 'E' },
    { label: '오히려 개꿀! 집에서 푹 쉰다', value: 'I' },
  ]},
  { id: 3, axis: 'EI', text: '조별 발표를 할 때 나는?', options: [
    { label: '내가 직접 발표하는 게 편하다', value: 'E' },
    { label: '자료 만들기를 맡는 게 좋다', value: 'I' },
  ]},
  // S / N
  { id: 4, axis: 'SN', text: '수업 시간 멍 때릴 때 나는 보통?', options: [
    { label: '오늘 급식 뭐 나오지? 같은 현실적인 생각', value: 'S' },
    { label: '만약 내가 마법사라면…? 같은 상상', value: 'N' },
  ]},
  { id: 5, axis: 'SN', text: '여행을 간다면 나는?', options: [
    { label: '시간표대로 유명한 곳을 알차게 돈다', value: 'S' },
    { label: '발길 닿는 대로 새로운 곳을 찾아간다', value: 'N' },
  ]},
  { id: 6, axis: 'SN', text: '시험 공부할 때 나는?', options: [
    { label: '교과서랑 필기 그대로 외운다', value: 'S' },
    { label: '내 방식대로 정리하고 흐름을 이해한다', value: 'N' },
  ]},
  // T / F
  { id: 7, axis: 'TF', text: '친구가 "나 오늘 시험 망쳤어ㅠㅠ" 라고 하면?', options: [
    { label: '"어디서 틀렸어? 다음엔 이렇게 해봐"', value: 'T' },
    { label: '"헐 진짜? 속상하겠다ㅠㅠ 괜찮아??"', value: 'F' },
  ]},
  { id: 8, axis: 'TF', text: '조별과제에서 한 명이 일을 안 할 때?', options: [
    { label: '역할 분담을 다시 짜자고 정확히 말한다', value: 'T' },
    { label: '혹시 무슨 일 있나 먼저 물어본다', value: 'F' },
  ]},
  { id: 9, axis: 'TF', text: '영화를 볼 때 나는?', options: [
    { label: '스토리 구성이랑 개연성을 따진다', value: 'T' },
    { label: '주인공한테 몰입해서 운다/웃는다', value: 'F' },
  ]},
  // J / P
  { id: 10, axis: 'JP', text: '방학 시작! 나는?', options: [
    { label: '계획표부터 짠다. 하루 단위로 빡세게', value: 'J' },
    { label: '계획? 그날 기분에 맞춰서 하면 됨', value: 'P' },
  ]},
  { id: 11, axis: 'JP', text: '내 책상/방은?', options: [
    { label: '늘 정리되어 있어야 마음이 편하다', value: 'J' },
    { label: '어수선해도 내가 어디 있는지 알면 OK', value: 'P' },
  ]},
  { id: 12, axis: 'JP', text: '약속 시간에 나는?', options: [
    { label: '항상 10분 전에 도착해 있다', value: 'J' },
    { label: '딱 맞춰서 혹은 살짝 늦게 도착한다', value: 'P' },
  ]},
];

export interface TypeInfo {
  type: string;
  nickname: string;
  emoji: string;
  desc: string;
  bestMatch: string;
  worstMatch: string;
}

export const TYPES: Record<string, TypeInfo> = {
  INTJ: { type: 'INTJ', nickname: '전교 1등 전략가', emoji: '🧠', desc: '머릿속에 항상 계획이 있고, 목표가 생기면 끝까지 파고드는 타입. 혼자 있는 시간이 곧 충전 시간!', bestMatch: 'ENFP', worstMatch: 'ESFP' },
  INTP: { type: 'INTP', nickname: '엉뚱한 천재', emoji: '🔬', desc: '"근데 그건 왜 그래?"가 입버릇. 호기심 폭발하는 사색가. 관심사 깊이 파면 따라올 사람 없음.', bestMatch: 'ENTJ', worstMatch: 'ESFJ' },
  ENTJ: { type: 'ENTJ', nickname: '학생회장 리더', emoji: '👑', desc: '뭐든 진두지휘하는 천생 리더. 비효율을 못 참고 추진력 만렙!', bestMatch: 'INFP', worstMatch: 'ISFP' },
  ENTP: { type: 'ENTP', nickname: '교실의 인싸 토론왕', emoji: '💡', desc: '말발 좋고 아이디어 뱅크. 토론 시간 진정한 주인공.', bestMatch: 'INFJ', worstMatch: 'ISFJ' },
  INFJ: { type: 'INFJ', nickname: '조용한 상담사', emoji: '🌙', desc: '친구들 고민 다 들어주는 사람. 깊이 있고 따뜻하지만 혼자만의 시간이 꼭 필요해.', bestMatch: 'ENTP', worstMatch: 'ESTP' },
  INFP: { type: 'INFP', nickname: '감성 폭발 작가', emoji: '🌸', desc: '상상력 부자에 마음이 여린 로맨티스트. 일기/플레이리스트 부심 있음.', bestMatch: 'ENTJ', worstMatch: 'ESTJ' },
  ENFJ: { type: 'ENFJ', nickname: '반의 분위기 메이커', emoji: '🌟', desc: '친구들 다 챙기는 따뜻한 리더. 누구든 같이 끌고 가는 정의로운 타입.', bestMatch: 'INFP', worstMatch: 'ISTP' },
  ENFP: { type: 'ENFP', nickname: '텐션 200% 핵인싸', emoji: '🎉', desc: '하고 싶은 것도 많고 친구도 많은 텐션장인. 매일이 새롭고 즐거움!', bestMatch: 'INTJ', worstMatch: 'ISTJ' },
  ISTJ: { type: 'ISTJ', nickname: '책임감 만렙 모범생', emoji: '📚', desc: '맡은 일은 끝까지! 약속/규칙/시간 다 잘 지키는 듬직한 친구.', bestMatch: 'ENFP', worstMatch: 'ENFP' },
  ISFJ: { type: 'ISFJ', nickname: '다정한 우리반 엄마', emoji: '🍯', desc: '조용히 친구들 챙기는 따뜻함. 의리 있고 한 번 친해지면 평생 간다.', bestMatch: 'ESTP', worstMatch: 'ENTP' },
  ESTJ: { type: 'ESTJ', nickname: '규칙왕 반장', emoji: '📋', desc: '체계적이고 책임감 짱. 흐트러진 거 못 보는 리얼 반장스타일.', bestMatch: 'ISFP', worstMatch: 'INFP' },
  ESFJ: { type: 'ESFJ', nickname: '인기 만점 친화왕', emoji: '💖', desc: '친구들이랑 어울리는 게 인생 낙. 분위기 띄우는 데 천재.', bestMatch: 'ISFP', worstMatch: 'INTP' },
  ISTP: { type: 'ISTP', nickname: '쿨내 진동 만능러', emoji: '🛠️', desc: '말은 적은데 손은 빠름. 호기심 가는 건 다 직접 해보는 타입.', bestMatch: 'ESFJ', worstMatch: 'ENFJ' },
  ISFP: { type: 'ISFP', nickname: '감성 가득 예술가', emoji: '🎨', desc: '내 취향이 확고한 잔잔한 감성러. 음악/그림/사진 같은 거 좋아함.', bestMatch: 'ENFJ', worstMatch: 'ENTJ' },
  ESTP: { type: 'ESTP', nickname: '도전왕 행동대장', emoji: '⚡', desc: '생각보다 몸이 먼저! 에너지 넘치고 스릴 좋아하는 모험가.', bestMatch: 'ISFJ', worstMatch: 'INFJ' },
  ESFP: { type: 'ESFP', nickname: '교실 비타민', emoji: '🍒', desc: '있는 것만으로 분위기 살리는 파티피플. 인생은 즐기는 거니까!', bestMatch: 'ISTJ', worstMatch: 'INTJ' },
};

export function calculateType(answers: Record<number, Letter>): string {
  const counts: Record<Letter, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  Object.values(answers).forEach(v => { counts[v]++; });
  return [
    counts.E >= counts.I ? 'E' : 'I',
    counts.S >= counts.N ? 'S' : 'N',
    counts.T >= counts.F ? 'T' : 'F',
    counts.J >= counts.P ? 'J' : 'P',
  ].join('');
}
