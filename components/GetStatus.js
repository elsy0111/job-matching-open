import Login from '@/components/Login/Login';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';

export default function GetStatus() {
  const { userInfo, setUserInfo } = useUser();
  const [isClient, setIsClient] = useState(false);

  // プログラムが読み込まれた際に、isClientを初期化
  useEffect(() => {
    setIsClient(true);
  }, []);

  // userInfoが変更されたら、ローカルストレージに保存
  useEffect(() => {
    if (isClient) {
      if (userInfo) {
        setUserInfo(userInfo);
      } else {
        setUserInfo(null);
      }
    }
  }, [userInfo, isClient]);

  // まだマウントされていない場合はnullを返す
  if (!isClient) {
    return null;
  }

  // userInfoがnullの場合はログインコンポーネントを返す
  if (!userInfo) {
    console.log('Login component rendered');
    return <Login />;
  }

  // userInfoが存在する場合はnullを返す (ログイン済み)
  return null;
}