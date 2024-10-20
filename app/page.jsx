import React from 'react';
import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex flex-col items-center">
      <h1 className="head_text text-center">
        Discover and Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
        <p className='desc items-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, sapiente.</p>
      </h1>

      <Feed />
    </section>
  );
};

export default Home;
