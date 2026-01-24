// 공통 타입 정의 (TypeScript를 사용한다면 .ts로 변경)
// 예시: 사용자, 여정, 체크리스트 등의 타입 정의

/**
 * Firestore User Document 타입
 * @typedef {Object} UserDocument
 * @property {string} uid - Firebase Auth의 uid (document ID로 사용)
 * @property {string} email - 이메일 주소
 * @property {string|null} displayName - 표시 이름
 * @property {number} userStage - 사용자 스테이지 (최초 가입 시 0)
 * @property {Object<string, number>} currentQuest - 현재 퀘스트 정보 (Map 타입, 최초 가입 시 { chapter: 1, step: 1 })
 * @property {Timestamp} createdAt - 생성 시간
 * @property {Timestamp} updatedAt - 최종 수정 시간
 */
