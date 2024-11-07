import { getFirebaseDatabase } from '@/firebaseinit';
import { ref, set } from 'firebase/database';
import { useEffect, useState } from 'react';

import { useUser } from '@/context/UserContext';

export default function AccountRegister({ token }) {
  const [role, setRole] = useState('');
  const { setUserInfo } = useUser();
  const [userInfo, setFetchUserInfo] = useState(null);

  console.log('AccountRegister rendered');
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // ユーザー情報を取得するためのリクエスト (token を使って)
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // ユーザー情報を取得
        const userInfo = await userInfoResponse.json();
        setFetchUserInfo(userInfo);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
    fetchUserInfo();
  }, [token]);
  
  const handleRoleSelection = async () => {
    if (userInfo && role) {
      // ユーザーのメールアドレスを使ってユーザーIDを作成 (. は使えないので _ に変換)
      const replacedEmail = userInfo.email.replace(/\./g, '_');
    // DBに保存するユーザー情報
      if (role) {
        // Firebaseにユーザー情報と役割を保存
        const db = getFirebaseDatabase();
        const userRef = ref(db, `Users/${replacedEmail}`);
        await set(userRef, {
          name: userInfo.name,
          photo: userInfo.picture,
          email: replacedEmail,
          role: role,
          loggedInAt: new Date().toLocaleString(),
        });
        // userInfoを更新
        setUserInfo({
          name: userInfo.name,
          photo: userInfo.picture,
          email: replacedEmail,
          role: role,
          loggedInAt: new Date().toLocaleString(),
        });
      }
    }
  };

  return(
    <div className='w-full max-w-xs'>
      <h1 className="text-xl text-center font-bold text-gray-700 mt-1 mb-4">Select Your Role {role && `as ${role}`}</h1>
      <div className="flex flex-row gap-5  text-center text-xl sm:text-2xl font-bold text-gray-700 ">
        <button onClick={() => setRole('engineer')}
          className="border w-full border-gray-200 rounded-md hover:shadow-lg hover:shadow-gray-300 p-4 no-underline hover:duration-200 duration-700 hover:scale-[1.02]">
            Engineer
        </button>
        <button onClick={() => setRole('company')}
          className="border w-full border-gray-200 rounded-md hover:shadow-lg hover:shadow-gray-300 p-4 no-underline hover:duration-200 duration-700 hover:scale-[1.02]">
            Company
        </button>
      </div>
      <div className='text-center mt-4'>
        <button onClick={handleRoleSelection} disabled={!role || !userInfo}
          className="bg-blue-500 w-full  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none hover:scale-105 hover:duration-200 duration-700
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:hover:scale-100 disabled:hover:duration-0">
          Submit
        </button>
      </div>
    </div>
  );
}