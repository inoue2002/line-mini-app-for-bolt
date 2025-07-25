import { LogOut, TestTube } from 'lucide-react';
import { useLiff } from '../contexts/LiffContext';

export function ProfilePage() {
  const { 
    profile, 
    isLoggedIn, 
    isInClient, 
    isMockMode, 
    logout, 
    closeWindow 
  } = useLiff();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8 px-4 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className="text-4xl font-bold text-gray-800">
                プロフィール
              </h1>
              {isMockMode && (
                <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs font-medium">
                  <TestTube size={12} />
                  MOCK
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="text-center">
              <img
                src="/user-icon.svg"
                alt="User Icon"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">ログインが必要です</h2>
              <p className="text-gray-600">LINEアカウントでログインしてください</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8 px-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-4xl font-bold text-gray-800">
              プロフィール
            </h1>
            {isMockMode && (
              <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs font-medium">
                <TestTube size={12} />
                MOCK
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {/* プロフィール情報 */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
            <img
              src={profile?.pictureUrl || '/user-icon.svg'}
              alt="プロフィール画像"
              className="w-16 h-16 rounded-full border-2 border-white shadow-md"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {profile?.displayName || 'ユーザー'}
              </h3>
              {profile?.statusMessage && (
                <p className="text-sm text-gray-600">{profile.statusMessage}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                実行環境: {isInClient ? 'LINE内ブラウザ' : '外部ブラウザ'}
              </p>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={logout}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
              >
                <LogOut size={18} />
                ログアウト
              </button>

              {isInClient && (
                <button
                  onClick={closeWindow}
                  className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                >
                  アプリを閉じる
                </button>
              )}
            </div>
          </div>

          {/* 開発者情報 */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">デバッグ情報</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>ユーザーID: {profile?.userId}</p>
              <p>LIFF環境: {isInClient ? 'LINE内' : '外部ブラウザ'}</p>
              <p>ログイン状態: ログイン済み</p>
              <p>実行モード: {isMockMode ? 'モック' : '本番'}</p>
            </div>
            {isMockMode && (
              <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-xs text-orange-700 font-medium mb-2">開発者向けコマンド:</p>
                <div className="text-xs text-orange-600 space-y-1 font-mono">
                  <p>• window.liffMock.setMockClientMode(true)</p>
                  <p>• window.liffMock.setMockProfile({'{'}displayName: "新しい名前"{'}'})</p>
                  <p>• window.liffMock.setMockLoginState(false)</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}