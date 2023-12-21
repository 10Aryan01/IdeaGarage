"use client";
import React, { useEffect, useState } from 'react'
import Promptcard from './Promptcard';

function Feed() {
  const [post, setPost] = useState([])
  const [filterpost, setFilterpost] = useState(null)
  const PromptCardList = ({ data }) => (
    <div className='mt-16 prompt_layout'>
      {Array.isArray(data) ? (
        data.map((post) => (
          <Promptcard
            key={post._id}
            post={post}
          // handleTagClick={()=>handleTagClick && handleTagClick(post)}
          />
        ))
      ) : (
        <Promptcard
          key={data._id}
          post={data}
        // handleTagClick={()=>handleTagClick && handleTagClick(data)}
        />
      )}
    </div>
  );

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("/api/prompt/allprompts");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchPost();
  }, []);


  const handleSeachChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    let suggestions = [];
    if (inputValue !== '') {
      suggestions = post.filter((post) =>
        post.tag.toLowerCase().includes(inputValue) ||
        post.creator.username.toLowerCase().includes(inputValue)
      );
    }

    setFilterpost(suggestions.length > 0 ? suggestions : null);
  };

  return (
    <>
      <form className='relative w-full flex-center mt-10' >
        <input
          type='text'
          placeholder='Search for a tag for a username'
          onChange={handleSeachChange}
          required
          className='search_input '
        />
      </form>
    <section className='feed'>
      <PromptCardList
        data={filterpost ? filterpost : post}
      />
    </section>
    </>
  )
}

export default Feed