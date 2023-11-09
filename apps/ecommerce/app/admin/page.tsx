'use client';
import React from 'react';

import { useRouter } from 'next/navigation';
import { useAuthContext } from '../(auth)/components/context';
function Page() {
  const { person } = useAuthContext();
  const router = useRouter();

  console.log(person)

  React.useEffect(() => {
    if (person == null) router.push('/login');
  }, [person]);

  return <h1>Only logged in users can view this page</h1>;
}

export default Page;
