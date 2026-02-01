import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJourney, getQuestsByJourney } from '../services/journeyService';
import './JourneyDetailScreen.css';

import chapter1Active from '../../../assets/images/journey/chapter1_active.png';
import chapter2Active from '../../../assets/images/journey/chapter2_active.png';
import chapter3Active from '../../../assets/images/journey/chapter3_active.png';
import chapter4Active from '../../../assets/images/journey/chapter4_active.png';
import chapter5Active from '../../../assets/images/journey/chapter5_active.png';

const JOURNEY_ICONS = {
  1: chapter1Active,
  2: chapter2Active,
  3: chapter3Active,
  4: chapter4Active,
  5: chapter5Active,
};

const JOURNEY_NAMES = {
  1: '튜토리얼',
  2: '태초마을',
  3: '서류마을',
  4: '면접 마을',
  5: '최종 선택',
};

function JourneyDetailScreen() {
  const { journeyId } = useParams();
  const navigate = useNavigate();
  const [journey, setJourney] = useState(null);
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const id = Number(journeyId) || journeyId;
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const [journeyData, questsData] = await Promise.all([
          getJourney(id),
          getQuestsByJourney(Number(id)),
        ]);
        setJourney(journeyData);
        setQuests(questsData || []);
      } catch (err) {
        console.error('여정 상세 조회 실패:', err);
        setError('데이터를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [journeyId]);

  const handleClose = () => {
    navigate('/journey');
  };

  const handleQuestDescription = () => {
    if (journey?.link) {
      window.open(journey.link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleQuestShortcut = () => {
    navigate('/quest');
  };

  if (loading) {
    return (
      <div className="journey-detail-screen">
        <div className="journey-detail-loading">로딩 중...</div>
      </div>
    );
  }

  if (error || !journey) {
    return (
      <div className="journey-detail-screen">
        <button type="button" className="journey-detail-close" onClick={handleClose} aria-label="닫기">
          ×
        </button>
        <div className="journey-detail-error">{error || '여정 정보를 찾을 수 없습니다.'}</div>
      </div>
    );
  }

  const journeyNum = Number(journey.journey ?? journeyId);
  const iconSrc = JOURNEY_ICONS[journeyNum] || JOURNEY_ICONS[1];
  const journeyName = JOURNEY_NAMES[journeyNum] ?? `여정 ${journeyNum}`;
  const description = journey.description?.replace(/\\n/g, '\n') ?? '';

  return (
    <div className="journey-detail-screen">
      <button type="button" className="journey-detail-close" onClick={handleClose} aria-label="닫기">
        ×
      </button>

      <section className="journey-detail-header">
        <div className="journey-detail-icon-wrap">
          <img src={iconSrc} alt={`Journey ${journeyNum}`} className="journey-detail-icon" />
          <span className="journey-detail-star">{journeyNum}</span>
        </div>
        <div className="journey-detail-info">
          <p className="journey-detail-description">{description}</p>
          <h1 className="journey-detail-name">{journeyName}</h1>
        </div>
      </section>

      <section className="journey-detail-quests">
        <ul className="journey-detail-quest-list">
          {quests.map((q) => (
            <li key={q.id} className="journey-detail-quest-item">
              <span className="quest-badge">{journeyNum}-{q.quest}</span>
              <span className="quest-title">{q.title}</span>
            </li>
          ))}
          {quests.length === 0 && (
            <li className="journey-detail-quest-empty">등록된 퀘스트가 없습니다.</li>
          )}
        </ul>
      </section>

      <section className="journey-detail-actions">
        <button type="button" className="journey-detail-btn primary" onClick={handleQuestDescription}>
          퀘스트 설명보기
        </button>
        <button type="button" className="journey-detail-btn secondary" onClick={handleQuestShortcut}>
          퀘스트 바로가기
        </button>
      </section>
    </div>
  );
}

export default JourneyDetailScreen;
