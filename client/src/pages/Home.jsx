import React from 'react';
import BlogWizHomeImg from '../assets/BlogWizHomeImg.jpg'

function Home() {
  return (
    <div className='bg-gray-300 py-7'>
      <img src={BlogWizHomeImg} alt="BlogWizHomeImg" className='w-2/5 m-auto rounded-lg shadow-2xl ' />
      <div className="mt-10">
        <p className='px-24 pb-5 font-mono leading-6'>BlogWiz is your ultimate destination for all things blogging. Whether you're a seasoned blogger looking to sharpen your skills or a newcomer eager to dive into the world of online content creation, BlogWiz has you covered. Our platform offers a wealth of resources, from expert tips and tutorials to insightful articles on industry trends and best practices. With BlogWiz, you'll unlock the secrets to crafting engaging, compelling content that captivates your audience and drives traffic to your blog. Join our community of passionate bloggers and unleash your creativity with BlogWiz today!</p>
      </div>
    </div>
  )
}

export default Home;