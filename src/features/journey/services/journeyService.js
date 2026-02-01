// 여정 관련 API 호출
// Firestore journeys, quest 컬렉션 조회

import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';

/**
 * Journey Document 조회
 * @param {string|number} journeyId - Journey ID (Document ID)
 * @returns {Promise<Object|null>} Journey 데이터 또는 null
 */
export async function getJourney(journeyId) {
  try {
    const journeyRef = doc(db, 'journeys', String(journeyId));
    const journeySnap = await getDoc(journeyRef);

    if (journeySnap.exists()) {
      return {
        id: journeySnap.id,
        ...journeySnap.data(),
      };
    }
    return null;
  } catch (error) {
    console.error('Journey 조회 실패:', error);
    throw error;
  }
}

/**
 * 특정 journey에 해당하는 Quest 목록 조회
 * @param {number} journeyId - Journey 번호
 * @returns {Promise<Array>} Quest 목록 (quest 순으로 정렬)
 */
export async function getQuestsByJourney(journeyId) {
  try {
    const questsRef = collection(db, 'quest');
    const q = query(questsRef, where('journey', '==', journeyId));
    const snapshot = await getDocs(q);

    const quests = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    return quests.sort((a, b) => (a.quest ?? 0) - (b.quest ?? 0));
  } catch (error) {
    console.error('Quest 목록 조회 실패:', error);
    throw error;
  }
}
