import './LoginScreen.css';
import logo from '../../../assets/images/common/logo.png';
import background from '../../../assets/images/common/background.png';

function LoginScreen() {
  const handleGoogleLogin = () => {
    // TODO: 구글 로그인 구현
    console.log('구글 로그인 클릭');
  };

  return (
    <div className="login-screen">
      <div className="login-background">
        <img src={background} alt="배경" className="background-image" />
      </div>
      
      <div className="login-content">
        <div className="logo-container">
          <img src={logo} alt="취준내비 로고" className="app-logo" />
        </div>

        <div className="login-buttons">
          <button 
            className="login-button google-button"
            onClick={handleGoogleLogin}
          >
            <div className="button-content">
              <svg 
                className="google-icon" 
                width="20" 
                height="20" 
                viewBox="0 0 20 20"
                fill="none"
              >
                <path 
                  d="M19.6 10.23c0-.82-.07-1.6-.2-2.35H10v4.45h5.4c-.23 1.27-.9 2.35-1.92 3.07v2.4h3.1c1.82-1.67 2.87-4.13 2.87-7.17z" 
                  fill="#4285F4"
                />
                <path 
                  d="M10 20c2.6 0 4.78-.87 6.38-2.35l-3.1-2.4c-.87.58-1.98.92-3.28.92-2.52 0-4.65-1.7-5.42-4H1.3v2.48C2.88 17.5 6.15 20 10 20z" 
                  fill="#34A853"
                />
                <path 
                  d="M4.58 12.17c-.18-.58-.28-1.2-.28-1.83s.1-1.25.28-1.83V6.03H1.3C.7 7.28.33 8.6.33 10s.37 2.72.97 3.97l3.28-2.8z" 
                  fill="#FBBC05"
                />
                <path 
                  d="M10 3.75c1.42 0 2.7.49 3.7 1.45l2.78-2.78C14.78.9 12.6 0 10 0 6.15 0 2.88 2.5 1.3 6.03l3.28 2.48C5.35 5.45 7.48 3.75 10 3.75z" 
                  fill="#EA4335"
                />
              </svg>
              <span className="button-text">구글로 로그인</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
