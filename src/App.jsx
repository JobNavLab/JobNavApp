import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginScreen from './features/auth/components/LoginScreen';
import HomeScreen from './features/home/components/HomeScreen';
import FriendsScreen from './features/friends/components/FriendsScreen';
import QuestScreen from './features/quest/components/QuestScreen';
import JourneyScreen from './features/journey/components/JourneyScreen';
import JourneyDetailScreen from './features/journey/components/JourneyDetailScreen';
import SettingsScreen from './features/settings/components/SettingsScreen';
import BottomNavigation from './components/layout/BottomNavigation';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div className="main-content-wrap">{children}</div>
      <BottomNavigation />
    </>
  );
}

function ProtectedRouteWithoutNav({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/friends"
        element={
          <ProtectedRoute>
            <FriendsScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quest"
        element={
          <ProtectedRoute>
            <QuestScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/journey"
        element={
          <ProtectedRoute>
            <JourneyScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/journey/:journeyId"
        element={
          <ProtectedRouteWithoutNav>
            <JourneyDetailScreen />
          </ProtectedRouteWithoutNav>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsScreen />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
