import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import liff from '@line/liff';
import liffMock, { setupLiffMock } from '../liff-mock';

interface Profile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

interface LiffContextValue {
  liffObject: any;
  liffError: string;
  profile: Profile | null;
  isLoggedIn: boolean;
  isInClient: boolean;
  isMockMode: boolean;
  isReady: boolean;
  login: () => void;
  logout: () => void;
  sendMessage: () => void;
  closeWindow: () => void;
}

const LiffContext = createContext<LiffContextValue | undefined>(undefined);

interface LiffProviderProps {
  children: ReactNode;
}

export function LiffProvider({ children }: LiffProviderProps) {
  const [liffObject, setLiffObject] = useState<any>(null);
  const [liffError, setLiffError] = useState<string>('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInClient, setIsInClient] = useState(false);
  const [isMockMode, setIsMockMode] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        const liffId = import.meta.env.VITE_LIFF_ID || 'YOUR_LIFF_ID_HERE';
        
        // 開発環境またはLIFF IDが設定されていない場合はモックモードを使用
        const shouldUseMock = import.meta.env.DEV || liffId === 'YOUR_LIFF_ID_HERE';
        
        if (shouldUseMock) {
          console.log('🎭 Using LIFF Mock mode');
          setIsMockMode(true);
          setupLiffMock();
          await liffMock.init({ liffId });
          setLiffObject(liffMock);
          
          if (liffMock.isInClient()) {
            setIsInClient(true);
          }

          if (liffMock.isLoggedIn()) {
            setIsLoggedIn(true);
            const userProfile = await liffMock.getProfile();
            setProfile(userProfile);
          }
        } else {
          console.log('🚀 Using real LIFF SDK');
          await liff.init({ liffId });
          setLiffObject(liff);
          
          if (liff.isInClient()) {
            setIsInClient(true);
          }

          if (liff.isLoggedIn()) {
            setIsLoggedIn(true);
            const userProfile = await liff.getProfile();
            setProfile(userProfile);
          }
        }
        
        setIsReady(true);
      } catch (error) {
        console.error('LIFF initialization failed', error);
        setLiffError(error instanceof Error ? error.message : 'LIFF initialization failed');
        setIsReady(true);
      }
    };

    initializeLiff();
  }, []);

  const login = () => {
    if (liffObject) {
      liffObject.login();
    }
  };

  const logout = () => {
    if (liffObject) {
      liffObject.logout();
      setIsLoggedIn(false);
      setProfile(null);
    }
  };

  const sendMessage = () => {
    if (liffObject && liffObject.isInClient()) {
      liffObject.sendMessages([
        {
          type: 'text',
          text: 'LIFFミニアプリからメッセージを送信しました！'
        }
      ]);
    }
  };

  const closeWindow = () => {
    if (liffObject && liffObject.isInClient()) {
      liffObject.closeWindow();
    }
  };

  const value: LiffContextValue = {
    liffObject,
    liffError,
    profile,
    isLoggedIn,
    isInClient,
    isMockMode,
    isReady,
    login,
    logout,
    sendMessage,
    closeWindow,
  };

  return <LiffContext.Provider value={value}>{children}</LiffContext.Provider>;
}

export function useLiff() {
  const context = useContext(LiffContext);
  if (context === undefined) {
    throw new Error('useLiff must be used within a LiffProvider');
  }
  return context;
}