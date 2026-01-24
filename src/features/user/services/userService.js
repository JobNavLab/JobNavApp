// User collection 관리 서비스
// Firestore의 users collection에 대한 CRUD 작업

import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../../config/firebase';

/**
 * User document 생성 또는 업데이트
 * @param {string} uid - Firebase Auth의 user uid
 * @param {Object} userData - 저장할 유저 데이터
 * @returns {Promise<void>}
 */
export async function createOrUpdateUser(uid, userData, isNewUser = false) {
  try {
    const userRef = doc(db, 'users', uid);
    
    // 기존 document가 있는지 확인
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      // 기존 document 업데이트
      await updateDoc(userRef, {
        ...userData,
        updatedAt: serverTimestamp(),
      });
    } else {
      // 새 document 생성 (최초 회원가입)
      await setDoc(userRef, {
        uid,
        ...userData,
        userStage: 0,
        currentQuest: {
          chapter: 1,
          step: 1,
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('유저 document 생성/업데이트 실패:', error);
    throw error;
  }
}

/**
 * User document 조회
 * @param {string} uid - Firebase Auth의 user uid
 * @returns {Promise<Object|null>} 유저 데이터 또는 null
 */
export async function getUser(uid) {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return {
        id: userSnap.id,
        ...userSnap.data(),
      };
    }
    return null;
  } catch (error) {
    console.error('유저 document 조회 실패:', error);
    throw error;
  }
}

/**
 * Firebase Auth User 정보를 기반으로 User document 생성
 * @param {Object} firebaseUser - Firebase Auth의 user 객체
 * @returns {Promise<void>}
 */
export async function syncUserFromAuth(firebaseUser) {
  if (!firebaseUser.uid) {
    throw new Error('Firebase User의 uid가 없습니다');
  }

  if (!firebaseUser.email) {
    throw new Error('Firebase User의 email이 없습니다');
  }

  const userData = {
    email: firebaseUser.email,
    displayName: firebaseUser.displayName || null,
  };

  await createOrUpdateUser(firebaseUser.uid, userData);
}
