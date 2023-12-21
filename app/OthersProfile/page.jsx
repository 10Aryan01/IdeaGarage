"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import Profile from '@components/Profile'
import { useSearchParams } from 'next/navigation';



export default function page() {
  const [post, setPost] = useState([])
  const router = useRouter();
  const searchParams = useSearchParams();
  const creatorid = searchParams.get('id');
  const username = searchParams.get('username');
 

  useEffect(() => {
    const getpost = async () => {
      const response = await fetch(`/api/user/${creatorid}/posts`);
      const data = await response.json();
      setPost(data)
    }
    getpost();
  }, [])
  return (
    <Profile
      name=""
      desc={`Welcome to ${username}'s profile`}
      data={post}
    />
  )
}
