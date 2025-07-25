import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LiffProvider, useLiff } from './contexts/LiffContext';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginScreen } from './components/LoginScreen';
import { Footer } from './components/Footer';

function AppContent() {
  const { liffError, isReady, isLoggedIn } = useLiff();

  if (liffError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-4">エラーが発生しました</h2>
          <p className="text-gray-600 mb-4">{liffError}</p>
          <p className="text-sm text-gray-500">
            環境変数 VITE_LIFF_ID を設定してください
          </p>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">LIFF を初期化中...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LiffProvider>
      <Router>
        <AppContent />
      </Router>
    </LiffProvider>
  );
}

export default App;