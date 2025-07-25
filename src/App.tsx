import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LiffProvider, useLiff } from './contexts/LiffContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MainScreen } from './components/MainScreen';
import { UserScreen } from './components/UserScreen';

function AppContent() {
  const { isReady, error } = useLiff();

  console.log('App状態:', { isReady, error });

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-red-500 text-white p-4">
        <h2 className="text-xl font-bold mb-4">エラーが発生しました</h2>
        <p className="text-center">{error}</p>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div className="w-10 h-10 border-3 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
        <p>Loading LIFF...</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16">
      <Header />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/profile" element={<UserScreen />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LiffProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AppContent />
      </Router>
    </LiffProvider>
  );
}

export default App;