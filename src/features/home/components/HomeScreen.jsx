import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { getUser } from '../../user/services/userService';
import UserStageIcon from '../../../components/common/UserStageIcon';
import './HomeScreen.css';

function HomeScreen() {
  const { user: authUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (authUser?.uid) {
        try {
          const data = await getUser(authUser.uid);
          setUserData(data);
        } catch (error) {
          console.error('유저 데이터 조회 실패:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authUser]);

  // 이메일에서 도메인 제외한 앞부분 추출
  const getEmailPrefix = (email) => {
    if (!email) return '';
    const atIndex = email.indexOf('@');
    return atIndex > 0 ? email.substring(0, atIndex) : '';
  };

  if (loading) {
    return (
      <div className="home-screen">
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  const displayName = userData?.displayName || '취준병아리';
  const emailPrefix = getEmailPrefix(authUser?.email || '');
  const userStage = userData?.userStage ?? 0;

  return (
    <div className="home-screen">
      <div className="home-content">
        {/* 중앙 User Stage 아이콘 */}
        <div className="stage-section">
          <UserStageIcon userStage={userStage} />
        </div>

        {/* 사용자 정보 */}
        <div className="user-info-section">
          <div className="user-name">{displayName}</div>
          {emailPrefix && (
            <div className="user-email">@{emailPrefix}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
