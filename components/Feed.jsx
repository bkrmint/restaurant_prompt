'use client';

import { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  console.log('PromptCardList');
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  // const [posts, setPosts] = useState([]);
  // search text states
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [allposts, setAllPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setAllPosts(data);
  };

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, 'i'); // i for case insensitive

    return allposts.filter((item) => (
      regex.test(item.prompt)
      || regex.test(item.tag)
      || regex.test(item.creator.username)
    ));
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);

        setSearchResults(searchResult);
      }, 500),
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const searchResult = filterPrompts(tag);
    setSearchResults(searchResult);
  };

  useEffect(() => {
    // const fetchPosts = async () => {
    //   const response = await fetch('/api/prompt');
    //   const data = await response.json();
    //   console.log('posts :', data);
    //   setAllPosts(data);
    // };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tags or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={searchText === '' ? allposts : searchResults}
        handleTagClick={handleTagClick}
      />

    </section>
  );
};

export default Feed;
