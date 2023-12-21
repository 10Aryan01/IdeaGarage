"use client";
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import tick from "../assets/icons/tick.svg"
import icopy from "../assets/icons/copy.svg"


function Promptcard({ post, handleEdit, handleDelete }) {
  const router = useRouter();
  const { data: session } = useSession();
  const Pathname = usePathname();
  const [copy, setcopy] = useState('')

  const handlecopy = () => {
    setcopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setcopy(""), 3000);
  }

  const handleTagClick = (post) => {
    if(post.creator._id===session?.user.id)
    {
      router.push("/Profile");
    }
    else
    {
      router.push(`/OthersProfile?id=${post.creator._id}&&username=${post.creator.username}`);
    }
  }

  return (
    <div
      className='prompt_card'>
      <div className='flex justify-between items-start gap-5 text-red'>
        <div className='flex-1 flex justify-start items-center
         gap-3 cursor-pointer'
          onClick={() => handleTagClick && handleTagClick(post)}
        >
          <Image
            src={post.creator.image}
            alt="User_image"
            width={40}
            height={40}
            className='rounded-full object-contain '
          />
          <div className='flex flex-col ' >
            <h3 className='font-sotoshi font-semibold text-gray-900'>{post.creator.username}</h3>
            <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
          </div>
        </div>
        <div className='copy_btn'
          onClick={handlecopy}
        >
          <Image
            src={copy === post.prompt ? tick : icopy}
            alt="image"
          />
        </div>
      </div>
      <p className='my-4 font-sotoshi text-sm text-gray-700'>{post.prompt}</p>
      <p className='font-inter text-sm blue_gradient '
      >{post.tag}</p>
      {session?.user.id === post.creator._id &&
        Pathname === '/Profile' && (
          <div className='mt-5 flex flex-end gap-5 border-gray-500'>
            <p className='font-inter text-sm green_gradient cursor-pointer p-3  font-bold'
              onClick={handleEdit}
            >Edit</p>
            <p
              className='font-inter text-sm orange_gradient cursor-pointer font-bold'
              onClick={handleDelete}
            >Delete</p>
          </div>
        )}
    </div>
  )
}

export default Promptcard