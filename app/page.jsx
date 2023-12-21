import React from 'react'
import Feed from '@components/Feed'

function Home() {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>Discover the extraordinary, share the exceptional 
        <br className='max-mid:hidden' />
        <span className='blue_gradient text-center'>IdeaGarage, your platform for boundless ideas and shared brilliance</span>
      </h1>
      <p className='desc text-center'>Collaborate, create, and revolutionize <br/> Join IdeaGarage, the community of boundless creativity.</p>
      <Feed />
    </section>
  )
}

export default Home