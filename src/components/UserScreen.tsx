import { useLiff } from '../contexts/LiffContext';

export function UserScreen() {
  const { profile, isLoggedIn, liff } = useLiff();

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">ユーザー情報</h2>
          <p className="text-gray-600">ログインしていません</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">プロフィール</h2>
        
        {profile ? (
          <div className="space-y-4">
            {profile.pictureUrl && (
              <div className="flex justify-center">
                <img 
                  src={profile.pictureUrl} 
                  alt="プロフィール画像"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-500">表示名</span>
                <p className="text-gray-800">{profile.displayName}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">ユーザーID</span>
                <p className="text-gray-800 text-sm font-mono">{profile.userId}</p>
              </div>
              
              {profile.statusMessage && (
                <div>
                  <span className="text-sm font-medium text-gray-500">ステータスメッセージ</span>
                  <p className="text-gray-800">{profile.statusMessage}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-600">プロフィール情報を取得中...</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">LIFF情報</h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-gray-500">環境:</span>
            <span className="ml-2">{import.meta.env.DEV ? '開発' : '本番'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-500">LIFF ID:</span>
            <span className="ml-2 font-mono">{import.meta.env.VITE_LIFF_ID}</span>
          </div>
          <div>
            <span className="font-medium text-gray-500">モック使用:</span>
            <span className="ml-2">{import.meta.env.DEV ? 'はい' : 'いいえ'}</span>
          </div>
          {liff && (
            <div>
              <span className="font-medium text-gray-500">OS:</span>
              <span className="ml-2">{liff.getOS()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}