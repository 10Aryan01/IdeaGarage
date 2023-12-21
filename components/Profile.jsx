import React from 'react'
import Promptcard from './Promptcard'
function Profile({ name, desc, data, handleEdit, handleDelete }) {
  return (
    <section className='w-full'>
      <h1 className='head_text text-teft blue_gradient font-inter'>{name} Profile</h1>
      <p className='desc text-left'>{desc}</p>
      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <Promptcard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile