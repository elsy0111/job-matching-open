// app/page.tsx

'use client';

// Parts
import Header from '@/components/Header';
import Select from '@/components/Select';
import GetStatus  from '@/components/GetStatus';
import Logout from '@/components/Login/Logout';
import Status from '@/components/Status';
import Loading from '@/components/Loading';


import { UserProvider, useUser } from '@/context/UserContext';

// Main func
function HomeContent() {
  const { userInfo, loading } = useUser(); // UserProvider 内で useUser を使用

  if (loading) {
    return (
      <Loading />
    );
  }
  
  return (
    <>
      <GetStatus />
      {userInfo && (
        <>
          <Header>Menu</Header>
          <Select />
          <Status />
          <Logout />
        </>
      )}
    </>
  );
}

export default function Home() {
  return (
    <UserProvider>
      <HomeContent />
    </UserProvider>
  );
}