import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import './SettingsScreen.css';

function SettingsScreen() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃에 실패했습니다.');
    }
  };

  return (
    <div className="settings-screen">
      <div className="settings-content">
        <h1>설정</h1>
        <button className="logout-button" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default SettingsScreen;
