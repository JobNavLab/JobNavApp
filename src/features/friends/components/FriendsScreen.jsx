import './FriendsScreen.css';
import emptyIcon from '../../../assets/images/common/empty.png';

function FriendsScreen() {
  return (
    <div className="friends-screen">
      <div className="friends-content">
        <img src={emptyIcon} alt="Empty" className="empty-icon" />
        <p className="empty-message">친구 기능은 추후 오픈 예정이에요</p>
      </div>
    </div>
  );
}

export default FriendsScreen;
