// LIFF Mock for development and testing

interface MockProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

interface MockLiff {
  init: (config: { liffId: string }) => Promise<void>;
  isLoggedIn: () => boolean;
  isInClient: () => boolean;
  login: () => void;
  logout: () => void;
  getProfile: () => Promise<MockProfile>;
  sendMessages: (messages: any[]) => Promise<void>;
  closeWindow: () => void;
  ready: Promise<void>;
}

class LiffMock implements MockLiff {
  private _isLoggedIn = false;
  private _isInClient = false;
  private _liffId = '';
  private _mockProfile: MockProfile = {
    userId: 'mock-user-123',
    displayName: 'テストユーザー',
    pictureUrl: '/user-icon.svg',
    statusMessage: 'これはモックプロフィールです'
  };

  public ready = Promise.resolve();

  async init(config: { liffId: string }): Promise<void> {
    console.log('🎭 LIFF Mock: Initializing with LIFF ID:', config.liffId);
    this._liffId = config.liffId;
    
    // デフォルトでログイン状態にする（開発用）
    this._isLoggedIn = true;
    
    // URLパラメータでクライアント環境をシミュレート
    const urlParams = new URLSearchParams(window.location.search);
    this._isInClient = urlParams.get('mock_client') === 'true';
    
    console.log('🎭 LIFF Mock: Initialized', {
      liffId: this._liffId,
      isLoggedIn: this._isLoggedIn,
      isInClient: this._isInClient
    });
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  isInClient(): boolean {
    return this._isInClient;
  }

  login(): void {
    console.log('🎭 LIFF Mock: Login triggered');
    this._isLoggedIn = true;
    // 実際のLIFFではページリロードが発生するが、モックでは状態を更新するだけ
    window.location.reload();
  }

  logout(): void {
    console.log('🎭 LIFF Mock: Logout triggered');
    this._isLoggedIn = false;
  }

  async getProfile(): Promise<MockProfile> {
    if (!this._isLoggedIn) {
      throw new Error('User is not logged in');
    }
    
    console.log('🎭 LIFF Mock: Getting profile', this._mockProfile);
    return this._mockProfile;
  }

  async sendMessages(messages: any[]): Promise<void> {
    if (!this._isInClient) {
      throw new Error('sendMessages can only be used in LINE client');
    }
    
    console.log('🎭 LIFF Mock: Sending messages', messages);
    alert(`メッセージを送信しました:\n${JSON.stringify(messages, null, 2)}`);
  }

  closeWindow(): void {
    if (!this._isInClient) {
      throw new Error('closeWindow can only be used in LINE client');
    }
    
    console.log('🎭 LIFF Mock: Closing window');
    alert('実際のLINE環境では、この操作でアプリが閉じられます');
  }

  // 開発用のユーティリティメソッド
  setMockProfile(profile: Partial<MockProfile>): void {
    this._mockProfile = { ...this._mockProfile, ...profile };
    console.log('🎭 LIFF Mock: Profile updated', this._mockProfile);
  }

  setMockClientMode(isInClient: boolean): void {
    this._isInClient = isInClient;
    console.log('🎭 LIFF Mock: Client mode changed to', isInClient);
  }

  setMockLoginState(isLoggedIn: boolean): void {
    this._isLoggedIn = isLoggedIn;
    console.log('🎭 LIFF Mock: Login state changed to', isLoggedIn);
  }
}

// グローバルなモックインスタンス
export const liffMock = new LiffMock();

// 開発環境用のヘルパー関数
export const setupLiffMock = () => {
  // @ts-ignore
  window.liffMock = liffMock;
  console.log('🎭 LIFF Mock: Available at window.liffMock');
  console.log('🎭 Available methods:', {
    'liffMock.setMockProfile({ displayName: "New Name" })': 'プロフィールを変更',
    'liffMock.setMockClientMode(true)': 'LINE内ブラウザモードに変更',
    'liffMock.setMockLoginState(false)': 'ログアウト状態に変更'
  });
};

export default liffMock;