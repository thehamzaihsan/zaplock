'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import Form from '@/app/Components/Form';
import { useEffect, useState } from 'react';

export default function Index() {
  const { user, error, isLoading } = useUser();
  const [formFilled , setFormFilled] = useState(false);
  if (isLoading) return <div>Loading...</div>;
  if (error) return (<div>{error.message}</div>);
  
  if (user) {
    return (
      <div>
        <div className='flex justify-center items-center gap-3 flex-col' >
          <h2 className='text-2xl'>Welcome {user.name}!</h2>
          <p>{user.sub}</p>
          {!user.email_verified ? <p>Verify Email to get form</p> : 
          formFilled ? <p>Form Submitted</p> :
          <Form setFilled = {setFormFilled}></Form>
           }
        </div>
      </div>
    );
  }

  return <a href="/api/auth/login"><button className="btn btn-primary">Login</button></a>;
}