// 인증 관련 API 호출
// Firebase Auth를 사용한 로그인/로그아웃 처리

import { 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult 
} from 'firebase/auth';
import { auth, googleProvider } from '../../../config/firebase';

/**
 * Google 로그인 (팝업 방식)
 * @returns {Promise<UserCredential>} 사용자 정보
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google 로그인 실패:', error);
    throw error;
  }
}

/**
 * Google 로그인 (리다이렉트 방식)
 * 모바일에서 더 안정적일 수 있음
 */
export async function signInWithGoogleRedirect() {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error('Google 로그인 리다이렉트 실패:', error);
    throw error;
  }
}

/**
 * 리다이렉트 로그인 결과 확인
 * signInWithGoogleRedirect 사용 후 호출
 */
export async function getGoogleRedirectResult() {
  try {
    const result = await getRedirectResult(auth);
    return result?.user || null;
  } catch (error) {
    console.error('리다이렉트 결과 확인 실패:', error);
    throw error;
  }
}
