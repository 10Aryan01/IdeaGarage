"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
const UpdatePrompt = () => {
    const router = useRouter();
    const seachParmas = useSearchParams();
    const promptId = seachParmas.get('id');

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })
    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await fetch(`/api/prompt/${promptId}`);

                if (!response.ok) {
                    console.error(`Failed to fetch prompt. Status: ${response.status}`);
                    return;
                }

                const data = await response.json();

                setPost({
                    prompt: data.prompt,
                    tag: data.tag
                });
            } catch (error) {

                console.error('Error fetching prompt:', error);
            }
        };

        if (promptId) {
            getDetails();
        }
    }, [promptId]);


    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true)

        if (!promptId) alert("Missing Prompt ID please reload the page")
        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if (res.ok) {
                router.push("/");
            }
        } catch (e) {
            console.log(e)
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    );
};

export default UpdatePrompt;
