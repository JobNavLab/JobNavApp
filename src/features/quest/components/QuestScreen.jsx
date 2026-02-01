import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { getUser } from '../../user/services/userService';
import { getQuestsByJourney } from '../../journey/services/journeyService';
import toggleOpen from '../../../assets/images/quest/toggle_open.svg';
import toggleClose from '../../../assets/images/quest/toggle_close.svg';
import './QuestScreen.css';

function sortQuestsByIdAsc(quests) {
  return [...quests].sort((a, b) => {
    const idA = Number(a.id) || 0;
    const idB = Number(b.id) || 0;
    return idA - idB;
  });
}

function QuestScreen() {
  const { user: authUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (authUser?.uid) {
        try {
          const data = await getUser(authUser.uid);
          setUserData(data);
          const journey = data?.currentQuest?.journey ?? 1;
          const list = await getQuestsByJourney(journey);
          setQuests(sortQuestsByIdAsc(list));
        } catch (error) {
          console.error('퀘스트 목록 조회 실패:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [authUser]);

  const handleToggle = (itemKey) => {
    setExpandedIds((prev) =>
      prev.includes(itemKey) ? prev.filter((k) => k !== itemKey) : [...prev, itemKey]
    );
  };

  const handleComplete = () => {
    // 추후 구현 (완료 버튼 상호작용)
  };

  if (loading) {
    return (
      <div className="quest-screen">
        <div className="quest-loading">로딩 중...</div>
      </div>
    );
  }

  const journeyNum = userData?.currentQuest?.journey ?? 1;

  return (
    <div className="quest-screen">
      <div className="quest-list">
        {quests.length === 0 ? (
          <p className="quest-empty">표시할 퀘스트가 없습니다.</p>
        ) : (
          quests.map((q) => {
            const itemKey = `${q.journey}-${q.quest}`;
            const isExpanded = expandedIds.includes(itemKey);
            return (
              <div
                key={itemKey}
                className={`quest-item ${isExpanded ? 'expanded' : ''}`}
              >
                <div
                  className="quest-item-header"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleToggle(itemKey)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleToggle(itemKey);
                    }
                  }}
                >
                  <span className="quest-toggle" aria-hidden>
                    <img
                      src={isExpanded ? toggleOpen : toggleClose}
                      alt=""
                      width={24}
                      height={24}
                    />
                  </span>
                  <span className="quest-badge">
                    {journeyNum}-{q.quest}
                  </span>
                  <span className="quest-title">{q.title}</span>
                  <button
                    type="button"
                    className="quest-complete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleComplete();
                    }}
                  >
                    완료
                  </button>
                </div>
                {isExpanded && (
                  <div className="quest-item-description">
                    {q.description || '설명이 없습니다.'}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default QuestScreen;
