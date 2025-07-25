import { TestTube } from 'lucide-react';
import { useLiff } from '../contexts/LiffContext';

export function LoginScreen() {
  const { login, isMockMode } = useLiff();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8 px-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-4xl font-bold text-gray-800">
              LIFF Mini App
            </h1>
            {isMockMode && (
              <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs font-medium">
                <TestTube size={12} />
                MOCK
              </div>
            )}
          </div>
          <p className="text-gray-600">
            LINE Front-end Framework テンプレートアプリ
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="text-center">
            <div className="mb-6">
              <img
                src="/user-icon.svg"
                alt="User Icon"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">ログインが必要です</h2>
              <p className="text-gray-600">LINEアカウントでログインしてください</p>
            </div>
            <button
              onClick={login}
              className="px-8 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              LINEでログイン
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}