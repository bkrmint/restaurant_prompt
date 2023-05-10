import React from 'react';
import Feed from '@/components/Feed';

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Discover & Share
      <br className="max-md:hidden" />

      <span className="orange_gradient">AI Prompts for Restaurants</span>
    </h1>
    <p className="desc text-center">
      Join Restaurant Prompt: The Community Linking Restaurant Industry to ChatGPT's AI Prompts for Enhanced Efficiency
    </p>
    <Feed />
  </section>
);

export default Home;
