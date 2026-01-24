import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNavigation.css';
import icHome from '../../assets/images/common/ic_home.svg';
import icFriends from '../../assets/images/common/ic_friends.svg';
import icQuest from '../../assets/images/common/ic_quest.svg';
import icMap from '../../assets/images/common/ic_map.svg';
import icSetting from '../../assets/images/common/ic_setting.svg';

const navItems = [
  { path: '/home', label: '나의 홈', icon: icHome },
  { path: '/friends', label: '놀러가기', icon: icFriends },
  { path: '/quest', label: '퀘스트', icon: icQuest },
  { path: '/journey', label: '여정', icon: icMap },
  { path: '/settings', label: '설정', icon: icSetting },
];

function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="bottom-navigation">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => handleNavClick(item.path)}
          >
            <img 
              src={item.icon} 
              alt={item.label} 
              className="nav-icon"
            />
            <span className="nav-label">{item.label}</span>
            {isActive && <div className="nav-indicator" />}
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNavigation;
