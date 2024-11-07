// React
'use client';

// Parts
import Header from '@/components/Header';
import GetStatus  from '@/components/GetStatus';
import Logout     from '@/components/Login/Logout';
import Status from '@/components/Status';
import BackButton from '@/components/BackButton';

import SendForm from '@/components/SendForm/SendForm';

import { UserProvider, useUser } from '@/context/UserContext';


// Main func
function HomeContent() {
  const { userInfo } = useUser();
  
  return (
    <>
      <GetStatus />
      {userInfo && (
      <>
        <Header>
          {userInfo.role === 'engineer' ? 'Application' : userInfo.role === 'company' ? 'Recruitment ' : 'Admin'}
        </Header>
        <SendForm />
        <Status/>
        <BackButton />
        <Logout />
      </>)}
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