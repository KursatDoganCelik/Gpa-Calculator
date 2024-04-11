'use client';
import React, { useState } from 'react';
import InitialPage from './components/InitialPage';

export default function Home() {
  const [userRegistered, setUserRegistered] = useState(false);

  return <main>{userRegistered ? <h1>Registered!</h1> : <InitialPage />}</main>;
}
