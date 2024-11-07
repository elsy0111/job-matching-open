// React
'use client';

// Parts
import GetStatus from '@/components/GetStatus';
import Logout from '@/components/Login/Logout';
import Status from '@/components/Status';
import GetList from '@/components/List/GetList';
import BackButton from '@/components/BackButton';
import Header from '@/components/Header';
import Loading from '@/components/Loading'

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useState, useEffect } from 'react';

import { UserProvider, useUser } from '@/context/UserContext';

function AccessDeniedContent() {
  return (
    <>
      <Header>Access Denied.</Header>
      <div className='text-red-500 font-bold text-xl'>
        This page is only COMPANY users.
      </div>
      <BackButton />
      <Status />
      <Logout />
    </>
  );
}

function ListContent({ role }: { role: string }){
  return (
    <Suspense fallback={<Loading />}>
      <GetList role={role} />
      <Status />
      <BackButton />
      <Logout />
    </Suspense>
  )
}

// Main func
function HomeContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role'); // Excepted role
  const { userInfo } = useUser();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <Loading />;
  
  if (!userInfo) return <GetStatus />;

  return (
    <>
      <GetStatus />
      {(userInfo && (userInfo.role === 'engineer' && role !== userInfo.role)) && (
        <AccessDeniedContent />
      )}
      {(userInfo && (userInfo.role !== 'engineer' || role === userInfo.role)) && (
        <ListContent role={role || ''} />
      )}
    </>
  );
}

export default function Home() {
  return (
    <UserProvider>
      <Suspense fallback=<Loading />>
        <HomeContent />
      </Suspense>
    </UserProvider>
  );
}