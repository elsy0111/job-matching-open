// components/Login.js

'use client';

// Google の OAuth 認証を行うためのコンポーネント
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import oauthSecret from '@/oauth_secret.json';

// Firebase Realtime Database からデータを取得するための関数
import { ref, get } from 'firebase/database';
import { useState } from 'react';
import { getFirebaseDatabase } from '@/firebaseinit';

// ユーザー登録用のコンポーネント (初回ログイン時のみ表示)
import AccountRegister from '@/components/Login/AccountRegister';

// Global な 変数 (userInfo)
import { useUser } from '@/context/UserContext';

// Google OAuth クライアントID (OAuth シークレットから取得)
const clientId = oauthSecret.web.client_id;

// 全体のログインコンポーネント
export default function Login() {
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [token, setToken] = useState(null);

  return (
    <div className="w-full h-full flex-col flex justify-center items-center">
      <h1 className="text-5xl text-center font-bold text-gray-700 mb-6">LOGIN</h1>
      <GoogleOAuthProvider clientId={clientId}>
        <LoginWithGoogle
          setIsFirstLogin={setIsFirstLogin}
          setToken={setToken}
        />
      </GoogleOAuthProvider>
      {(token && isFirstLogin) && <AccountRegister token={token}/>}
    </div>
  );
}

// Google OAuth ログインボタン
export function LoginWithGoogle({ setIsFirstLogin, setToken }) {
  const { setUserInfo } = useUser();

  // Google でログイン ボタンがクリックされたときの処理
  const login = useGoogleLogin({
    // Googleログイン成功時の処理
    onSuccess: async (credentialResponse) => {
      // ログインに成功したときにその情報を見るためのアクセストークンを取得
      const token = credentialResponse.access_token;
      setToken(token)

      // ユーザー情報を取得するためのリクエスト (token を使って)
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}`}
      });

      // ユーザー情報を取得
      const userInfo_Temp = await userInfoResponse.json();
      const userEmail = userInfo_Temp.email.replace(/\./g, '_');

      // 初回ログインかどうかを確認
      const isFirstLogin = await checkFirstLogin(userEmail); // 初回ログインを確認
      
      if (isFirstLogin) {
        setIsFirstLogin(true); // 初回ログインの場合は true をセット
      } else {
        const userInfo = await getUserInfo(userEmail);
        setUserInfo(userInfo); // ユーザー情報をグローバルな変数にセット
      }
    },

    // Googleログインエラー時の処理
    onError: (error) => {
      console.error('Googleログインエラー:', error); // エラーメッセージをコンソールに表示
    }
  });

  // ユーザーが初回ログインかどうか(既にgoogleでログインしていないか)チェックする関数
  const checkFirstLogin = async (userEmail) => {
    // Firebase Realtime Database からデータを取得するため
    const db = getFirebaseDatabase();
    const userRef = ref(db, `Users/${userEmail}`);
    const snapshot = await get(userRef);

    return !snapshot.exists(); // ユーザー情報が存在しない場合は true を返す
  }
  
  // ユーザー情報を取得する関数 (role つき。 2回目以降のログイン)
  const getUserInfo = async (userEmail) => {
    const db = getFirebaseDatabase();
    const userRef = ref(db, `Users/${userEmail}`);
    const snapshot = await get(userRef);
    const userInfo = snapshot.val();
    return userInfo;
  };

  // Googleログインボタンを返す
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="rounded-md m-4 w-full max-w-xs bg-blend-lighten hover:shadow-lg hover:shadow-gray-300 hover:duration-200 duration-700 focus:outline-none hover:scale-105">
        <button
          onClick={() => login()} // カスタムボタンでログインをトリガー
          className="p-3 bg-blue-500 w-full text-white rounded hover:bg-blue-600"
        >
          Googleで登録/ログイン
        </button>
      </div>
    </GoogleOAuthProvider>
  );
}