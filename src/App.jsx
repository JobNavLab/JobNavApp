import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import LoginScreen from './features/auth/components/LoginScreen';

function App() {
  return (
    <AuthProvider>
      <LoginScreen />
    </AuthProvider>
  );
}

export default App;
