"use client";
import React from 'react'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
const CreatePromptPage = () => {
    const router=useRouter();
    const {data:session}=useSession();
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt:'',
        tag:'',
    })
    const createPrompt= async (e) =>
    {
        e.preventDefault();
        setSubmitting(true)
        if(session?.user)
        {try {
            const res= await fetch("/api/prompt/new",{
                method:'POST',
                body:JSON.stringify({
                    userId:session?.user.id,
                    prompt:post.prompt,
                    tag:post.tag
                })
            })
            if(res.ok)
            {
                router.push("/");
            }
        } catch (e) {
            console.log(e)
        }finally{
            setSubmitting(false);
        }}
        else
        {
            router.push("/");
        }
    }
    return( 
    <Form 
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}
    />
    );
};

export default CreatePromptPage;
