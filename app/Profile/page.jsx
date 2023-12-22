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
      const response = await fetch(`/api/user/${session?.user.id}/posts`);
      const data = await response.json();
      setPost(data)
    }

    if (session?.user.id) getpost();

  }, [])


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

  console.log(session?.user)
  console.log(post)
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
