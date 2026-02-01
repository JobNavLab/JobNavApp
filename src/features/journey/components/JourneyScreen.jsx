import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { getUser } from '../../user/services/userService';
import './JourneyScreen.css';

import background from '../../../assets/images/common/background.png';
import chapter1Active from '../../../assets/images/journey/chapter1_active.png';
import chapter1Completed from '../../../assets/images/journey/chapter1_completed.png';
import chapter1Locked from '../../../assets/images/journey/chapter1_locked.png';
import chapter2Active from '../../../assets/images/journey/chapter2_active.png';
import chapter2Completed from '../../../assets/images/journey/chapter2_completed.png';
import chapter2Locked from '../../../assets/images/journey/chapter2_locked.png';
import chapter3Active from '../../../assets/images/journey/chapter3_active.png';
import chapter3Completed from '../../../assets/images/journey/chapter3_completed.png';
import chapter3Locked from '../../../assets/images/journey/chapter3_locked.png';
import chapter4Active from '../../../assets/images/journey/chapter4_active.png';
import chapter4Completed from '../../../assets/images/journey/chapter4_completed.png';
import chapter4Locked from '../../../assets/images/journey/chapter4_locked.png';
import chapter5Active from '../../../assets/images/journey/chapter5_active.png';
import chapter5Completed from '../../../assets/images/journey/chapter5_completed.png';
import chapter5Locked from '../../../assets/images/journey/chapter5_locked.png';

const CHAPTER_IMAGES = {
  1: { active: chapter1Active, completed: chapter1Completed, locked: chapter1Locked },
  2: { active: chapter2Active, completed: chapter2Completed, locked: chapter2Locked },
  3: { active: chapter3Active, completed: chapter3Completed, locked: chapter3Locked },
  4: { active: chapter4Active, completed: chapter4Completed, locked: chapter4Locked },
  5: { active: chapter5Active, completed: chapter5Completed, locked: chapter5Locked },
};

function getChapterState(currentChapter, chapterNumber) {
  if (currentChapter === 0) return 'locked';
  if (currentChapter > chapterNumber) return 'completed';
  if (currentChapter === chapterNumber) return 'active';
  return 'locked';
}

function JourneyScreen() {
  const { user: authUser } = useAuth();
  const navigate = useNavigate();
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

  if (loading) {
    return (
      <div className="journey-screen">
        <div className="journey-loading">로딩 중...</div>
      </div>
    );
  }

  const currentJourney = userData?.currentQuest?.journey ?? 0;

  return (
    <div className="journey-screen">
      {/* Layer 1: Background */}
      <div
        className="journey-layer journey-background"
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* Chapters 1~5 positioned along the path */}
      <div className="journey-chapters">
        {[1, 2, 3, 4, 5].map((chapterNumber) => {
          const state = getChapterState(currentJourney, chapterNumber);
          const imgSrc = CHAPTER_IMAGES[chapterNumber][state];
          return (
            <button
              key={chapterNumber}
              type="button"
              className={`journey-chapter journey-chapter-${chapterNumber} ${state}`}
              onClick={() => navigate(`/journey/${chapterNumber}`)}
            >
              <img src={imgSrc} alt={`Chapter ${chapterNumber}`} className="chapter-icon" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default JourneyScreen;
