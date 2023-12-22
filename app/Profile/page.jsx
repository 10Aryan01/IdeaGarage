"use client";
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import Profile from '@components/Profile'



export default function page() {
  const { data: session } = useSession();
  const [post, setPost] = useState([])
  const router = useRouter();


  useEffect(() => {
    const getpost = async () => {
      try {
        const response = await fetch(`/api/user/${session?.user.id}/posts`);
        const data = await response.json();
        setPost(data)
      } catch (e) {
        console.log("This error from get api ", e)
      }
    }
    if (session?.user.id) getpost();
    // getpost();
  }, [])

  console.log("This is to test if sessio userid is there or not", session?.user.id)

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (posts) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt ?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${posts._id.toString()}`, { method: 'DELETE' });

        const filteredpost = post.filter((p) => p._id !== post._id)
        setPost(filteredpost);

        router.push("/");
      } catch (e) {
        console.log(e)
      }
    }
  }


  return (
    <Profile
      name="My"
      desc={`Welcome to ${session?.user.name}'s profile`}
      data={post}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}
