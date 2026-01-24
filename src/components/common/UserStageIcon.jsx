import './UserStageIcon.css';
import stageZero from '../../assets/images/user_stage/stage_zero.png';
import stageOne from '../../assets/images/user_stage/stage_one.png';
import stageTwo from '../../assets/images/user_stage/stage_two.png';
import stageThree from '../../assets/images/user_stage/stage_three.png';
import stageFour from '../../assets/images/user_stage/stage_four.png';
import stageBackground from '../../assets/images/user_stage/stage_background.png';

const stageImages = {
  0: stageZero,
  1: stageOne,
  2: stageTwo,
  3: stageThree,
  4: stageFour,
};

function UserStageIcon({ userStage }) {
  // userStage는 0-4 사이의 값
  const stage = Math.max(0, Math.min(4, userStage || 0));
  const stageImage = stageImages[stage];

  if (!stageImage) {
    return null;
  }

  return (
    <div className="user-stage-icon">
      <div className="stage-background">
        <img src={stageBackground} alt="Stage background" className="background-image" />
      </div>
      <img src={stageImage} alt={`Stage ${stage}`} className="stage-image" />
    </div>
  );
}

export default UserStageIcon;
