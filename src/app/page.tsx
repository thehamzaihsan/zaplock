'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import Form from './Components/Form';
import { useState } from 'react';

export default function Home() {
  return  (
    <div>
      <div className='flex justify-center items-center gap-3 flex-col' >
        <h2 className='text-2xl'>Welcome to Zaplock!</h2>
      </div>
    </div>
  )
}